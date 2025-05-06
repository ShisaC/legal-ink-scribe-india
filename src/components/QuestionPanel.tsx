
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  PlusCircle,
  FileText
} from 'lucide-react';
import { Question, QuestionGroup } from '@/types/contract';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface QuestionPanelProps {
  currentGroup: QuestionGroup;
  onAnswerChange: (questionId: string, answer: any) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  onAddToAnnexure: () => void;
}

const QuestionPanel = ({
  currentGroup,
  onAnswerChange,
  currentQuestionIndex,
  totalQuestions,
  onNext,
  onPrevious,
  onAddToAnnexure
}: QuestionPanelProps) => {
  const [expandedSubQuestions, setExpandedSubQuestions] = useState<string[]>([]);

  const toggleSubQuestion = (questionId: string) => {
    setExpandedSubQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const renderQuestionInput = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            placeholder={question.placeholder || `Enter your answer`}
            value={question.answer as string || ''}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            className="input-highlight"
          />
        );
      case 'textarea':
        return (
          <Textarea
            placeholder={question.placeholder || `Enter your answer`}
            value={question.answer as string || ''}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
            className="min-h-[100px] input-highlight"
          />
        );
      case 'table':
        return (
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {question.tableHeaders?.map((header, i) => (
                    <th key={i} className="py-2 px-3 text-left text-sm font-medium text-gray-700">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: question.tableRows || 5 }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-t">
                    {question.tableHeaders?.map((header, colIndex) => {
                      const id = `${question.id}-${rowIndex}-${colIndex}`;
                      const answers = question.answer as { [key: string]: string } || {};
                      return (
                        <td key={colIndex} className="py-1 px-2">
                          <Input
                            placeholder={colIndex === 0 ? header : ''}
                            value={answers[id] || (colIndex === 0 && rowIndex === 0 ? 'Vacation Leave' : 
                                              colIndex === 0 && rowIndex === 1 ? 'Sick Leave' :
                                              colIndex === 0 && rowIndex === 2 ? 'Maternity Leave' :
                                              colIndex === 0 && rowIndex === 3 ? 'Paternity Leave' :
                                              colIndex === 0 && rowIndex === 4 ? 'Other Leaves' : '')}
                            onChange={(e) => {
                              const newAnswers = { ...answers, [id]: e.target.value };
                              onAnswerChange(question.id, newAnswers);
                            }}
                            className="input-highlight border-0 focus:ring-0 text-sm py-1 px-2 h-8"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'toggle':
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant={question.answer === true ? "default" : "outline"}
              onClick={() => onAnswerChange(question.id, true)}
              className="w-20"
            >
              Yes
            </Button>
            <Button
              variant={question.answer === false ? "default" : "outline"}
              onClick={() => onAnswerChange(question.id, false)}
              className="w-20"
            >
              No
            </Button>
          </div>
        );
      default:
        return <Input placeholder="Enter your answer" />;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-contractDark">{currentGroup.title}</h2>
          <span className="text-sm bg-slate-100 text-contractPurple px-3 py-1 rounded-full">
            {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>
        
        {currentGroup.description && (
          <p className="text-muted-foreground mt-2">{currentGroup.description}</p>
        )}

        <div className="contract-progress-bar mt-4">
          <div 
            className="progress" 
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-6 pt-4">
        {currentGroup.questions.map((question) => (
          <div key={question.id} className="contract-question-card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-2">
                <span className="text-lg font-medium text-contractDark">{question.text}</span>
                {question.recommendation && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-5 w-5 text-contractBlue cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-white p-2 shadow-lg border">
                        <p>{question.recommendation}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              {question.subQuestions && question.subQuestions.length > 0 && (
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSubQuestion(question.id)}
                  className="text-contractPurple hover:text-contractBlue hover:bg-accent"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Additional Options
                </Button>
              )}
            </div>

            {renderQuestionInput(question)}

            {question.recommendation && (
              <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600">
                <strong>Recommendation:</strong> {question.recommendation}
              </div>
            )}

            {question.clausePreview && question.answer && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
                <strong>Clause Preview:</strong> 
                <p className="mt-1 text-gray-700">{question.clausePreview}</p>
              </div>
            )}

            {question.subQuestions && question.subQuestions.length > 0 && (
              <div className={`mt-4 ${expandedSubQuestions.includes(question.id) ? 'block animate-fade-in' : 'hidden'}`}>
                <Separator className="my-3" />
                <Accordion type="single" collapsible className="w-full">
                  {question.subQuestions.map((subQuestion) => (
                    <AccordionItem key={subQuestion.id} value={subQuestion.id} className="border-b-0">
                      <AccordionTrigger className="text-sm font-medium text-contractDark py-2">
                        {subQuestion.text}
                      </AccordionTrigger>
                      <AccordionContent className="pt-3">
                        {renderQuestionInput(subQuestion)}
                        
                        {subQuestion.recommendation && (
                          <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-600">
                            {subQuestion.recommendation}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        ))}
      </CardContent>

      <CardFooter className="justify-between pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={onAddToAnnexure}
          className="text-contractPurple border-contractPurple hover:text-contractBlue hover:border-contractBlue"
        >
          <FileText className="h-4 w-4 mr-2" />
          Add to annexure
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            disabled={currentQuestionIndex === 0}
            className="text-contractPurple border-contractPurple hover:text-contractBlue hover:border-contractBlue"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button 
            onClick={onNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="bg-contractBlue hover:bg-contractBlue/80"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuestionPanel;
