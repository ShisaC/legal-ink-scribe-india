
import React, { useState, useEffect } from 'react';
import ContractStructure from '@/components/ContractStructure';
import QuestionPanel from '@/components/QuestionPanel';
import ContractPreview from '@/components/ContractPreview';
import { useToast } from "@/hooks/use-toast";
import { ContractData } from '@/types/contract';
import { contractSections, contractWarnings, questionGroups, sampleContract } from '@/data/contractData';
import { simplifiedQuestions, calculateProgress, getSectionFromCategory } from '@/data/questionData';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [sections, setSections] = useState(contractSections);
  const [warnings, setWarnings] = useState(contractWarnings);
  const [currentCategory, setCurrentCategory] = useState('basic-info');
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
    
    // Update sections that are completed
    const completedCategories = Object.keys(answers).filter(id => answers[id]);
    const completedSections = new Set<string>();
    
    completedCategories.forEach(id => {
      // Find which question this answer belongs to
      const question = simplifiedQuestions.find(q => 
        q.id === id || q.subQuestions?.some(sq => sq.id === id)
      );
      
      if (question) {
        const sectionId = getSectionFromCategory(question.id);
        completedSections.add(sectionId);
      }
    });
    
    // Update sections with checkmarks
    setSections(prev => 
      prev.map(section => ({
        ...section,
        isChecked: completedSections.has(section.id)
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
