
import { supabase } from '@/integrations/supabase/client';
import { QuestionnaireResult, FreeTextFormData, StructuredFormData } from '@/types';

const API_URL = "https://ujaqobscoxltlkdfxhkt.supabase.co/functions/v1";

export const saveStructuredQuestionnaire = async (data: StructuredFormData, userId?: string) => {
  if (!userId) {
    // Für nicht angemeldete Nutzer, nur API-Aufruf ohne Speicherung
    return generateRecommendations({
      type: 'structured',
      structured: data
    });
  }

  // Speichern des Fragebogens in der Datenbank
  const { data: questionnaire, error } = await supabase
    .from('questionnaires')
    .insert({
      user_id: userId,
      type: 'structured',
      structured_data: data
    })
    .select()
    .single();

  if (error) {
    console.error("Fehler beim Speichern des Fragebogens:", error);
    throw error;
  }

  // API-Aufruf mit der QuestionnaireID
  return generateRecommendations({
    type: 'structured',
    structured: data
  }, userId, questionnaire.id);
};

export const saveFreeTextQuestionnaire = async (data: FreeTextFormData, userId?: string) => {
  if (!userId) {
    // Für nicht angemeldete Nutzer, nur API-Aufruf ohne Speicherung
    return generateRecommendations({
      type: 'freeText',
      freeText: data.description
    });
  }

  // Speichern des Fragebogens in der Datenbank
  const { data: questionnaire, error } = await supabase
    .from('questionnaires')
    .insert({
      user_id: userId,
      type: 'freeText',
      free_text_data: data.description
    })
    .select()
    .single();

  if (error) {
    console.error("Fehler beim Speichern des Fragebogens:", error);
    throw error;
  }

  // API-Aufruf mit der QuestionnaireID
  return generateRecommendations({
    type: 'freeText',
    freeText: data.description
  }, userId, questionnaire.id);
};

export const generateRecommendations = async (
  questionnaireData: {
    type: 'structured' | 'freeText';
    structured?: StructuredFormData;
    freeText?: string;
  },
  userId?: string,
  questionnaireId?: string
): Promise<QuestionnaireResult> => {
  try {
    const response = await fetch(`${API_URL}/generate-recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionnaireData,
        userId,
        questionnaireId
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Fehler bei der API-Anfrage");
    }

    return await response.json();
  } catch (error) {
    console.error("API Fehler:", error);
    throw error;
  }
};

export const getUserResults = async (userId: string) => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from('results')
    .select(`
      *,
      questionnaires:questionnaire_id (
        type,
        structured_data,
        free_text_data
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Fehler beim Laden der Ergebnisse:", error);
    throw error;
  }

  return data;
};
