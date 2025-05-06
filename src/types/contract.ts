
export interface ContractSection {
  id: string;
  title: string;
  isChecked: boolean;
}

export interface ContractWarning {
  id: string;
  message: string;
  type: 'warning' | 'error' | 'success';
  section: string;
}

export interface QuestionGroup {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  section: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'table' | 'date' | 'toggle';
  options?: string[];
  answer?: string | string[] | { [key: string]: string } | boolean;
  subQuestions?: Question[];
  required?: boolean;
  placeholder?: string;
  recommendation?: string;
  tableHeaders?: string[];
  tableRows?: number;
  clausePreview?: string;
}

export interface ContractData {
  title: string;
  content: string;
  progress: number;
  activeSection?: string;
}

export interface ContractAlert {
  id: string;
  message: string;
  severity: 'error' | 'warning' | 'success';
  section: string;
}

export interface ContractRecommendation {
  section: string;
  text: string;
}
