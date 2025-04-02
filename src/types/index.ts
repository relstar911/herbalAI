
// Questionnaire related types
export type QuestionnaireType = 'structured' | 'freeText';

export interface StructuredFormData {
  symptoms: string[];
  location: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  preferences: string[];
}

export interface FreeTextFormData {
  description: string;
}

// Results related types
export interface SolutionItem {
  category: string;
  suggestion: string;
  application: string;
  effect: string;
  precaution?: string;
}

export interface AlternativeItem {
  suggestion: string;
  application: string;
  effect: string;
}

export interface SupplementItem {
  suggestion: string;
  reason: string;
}

export interface ResultItem {
  solution: SolutionItem;
  alternative: AlternativeItem;
  supplement?: SupplementItem;
}

export interface QuestionnaireResult {
  id: string;
  type: 'structured' | 'freeText' | 'combined';
  inputs: {
    structured?: {
      symptoms: string[];
      location: string;
      severity: string;
      duration: string;
      preferences: string[];
    };
    freeText?: string;
  };
  research: {
    contextAnalysis: string;
    relevantCategories: string[];
  };
  results: ResultItem[];
}

// Knowledge base related types
export interface KnowledgeCategory {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  subcategories: string[];
}
