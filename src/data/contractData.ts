import { ContractSection, ContractWarning, QuestionGroup } from '@/types/contract';

export const contractSections: ContractSection[] = [
  { id: 'preamble', title: 'Preamble', isChecked: true },
  { id: 'recitals', title: 'Recitals', isChecked: false },
  { id: 'definitions', title: 'Definitions', isChecked: false },
  { id: 'operative-clauses', title: 'Operative Clauses', isChecked: false },
  { id: 'financial-terms', title: 'Financial Terms & Payment Structure', isChecked: false },
  { id: 'risk-management', title: 'Risk Management Clauses', isChecked: false },
  { id: 'special-contract', title: 'Special Contract Clauses', isChecked: false },
  { id: 'boilerplate', title: 'Boilerplate Clauses', isChecked: false },
  { id: 'termination', title: 'Termination & Exit Clauses', isChecked: false },
  { id: 'signature', title: 'Signature & Execution', isChecked: false },
];

export const contractWarnings: ContractWarning[] = [
  { 
    id: 'w1', 
    message: 'Consider adding more specific payment terms', 
    type: 'warning', 
    section: 'financial-terms' 
  },
  { 
    id: 'w2', 
    message: 'Include dispute resolution procedures', 
    type: 'warning', 
    section: 'risk-management' 
  },
];

