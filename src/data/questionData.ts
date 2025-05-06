
import { Question } from '@/types/contract';

// Define the simplified questions structure - main categories with sub-questions
export const simplifiedQuestions: Question[] = [
  {
    id: 'company-info',
    text: 'Company Information',
    type: 'text',
    required: true,
    subQuestions: [
      {
        id: 'employer-name',
        text: 'What is the legal name of the company?',
        type: 'text',
        required: true,
        placeholder: 'Enter company name',
        recommendation: 'Use the full registered name of the company as per incorporation documents',
      },
      {
        id: 'employer-address',
        text: 'What is the registered address of the employer?',
        type: 'textarea',
        required: true,
        placeholder: 'Enter full address including PIN code',
      }
    ]
  },
  {
    id: 'employee-details',
    text: 'Employee Details',
    type: 'text',
    required: true,
    subQuestions: [
      {
        id: 'employee-name',
        text: 'What is the name of the employee?',
        type: 'text',
        required: true,
        placeholder: 'Enter full legal name',
      },
      {
        id: 'employee-address',
        text: 'What is the address of the employee?',
        type: 'textarea',
        required: true,
        placeholder: 'Enter full residential address',
      }
    ]
  },
  {
    id: 'job-details',
    text: 'Job Details',
    type: 'text',
    required: true,
    subQuestions: [
      {
        id: 'job-title',
        text: 'What is the job title or designation of the position?',
        type: 'text',
        required: true,
        recommendation: 'Be specific about the designation as it affects legal responsibilities',
      },
      {
        id: 'department',
        text: 'Which department will the employee be working in?',
        type: 'text',
        placeholder: 'e.g., Development, Testing, Support',
      },
      {
        id: 'responsibilities',
        text: 'What are the key responsibilities of this role?',
        type: 'textarea',
        required: true,
        placeholder: 'List key job responsibilities',
      },
      {
        id: 'start-date',
        text: 'What is the start date of employment?',
        type: 'date',
        required: true,
      },
      {
        id: 'employment-type',
        text: 'Is this a permanent position or a fixed-term contract?',
        type: 'toggle',
        recommendation: 'Select the type of employment contract'
      },
      {
        id: 'probation',
        text: 'Is there a probation period?',
        type: 'toggle',
        recommendation: 'Specify probation duration if applicable'
      }
    ]
  },
  {
    id: 'compensation',
    text: 'Compensation & Benefits',
    type: 'text',
    required: true,
    subQuestions: [
      {
        id: 'salary',
        text: 'What is the annual gross salary?',
        type: 'text',
        required: true,
      },
      {
        id: 'payment-schedule',
        text: 'How often is the salary paid?',
        type: 'text',
        placeholder: 'e.g., Monthly, Bi-weekly',
      },
      {
        id: 'benefits',
        text: 'What benefits are provided?',
        type: 'textarea',
        placeholder: 'e.g., Health insurance, Retirement plans',
      },
      {
        id: 'leave-details',
        text: 'Please provide the leave structure details:',
        type: 'table',
        tableHeaders: ['Leave Type', 'Days'],
        tableRows: 5,
        recommendation: 'As per Factories Act, employees are entitled to one day of earned leave for every 20 days worked'
      }
    ]
  },
  {
    id: 'intellectual-property',
    text: 'Confidentiality & IP',
    type: 'text',
    required: true,
    subQuestions: [
      {
        id: 'confidentiality-clause',
        text: 'What types of information are considered confidential?',
        type: 'textarea',
        recommendation: 'Define confidential information clearly and specify duration of confidentiality obligations',
        placeholder: 'e.g., Client data, proprietary code, business strategies'
      },
      {
        id: 'ip-rights',
        text: 'Does the employee agree to assign intellectual property rights to the company?',
        type: 'toggle',
        recommendation: 'Specify that all work product created during employment belongs to the employer'
      },
      {
        id: 'non-compete',
        text: 'Is there a non-compete clause?',
        type: 'toggle',
        recommendation: 'Non-compete clauses must have reasonable limitations to be enforceable'
      }
    ]
  },
  {
    id: 'termination',
    text: 'Termination',
    type: 'text',
    required: true,
    subQuestions: [
      {
        id: 'notice-period',
        text: 'What is the notice period for termination?',
        type: 'text',
        placeholder: 'e.g., 30 days',
        recommendation: 'For Indian companies, standard notice periods range from 30-90 days'
      },
      {
        id: 'termination-grounds',
        text: 'What are the grounds for termination without notice?',
        type: 'textarea',
        recommendation: 'Specify grounds for termination with and without cause'
      }
    ]
  },
  {
    id: 'dispute-resolution',
    text: 'Dispute Resolution',
    type: 'text',
    required: true,
    subQuestions: [
      {
        id: 'governing-law',
        text: 'What will be the governing law?',
        type: 'text',
        placeholder: 'e.g., Laws of India',
        recommendation: 'Specify both the governing law and jurisdiction'
      },
      {
        id: 'arbitration',
        text: 'Do you want to include an arbitration clause?',
        type: 'toggle',
        recommendation: 'Consider including mediation before arbitration or litigation'
      },
      {
        id: 'bond-period',
        text: 'Is there a bond period for the employee?',
        type: 'toggle',
        recommendation: 'Specify bond duration and penalty for early separation'
      }
    ]
  }
];

// Map categories to contract sections
export const categoryToSectionMap: { [key: string]: string } = {
  'company-info': 'preamble',
  'employee-details': 'preamble',
  'job-details': 'operative-clauses',
  'compensation': 'financial-terms',
  'intellectual-property': 'risk-management',
  'termination': 'termination',
  'dispute-resolution': 'boilerplate'
};

// Get section from category
export const getSectionFromCategory = (category: string): string => {
  return categoryToSectionMap[category] || 'preamble';
};

// Calculate progress based on answered questions
export const calculateProgress = (answers: Record<string, any>): number => {
  let totalQuestions = 0;
  let answeredQuestions = 0;
  
  // Count total and answered questions including subquestions
  simplifiedQuestions.forEach(question => {
    if (question.subQuestions) {
      totalQuestions += question.subQuestions.length;
      question.subQuestions.forEach(subQ => {
        if (answers[subQ.id]) {
          answeredQuestions++;
        }
      });
    } else {
      totalQuestions++;
      if (answers[question.id]) {
        answeredQuestions++;
      }
    }
  });
  
  return Math.round((answeredQuestions / totalQuestions) * 100);
};

// Get completed sections based on answers
export const getCompletedSections = (answers: Record<string, any>): string[] => {
  const completedCategories = new Set<string>();
  
  simplifiedQuestions.forEach(category => {
    if (category.subQuestions) {
      // Check if at least one question is answered in this category
      const hasAnswer = category.subQuestions.some(q => answers[q.id]);
      if (hasAnswer) {
        completedCategories.add(getSectionFromCategory(category.id));
      }
    }
  });
  
  return Array.from(completedCategories);
};
