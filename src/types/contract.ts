
export interface ContractSection {
  id: string;
  title: string;
  isChecked: boolean;
}

export interface ContractWarning {
  id: string;
  message: string;
  type: 'warning' | 'error';
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
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'table';
  options?: string[];
  answer?: string | string[] | { [key: string]: string };
  subQuestions?: Question[];
  required?: boolean;
  placeholder?: string;
  recommendation?: string;
  tableHeaders?: string[];
  tableRows?: number;
}

export interface ContractData {
  title: string;
  content: string;
  progress: number;
}