export const questionGroups: QuestionGroup[] = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    section: 'preamble',
    description: 'Let\'s start with the basic details of the employment agreement',
    questions: [
      {
        id: 'employer-name',
        text: 'What is the name of the employer?',
        type: 'text',
        required: true,
        placeholder: 'Enter company name',
        recommendation: 'Use the full registered name of the company as per incorporation documents'
      },
      {
        id: 'employer-address',
        text: 'What is the registered address of the employer?',
        type: 'textarea',
        required: true,
        placeholder: 'Enter full address including PIN code',
      },
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
      }
    ]
  },
  {
    id: 'position-details',
    title: 'Position Details',
    section: 'operative-clauses',
    questions: [
      {
        id: 'job-title',
        text: 'What is the job title or designation of the position?',
        type: 'text',
        required: true,
        recommendation: 'Be specific about the designation as it affects legal responsibilities',
      },
      {
        id: 'job-description',
        text: 'Provide a description of the job responsibilities',
        type: 'textarea',
        required: true,
        subQuestions: [
          {
            id: 'reporting-to',
            text: 'Who will the employee report to?',
            type: 'text',
          },
          {
            id: 'team-structure',
            text: 'Describe the team structure',
            type: 'textarea',
          }
        ]
      },
      {
        id: 'probation',
        text: 'Will there be a probation period?',
        type: 'text',
        placeholder: 'e.g., 3 months',
        recommendation: 'As per Indian labor laws, standard probation periods are typically 3-6 months'
      }
    ]
  },
  {
    id: 'compensation',
    title: 'Compensation',
    section: 'financial-terms',
    description: 'Details about salary, benefits and other financial aspects',
    questions: [
      {
        id: 'base-salary',
        text: 'What is the base salary/compensation?',
        type: 'text',
        required: true,
        recommendation: 'Specify if the amount is per annum, per month, etc., and whether it is CTC or take-home',
      },
      {
        id: 'payment-schedule',
        text: 'What is the payment schedule?',
        type: 'text',
        placeholder: 'e.g., Monthly on the last working day',
        recommendation: 'As per the Payment of Wages Act, wages must be paid by the 7th day after the wage period if there are less than 1000 workers'
      },
      {
        id: 'benefits',
        text: 'What benefits will be provided?',
        type: 'textarea',
        placeholder: 'e.g., Health insurance, retirement benefits',
        subQuestions: [
          {
            id: 'insurance',
            text: 'Health insurance details',
            type: 'textarea',
          },
          {
            id: 'pf',
            text: 'Provident Fund contribution',
            type: 'text',
            recommendation: 'As per EPF Act, employer must contribute 12% of basic wages'
          }
        ]
      },
      {
        id: 'variable-pay',
        text: 'Is there any variable pay or bonus structure?',
        type: 'textarea',
        recommendation: 'Clearly define performance metrics for any variable pay component'
      }
    ]
  },
  {
    id: 'leave-structure',
    title: 'Leave Structure',
    section: 'operative-clauses',
    questions: [
      {
        id: 'leave-details',
        text: 'Please provide the leave structure details:',
        type: 'table',
        tableHeaders: ['Leave Type', 'Days'],
        tableRows: 5,
        recommendation: 'As per Factories Act, employees are entitled to one day of earned leave for every 20 days worked'
      },
      {
        id: 'leave-policy',
        text: 'Additional details about leave policy',
        type: 'textarea',
        placeholder: 'Specify carry forward, encashment, etc.',
      }
    ]
  },
  {
    id: 'work-hours',
    title: 'Working Hours & Location',
    section: 'operative-clauses',
    questions: [
      {
        id: 'work-hours',
        text: 'What are the working hours?',
        type: 'text',
        placeholder: 'e.g., 9 AM - 6 PM, Monday to Friday',
        recommendation: 'As per Factories Act, working hours should not exceed 48 hours per week or 9 hours per day'
      },
      {
        id: 'overtime-policy',
        text: 'What is the overtime policy?',
        type: 'textarea',
        recommendation: 'As per Factories Act, overtime wages are paid at twice the ordinary rate of wages'
      },
      {
        id: 'work-location',
        text: 'What is the work location?',
        type: 'text',
        subQuestions: [
          {
            id: 'remote-work',
            text: 'Is remote work allowed?',
            type: 'textarea',
            placeholder: 'Specify remote work policy if applicable',
          }
        ]
      }
    ]
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality & IP',
    section: 'risk-management',
    questions: [
      {
        id: 'confidentiality-clause',
        text: 'Specify confidentiality requirements',
        type: 'textarea',
        recommendation: 'Define confidential information clearly and specify duration of confidentiality obligations'
      },
      {
        id: 'ip-rights',
        text: 'How will intellectual property rights be handled?',
        type: 'textarea',
        recommendation: 'Specify that all work product created during employment belongs to the employer'
      },
      {
        id: 'non-compete',
        text: 'Will there be any non-compete restrictions?',
        type: 'textarea',
        recommendation: 'Non-compete clauses in India must be reasonable in terms of duration, geography, and scope'
      }
    ]
  },
  {
    id: 'termination',
    title: 'Termination',
    section: 'termination',
    questions: [
      {
        id: 'notice-period',
        text: 'What is the notice period for termination?',
        type: 'text',
        placeholder: 'e.g., 30 days',
        recommendation: 'For Indian companies, standard notice periods range from 30-90 days'
      },
      {
        id: 'termination-grounds',
        text: 'What are the grounds for termination?',
        type: 'textarea',
        recommendation: 'Specify grounds for termination with and without cause'
      },
      {
        id: 'severance',
        text: 'Will there be any severance pay?',
        type: 'text',
        recommendation: "Under Industrial Disputes Act, retrenchment compensation is 15 days' average pay for each completed year of service"
      }
    ]
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution',
    section: 'risk-management',
    questions: [
      {
        id: 'dispute-process',
        text: 'How will disputes be resolved?',
        type: 'textarea',
        recommendation: 'Consider including mediation before arbitration or litigation'
      },
      {
        id: 'governing-law',
        text: 'What will be the governing law?',
        type: 'text',
        placeholder: 'e.g., Laws of India',
        recommendation: 'Specify both the governing law and jurisdiction'
      }
    ]
  }
];

