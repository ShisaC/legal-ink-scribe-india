import React, { useState, useEffect } from 'react';
import ContractStructure from '@/components/ContractStructure';
import QuestionPanel from '@/components/QuestionPanel';
import ContractPreview from '@/components/ContractPreview';
import { useToast } from "@/hooks/use-toast";
import { QuestionGroup, ContractData } from '@/types/contract';
import { contractSections, contractWarnings, questionGroups, sampleContract } from '@/data/contractData';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [sections, setSections] = useState(contractSections);
  const [warnings, setWarnings] = useState(contractWarnings);
  const [currentSection, setCurrentSection] = useState('preamble');
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [contract, setContract] = useState<ContractData>({
    title: "EMPLOYMENT AGREEMENT",
    content: "",
    progress: 0,
    activeSection: 'preamble'
  });
  const { toast } = useToast();
  
  // Filter question groups based on current section
  const filteredGroups = questionGroups.filter(group => group.section === currentSection);
  const currentGroup = filteredGroups[currentGroupIndex] || questionGroups[0];
  
  // Calculate total questions for progress
  const totalQuestionsInCurrentSection = filteredGroups.length;
  
  // Calculate overall progress
  const totalGroups = questionGroups.length;
  const completedGroups = questionGroups.filter(group => {
    return group.questions.some(q => q.answer !== undefined);
  }).length;

  useEffect(() => {
    // Reset current group index when changing sections
    setCurrentGroupIndex(0);
  }, [currentSection]);

  useEffect(() => {
    // Update contract preview with answers
    let progress = 0;
    let answered = 0;
    let total = 0;

    questionGroups.forEach(group => {
      group.questions.forEach(q => {
        total++;
        if (q.answer) answered++;
      });
    });

    progress = total > 0 ? Math.floor((answered / total) * 100) : 0;
    
    // Generate sample contract preview based on progress
    const updatedContent = progress > 0 ? sampleContract.content : "";

    setContract({
      title: "EMPLOYMENT AGREEMENT",
      content: updatedContent,
      progress,
      activeSection: currentSection
    });
  }, [questionGroups, currentSection]);

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
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    const updatedGroups = questionGroups.map(group => {
      const updatedQuestions = group.questions.map(q => {
        if (q.id === questionId) {
          return { ...q, answer };
        }
        
        // Also check subquestions
        if (q.subQuestions) {
          const updatedSubQuestions = q.subQuestions.map(sub => 
            sub.id === questionId ? { ...sub, answer } : sub
          );
          return { ...q, subQuestions: updatedSubQuestions };
        }
        
        return q;
      });
      
      return { ...group, questions: updatedQuestions };
    });
    
    // Update progressively as user answers questions
    setTimeout(() => {
      // In a real application, we would update the contract content based on answers
      let newProgress = Math.min(contract.progress + Math.floor(Math.random() * 5) + 1, 100);
      setContract(prev => ({
        ...prev,
        progress: newProgress,
        content: newProgress > 0 ? sampleContract.content.replace('[JOB TITLE]', 
          questionGroups.find(g => g.id === 'position-details')?.questions.find(q => q.id === 'job-title')?.answer as string || '[JOB TITLE]') : ""
      }));
    }, 300);
  };

  const handleNextQuestion = () => {
    if (currentGroupIndex < filteredGroups.length - 1) {
      setCurrentGroupIndex(prev => prev + 1);
    } else {
      // Find next section
      const sectionIndex = sections.findIndex(s => s.id === currentSection);
      if (sectionIndex < sections.length - 1) {
        setCurrentSection(sections[sectionIndex + 1].id);
        setCurrentGroupIndex(0);
        
        toast({
          title: "Section Complete",
          description: `You've completed the ${sections[sectionIndex].title} section.`,
        });
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(prev => prev - 1);
    } else {
      // Find previous section
      const sectionIndex = sections.findIndex(s => s.id === currentSection);
      if (sectionIndex > 0) {
        setCurrentSection(sections[sectionIndex - 1].id);
        const prevFilteredGroups = questionGroups.filter(
          group => group.section === sections[sectionIndex - 1].id
        );
        setCurrentGroupIndex(prevFilteredGroups.length - 1);
      }
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Contract Structure */}
          <div className="lg:col-span-4">
            <ContractStructure 
              sections={sections}
              warnings={warnings}
              onSectionToggle={handleSectionToggle}
              currentSection={currentSection}
              onSectionClick={handleSectionClick}
            />
          </div>

          {/* Right Panel - Questions & Contract Preview */}
          <div className="lg:col-span-8">
            <QuestionPanel 
              currentGroup={currentGroup}
              onAnswerChange={handleAnswerChange}
              currentQuestionIndex={currentGroupIndex}
              totalQuestions={totalQuestionsInCurrentSection}
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
