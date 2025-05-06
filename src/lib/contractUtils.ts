
import { QuestionGroup } from "@/types/contract";

/**
 * Generates contract text based on user answers
 */
export const generateContractContent = (questionGroups: QuestionGroup[]): string => {
  // This is a simplified implementation
  // In a real app, this would be more sophisticated based on answers
  
  // Find basic company and employee information
  const basicInfo = questionGroups.find(group => group.id === 'basic-info');
  const employerName = basicInfo?.questions.find(q => q.id === 'employer-name')?.answer || '[EMPLOYER NAME]';
  const employerAddress = basicInfo?.questions.find(q => q.id === 'employer-address')?.answer || '[EMPLOYER ADDRESS]';
  const employeeName = basicInfo?.questions.find(q => q.id === 'employee-name')?.answer || '[EMPLOYEE NAME]';
  const employeeAddress = basicInfo?.questions.find(q => q.id === 'employee-address')?.answer || '[EMPLOYEE ADDRESS]';
  
  // Find position details
  const positionDetails = questionGroups.find(group => group.id === 'position-details');
  const jobTitle = positionDetails?.questions.find(q => q.id === 'job-title')?.answer || '[JOB TITLE]';
  const jobDescription = positionDetails?.questions.find(q => q.id === 'job-description')?.answer || '[JOB DESCRIPTION]';
  
  // Generate contract text using template literals
  const contract = `
    <p><strong>THIS EMPLOYMENT AGREEMENT</strong> ("Agreement") is made and entered into on this [DATE], by and between:</p>
    <p><strong>${employerName}</strong>, a company incorporated under the Companies Act, 2013, having its registered office at ${employerAddress} (hereinafter referred to as the "Company"), AND</p>
    <p><strong>${employeeName}</strong>, residing at ${employeeAddress} (hereinafter referred to as the "Employee").</p>
    <p>The Company and the Employee shall be individually referred to as "Party" and collectively as "Parties".</p>
    
    <p><strong>WHEREAS:</strong></p>
    <p>A. The Company is engaged in the business of [BUSINESS DESCRIPTION];</p>
    <p>B. The Company wishes to employ the Employee on the terms and conditions set forth in this Agreement; and</p>
    <p>C. The Employee wishes to be employed by the Company on such terms and conditions.</p>
    
    <p><strong>NOW THEREFORE, THE PARTIES AGREE AS FOLLOWS:</strong></p>
    
    <p><strong>1. APPOINTMENT AND POSITION</strong></p>
    <p>1.1 The Company hereby employs the Employee as ${jobTitle}, and the Employee accepts such employment.</p>
    <p>1.2 The Employee shall report to [REPORTING MANAGER DESIGNATION].</p>
    <p>1.3 The Employee's duties and responsibilities shall include ${jobDescription}.</p>
  `;
  
  return contract;
};

/**
 * Checks for issues in the contract based on user answers
 */
export const validateContractAnswers = (questionGroups: QuestionGroup[]) => {
  const warnings = [];
  
  // Check for compensation details
  const compensationGroup = questionGroups.find(group => group.id === 'compensation');
  const baseSalary = compensationGroup?.questions.find(q => q.id === 'base-salary')?.answer;
  
  if (!baseSalary) {
    warnings.push({
      id: 'w-salary',
      message: 'Base salary details are missing',
      type: 'warning',
      section: 'financial-terms'
    });
  }
  
  // Check for dispute resolution
  const disputeGroup = questionGroups.find(group => group.id === 'dispute-resolution');
  const disputeProcess = disputeGroup?.questions.find(q => q.id === 'dispute-process')?.answer;
  
  if (!disputeProcess) {
    warnings.push({
      id: 'w-dispute',
      message: 'Include dispute resolution procedures',
      type: 'warning',
      section: 'risk-management'
    });
  }
  
  return warnings;
};

/**
 * Recommends improvements for the contract
 */
export const getContractRecommendations = (questionGroups: QuestionGroup[]) => {
  const recommendations = [];
  
  // Check confidentiality clause
  const confidentialityGroup = questionGroups.find(group => group.id === 'confidentiality');
  const confidentialityClause = confidentialityGroup?.questions.find(q => q.id === 'confidentiality-clause')?.answer;
  
  if (confidentialityClause && confidentialityClause.toString().length < 100) {
    recommendations.push({
      section: 'Confidentiality',
      text: 'Consider expanding the confidentiality clause to include specific types of information and explicit duration'
    });
  }
  
  // Check termination notice
  const terminationGroup = questionGroups.find(group => group.id === 'termination');
  const noticePeriod = terminationGroup?.questions.find(q => q.id === 'notice-period')?.answer;
  
  if (noticePeriod && (noticePeriod.toString().includes('15') || noticePeriod.toString().includes('20'))) {
    recommendations.push({
      section: 'Termination',
      text: 'Indian standard practice is to have 30-90 days notice period for skilled positions'
    });
  }
  
  return recommendations;
};