export const sampleContract = {
  title: "EMPLOYMENT AGREEMENT",
  content: `<p><strong>THIS EMPLOYMENT AGREEMENT</strong> ("Agreement") is made and entered into on this [DATE], by and between:</p>
  <p><strong>[EMPLOYER NAME]</strong>, a company incorporated under the Companies Act, 2013, having its registered office at [EMPLOYER ADDRESS] (hereinafter referred to as the "Company"), AND</p>
  <p><strong>[EMPLOYEE NAME]</strong>, residing at [EMPLOYEE ADDRESS] (hereinafter referred to as the "Employee").</p>
  <p>The Company and the Employee shall be individually referred to as "Party" and collectively as "Parties".</p>
  
  <p><strong>WHEREAS:</strong></p>
  <p>A. The Company is engaged in the business of [BUSINESS DESCRIPTION];</p>
  <p>B. The Company wishes to employ the Employee on the terms and conditions set forth in this Agreement; and</p>
  <p>C. The Employee wishes to be employed by the Company on such terms and conditions.</p>
  
  <p><strong>NOW THEREFORE, THE PARTIES AGREE AS FOLLOWS:</strong></p>
  
  <p><strong>1. APPOINTMENT AND POSITION</strong></p>
  <p>1.1 The Company hereby employs the Employee as [JOB TITLE], and the Employee accepts such employment.</p>
  <p>1.2 The Employee shall report to [REPORTING MANAGER DESIGNATION].</p>
  <p>1.3 The Employee's duties and responsibilities shall include [JOB DESCRIPTION].</p>
  
  <p><strong>2. TERM AND PROBATION</strong></p>
  <p>2.1 This Agreement shall commence on [START DATE] and shall continue unless terminated in accordance with the provisions of this Agreement.</p>
  <p>2.2 The Employee shall undergo a probation period of [PROBATION PERIOD] from the date of joining. The Company may, at its sole discretion, confirm the employment or extend the probation period.</p>
  
  <p><strong>3. COMPENSATION AND BENEFITS</strong></p>
  <p>3.1 Salary: The Employee shall receive a [SALARY FREQUENCY] salary of INR [AMOUNT] subject to applicable tax deductions and statutory contributions.</p>
  <p>3.2 Payment: Salary shall be paid on or before the [PAYMENT DATE] of each month.</p>
  <p>3.3 Benefits: The Employee shall be entitled to the following benefits:</p>
  <p>a) [BENEFITS DETAILS]</p>
  
  <p><strong>4. WORKING HOURS AND LOCATION</strong></p>
  <p>4.1 Working Hours: The Employee shall work for [WORK HOURS] from [START TIME] to [END TIME], [WORKDAYS].</p>
  <p>4.2 Location: The Employee shall primarily work at [WORK LOCATION].</p>
  
  <p><strong>5. LEAVE ENTITLEMENT</strong></p>
  <p>5.1 The Employee shall be entitled to the following leave benefits per year:</p>
  <p>a) Earned/Privilege Leave: [NUMBER] days</p>
  <p>b) Sick Leave: [NUMBER] days</p>
  <p>c) Casual Leave: [NUMBER] days</p>
  
  <p><strong>6. CONFIDENTIALITY AND INTELLECTUAL PROPERTY</strong></p>
  <p>6.1 The Employee shall not, during or after employment, disclose any confidential information relating to the business of the Company.</p>
  <p>6.2 All intellectual property developed by the Employee during employment shall belong exclusively to the Company.</p>
  
  <p><strong>7. TERMINATION</strong></p>
  <p>7.1 Either Party may terminate this Agreement by providing [NOTICE PERIOD] written notice to the other Party.</p>
  <p>7.2 The Company may terminate this Agreement immediately for cause, including:</p>
  <p>a) Material breach of this Agreement;</p>
  <p>b) Misconduct or negligence;</p>
  <p>c) Fraud or dishonesty.</p>
  
  <p><strong>8. GOVERNING LAW AND DISPUTE RESOLUTION</strong></p>
  <p>8.1 This Agreement shall be governed by the laws of India.</p>
  <p>8.2 Any dispute arising out of this Agreement shall be resolved through [DISPUTE RESOLUTION METHOD].</p>
  
  <p><strong>IN WITNESS WHEREOF</strong>, the Parties have executed this Agreement as of the date first above written.</p>
  
  <p><strong>For [COMPANY NAME]</strong></p>
  <p>____________________</p>
  <p>Name: [AUTHORIZED SIGNATORY]</p>
  <p>Designation: [DESIGNATION]</p>
  
  <p><strong>EMPLOYEE</strong></p>
  <p>____________________</p>
  <p>Name: [EMPLOYEE NAME]</p>`,
  progress: 0
};
