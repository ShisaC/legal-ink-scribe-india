
import React, { useState, useEffect } from 'react';
import ContractStructure from '@/components/ContractStructure';
import QuestionPanel from '@/components/QuestionPanel';
import ContractPreview from '@/components/ContractPreview';
import { useToast } from "@/hooks/use-toast";
import { ContractData, ContractSection, ContractWarning } from '@/types/contract';
import { contractWarnings, sampleContract } from '@/data/contractData';
import { 
  simplifiedQuestions, 
  calculateProgress, 
  getSectionFromCategory,
  getCompletedSections 
} from '@/data/questionData';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  // Transform the section IDs to match the required format
  const initialSections: ContractSection[] = [
    { id: 'preamble', title: 'Preamble', isChecked: false },
    { id: 'recitals', title: 'Recitals', isChecked: false },
    { id: 'definitions', title: 'Definitions', isChecked: false },
    { id: 'operative-clauses', title: 'Operative Clauses', isChecked: false },
    { id: 'financial-terms', title: 'Financial Terms', isChecked: false },
    { id: 'risk-management', title: 'Risk Management', isChecked: false },
    { id: 'boilerplate', title: 'Boilerplate Clauses', isChecked: false },
    { id: 'termination', title: 'Termination', isChecked: false },
    { id: 'signature', title: 'Signature & Execution', isChecked: false }
  ];

  const [sections, setSections] = useState<ContractSection[]>(initialSections);
  const [warnings, setWarnings] = useState<ContractWarning[]>(contractWarnings);
  const [currentCategory, setCurrentCategory] = useState('company-info');
  const [currentSection, setCurrentSection] = useState('preamble');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [contract, setContract] = useState<ContractData>({
    title: "EMPLOYMENT AGREEMENT",
    content: "",
    progress: 0,
    activeSection: 'preamble'
  });
  const { toast } = useToast();
  
  // Find current question group
  const currentQuestionGroup = simplifiedQuestions.find(q => q.id === currentCategory) || simplifiedQuestions[0];
  
  // Update contract progress and section when answers change
  useEffect(() => {
    const progress = calculateProgress(answers);
    let updatedContent = "";
    
    if (progress > 0) {
      // In a real app, we'd generate the contract content based on answers
      updatedContent = sampleContract.content;
      
      // Simple replacements for demonstration
      if (answers['employer-name']) {
        updatedContent = updatedContent.replace(/\[EMPLOYER NAME\]/g, answers['employer-name']);
      }
      
      if (answers['employee-name']) {
        updatedContent = updatedContent.replace(/\[EMPLOYEE NAME\]/g, answers['employee-name']);
      }
      
      if (answers['job-title']) {
        updatedContent = updatedContent.replace(/\[JOB TITLE\]/g, answers['job-title']);
      }
    }
    
    setContract({
      title: "EMPLOYMENT AGREEMENT",
      content: updatedContent,
      progress,
      activeSection: currentSection
    });
    
    // Get sections that should be marked as completed based on answers
    const completedSections = getCompletedSections(answers);
    
    // Update sections with checkmarks based on completed sections
    setSections(prev => 
      prev.map(section => ({
        ...section,
        isChecked: completedSections.includes(section.id)
      }))
    );
    
  }, [answers, currentSection]);
  
  const handleSectionToggle = (id: string, checked: boolean) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, isChecked: checked } : section
      )
    );

    // If checking a section, remove related warnings
    if (checked) {
      setWarnings(prev => prev.filter(warning => warning.section !== id));
    }
  };

  const handleSectionClick = (id: string) => {
    setCurrentSection(id);
    
    // Find the first question category for this section
    const categoryForSection = Object.entries(getSectionFromCategory)
      .find(([_, section]) => section === id)?.[0];
    
    if (categoryForSection) {
      setCurrentCategory(categoryForSection);
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Show a toast for better UX
    toast({
      title: "Answer Saved",
      description: "Your response has been recorded.",
    });
  };

  const handleNextQuestion = () => {
    const currentIndex = simplifiedQuestions.findIndex(q => q.id === currentCategory);
    if (currentIndex < simplifiedQuestions.length - 1) {
      const nextCategory = simplifiedQuestions[currentIndex + 1].id;
      setCurrentCategory(nextCategory);
      
      // Update current section based on category
      const nextSection = getSectionFromCategory(nextCategory);
      setCurrentSection(nextSection);
      
      toast({
        title: "Moving to Next Section",
        description: `Now answering questions about ${simplifiedQuestions[currentIndex + 1].text}.`,
      });
    }
  };

  const handlePreviousQuestion = () => {
    const currentIndex = simplifiedQuestions.findIndex(q => q.id === currentCategory);
    if (currentIndex > 0) {
      const prevCategory = simplifiedQuestions[currentIndex - 1].id;
      setCurrentCategory(prevCategory);
      
      // Update current section based on category
      const prevSection = getSectionFromCategory(prevCategory);
      setCurrentSection(prevSection);
    }
  };

  const handleAddToAnnexure = () => {
    toast({
      title: "Added to Annexure",
      description: "Content has been added to the annexure.",
    });
  };

  const handleEditContract = () => {
    toast({
      title: "Edit Mode",
      description: "Contract edit mode enabled.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-contractDark">Start a fresh contract</h1>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Contract Structure - 30% width */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <ContractStructure 
              sections={sections}
              warnings={warnings}
              onSectionToggle={handleSectionToggle}
              currentSection={currentSection}
              onSectionClick={handleSectionClick}
            />
          </div>

          {/* Right Panel - Questions & Contract Preview - 70% width */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            <QuestionPanel 
              currentGroup={{
                id: currentQuestionGroup.id,
                title: currentQuestionGroup.text,
                description: "Answer the following questions to generate your employment agreement",
                questions: currentQuestionGroup.subQuestions || [currentQuestionGroup],
                section: currentSection
              }}
              onAnswerChange={handleAnswerChange}
              currentQuestionIndex={simplifiedQuestions.findIndex(q => q.id === currentCategory)}
              totalQuestions={simplifiedQuestions.length}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
              onAddToAnnexure={handleAddToAnnexure}
              answers={answers}
            />

            <Separator className="my-4" />

            <ContractPreview 
              contract={contract}
              onEdit={handleEditContract}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
