
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from 'lucide-react';
import { ContractSection, ContractWarning } from '@/types/contract';

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
    <div className="bg-white rounded-lg p-6 contract-panel-shadow h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-2 text-contractDark">Employment Agreement</h2>
      <h3 className="text-lg mb-4 text-contractDark">Structure</h3>
      
      <div className="space-y-2 mb-6 flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div 
            key={section.id}
            className={`contract-structure-item cursor-pointer ${currentSection === section.id ? 'active' : ''}`}
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
              className="w-full cursor-pointer select-none"
            >
              {section.title}
            </label>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div>
        <h3 className="flex items-center gap-2 text-lg mb-3 text-contractDark">
          <AlertCircle className="h-5 w-5 text-warning" />
          Contract Analysis
        </h3>

        {warnings.length > 0 ? (
          <div className="space-y-2">
            {warnings.map((warning) => (
              <div 
                key={warning.id} 
                className={warning.type === 'warning' ? 'contract-warning' : 'contract-error'}
              >
                <AlertCircle className={`h-4 w-4 ${warning.type === 'warning' ? 'text-warning' : 'text-error'}`} />
                <span className="text-sm">{warning.message}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-success flex items-center gap-2 p-3 rounded-md bg-success/10">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <span>No issues detected</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractStructure;
