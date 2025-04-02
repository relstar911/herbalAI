
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY");
    if (!DEEPSEEK_API_KEY) {
      throw new Error("DEEPSEEK_API_KEY ist nicht gesetzt");
    }

    // Supabase Client zur Speicherung der Ergebnisse
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Daten aus der Anfrage extrahieren
    const { questionnaireData, userId, questionnaireId } = await req.json();

    if (!questionnaireData || !userId) {
      return new Response(
        JSON.stringify({
          error: "Fehlende Daten: questionnaireData und userId sind erforderlich",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Verarbeite Anfrage für Benutzer:", userId);
    console.log("Fragebogendaten:", JSON.stringify(questionnaireData));

    // Anfrage an Deepseek API vorbereiten
    let prompt = "";
    let requestType = "";

    if (questionnaireData.type === "structured") {
      requestType = "structured";
      prompt = `Erstelle Heilmittelempfehlungen basierend auf den folgenden strukturierten Daten:
Symptome: ${questionnaireData.structured.symptoms.join(", ")}
Ort: ${questionnaireData.structured.location}
Schweregrad: ${questionnaireData.structured.severity}
Dauer: ${questionnaireData.structured.duration}
Präferenzen: ${questionnaireData.structured.preferences.join(", ")}`;
    } else if (questionnaireData.type === "freeText") {
      requestType = "freeText";
      prompt = `Erstelle Heilmittelempfehlungen basierend auf der folgenden Beschreibung:
${questionnaireData.freeText}`;
    } else {
      return new Response(
        JSON.stringify({
          error: "Ungültiger Fragebogentyp",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Deepseek API aufrufen
    console.log("Sende Anfrage an Deepseek API mit Prompt:", prompt);
    
    const deepseekResponse = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `Du bist ein Experte für Naturheilkunde und alternative Medizin. Deine Aufgabe ist es, 
            personalisierte Empfehlungen für natürliche Heilmittel und Heilmethoden zu geben. 
            Formatiere deine Antwort als JSON-Objekt mit folgender Struktur:
            {
              "research": {
                "contextAnalysis": "Eine zusammenfassende Analyse des Gesundheitszustands des Nutzers",
                "relevantCategories": ["Kategorie 1", "Kategorie 2", "Kategorie 3"]
              },
              "results": [
                {
                  "solution": {
                    "category": "Kategorie des Heilmittels",
                    "suggestion": "Name des empfohlenen Heilmittels",
                    "application": "Wie das Heilmittel angewendet werden sollte",
                    "effect": "Welche Wirkung das Heilmittel hat",
                    "precaution": "Vorsichtsmaßnahmen bei der Anwendung (wenn vorhanden)"
                  },
                  "alternative": {
                    "suggestion": "Name einer alternativen Behandlung",
                    "application": "Wie die Alternative angewendet werden sollte",
                    "effect": "Welche Wirkung die Alternative hat"
                  },
                  "supplement": {
                    "suggestion": "Eine ergänzende Empfehlung (z.B. Lebensstilveränderung)",
                    "reason": "Warum diese Ergänzung hilfreich sein könnte"
                  }
                }
              ]
            }
            Gib mindestens 2 verschiedene Empfehlungen mit jeweiligen Alternativen. 
            Vermeide Standardaussagen und gib stattdessen spezifische und personalisierte Empfehlungen.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      }),
    });

    // Deepseek-Antwort verarbeiten
    const deepseekData = await deepseekResponse.json();
    console.log("Deepseek Antwort erhalten");

    if (!deepseekData.choices || deepseekData.choices.length === 0) {
      console.error("Unerwartetes Antwortformat von Deepseek:", deepseekData);
      throw new Error("Ungültiges Antwortformat von der AI");
    }

    // JSON-Antwort extrahieren und parsen
    const rawContent = deepseekData.choices[0].message.content;
    console.log("Rohe Antwort:", rawContent);
    
    // JSON aus der Antwort extrahieren (falls es in einem Codeblock ist)
    let jsonMatch = rawContent.match(/```json\s*([\s\S]*?)\s*```/);
    let resultData;
    
    if (jsonMatch && jsonMatch[1]) {
      // JSON aus Codeblock extrahieren
      try {
        resultData = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Fehler beim Parsen des JSONs aus Codeblock:", e);
        throw new Error("Konnte JSON aus der AI-Antwort nicht parsen");
      }
    } else {
      // Versuchen, die gesamte Antwort als JSON zu parsen
      try {
        resultData = JSON.parse(rawContent);
      } catch (e) {
        console.error("Fehler beim Parsen des JSONs:", e);
        throw new Error("Konnte die AI-Antwort nicht als JSON parsen");
      }
    }

    // In Supabase speichern, wenn eine QuestionnaireID vorhanden ist
    if (questionnaireId) {
      const { error } = await supabase.from("results").insert({
        questionnaire_id: questionnaireId,
        user_id: userId,
        research_context: resultData.research.contextAnalysis,
        relevant_categories: resultData.research.relevantCategories,
        solutions: resultData.results.map(r => r.solution),
        alternatives: resultData.results.map(r => r.alternative),
        supplements: resultData.results.filter(r => r.supplement).map(r => r.supplement)
      });

      if (error) {
        console.error("Fehler beim Speichern in Supabase:", error);
      } else {
        console.log("Ergebnisse erfolgreich in Supabase gespeichert");
      }
    }

    // Ergebnisse zurückgeben
    return new Response(
      JSON.stringify({
        id: questionnaireId || "temp-" + Date.now(),
        type: requestType,
        inputs: questionnaireData,
        research: resultData.research,
        results: resultData.results
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Fehler in der Edge Function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Ein unerwarteter Fehler ist aufgetreten" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
