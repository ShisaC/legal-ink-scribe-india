
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle } from 'lucide-react';
import { ContractSection, ContractWarning } from '@/types/contract';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ContractStructureProps {
  sections: ContractSection[];
  warnings: ContractWarning[];
  onSectionToggle: (id: string, checked: boolean) => void;
  currentSection: string;
  onSectionClick: (id: string) => void;
}

const ContractStructure = ({
  sections,
  warnings,
  onSectionToggle,
  currentSection,
  onSectionClick
}: ContractStructureProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-4 px-4">
        <CardTitle className="text-lg font-medium text-contractDark">Employment Agreement</CardTitle>
        <h3 className="text-sm font-medium text-contractDark mt-1">Structure</h3>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto pb-0 px-3">
        <div className="space-y-1 mb-4">
          {sections.map((section) => (
            <div 
              key={section.id}
              className={`contract-structure-item py-1.5 ${currentSection === section.id ? 'active' : ''}`}
              onClick={() => onSectionClick(section.id)}
            >
              <Checkbox 
                id={section.id} 
                checked={section.isChecked} 
                onCheckedChange={(checked) => onSectionToggle(section.id, checked as boolean)}
                onClick={(e) => e.stopPropagation()}
                className="text-contractBlue"
              />
              <label 
                htmlFor={section.id}
                className="w-full cursor-pointer select-none text-sm"
              >
                {section.title}
              </label>
              {section.isChecked && (
                <CheckCircle className="h-4 w-4 text-success ml-auto" />
              )}
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-3">Contract Analysis</h3>

          <div className="text-xs space-y-4">
            <div>
              <div className="flex items-center text-blue-500 mb-2">
                <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                <span>Areas of Improvement</span>  
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Consider adding more specific payment terms</li>
                <li>Include dispute resolution procedures</li>
                <li>Specify termination conditions</li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center text-amber-500 mb-2">
                <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                <span>Missing Clauses</span>  
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Force Majeure clause</li>
                <li>Confidentiality agreement</li>
                <li>Intellectual property rights</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center text-red-500 mb-2">
                <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                <span>Potential Risks</span>  
              </div>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Unclear delivery timelines</li>
                <li>Insufficient liability protection</li>
                <li>Vague scope of work</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractStructure;
