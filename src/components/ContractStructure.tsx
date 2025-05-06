
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
      <CardHeader>
        <CardTitle className="text-xl text-contractDark">Employment Agreement</CardTitle>
        <h3 className="text-lg text-contractDark">Structure</h3>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto pb-0">
        <div className="space-y-2 mb-6">
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
              {section.isChecked && (
                <CheckCircle className="h-4 w-4 text-success ml-auto" />
              )}
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center gap-2 text-lg mb-3 text-contractDark w-full justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <span>Contract Compliance Alerts</span>
            </div>
            <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
              {warnings.length}
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {warnings.length > 0 ? (
              <div className="space-y-2 mt-2">
                {warnings.map((warning) => (
                  <div 
                    key={warning.id} 
                    className={
                      warning.type === 'warning' 
                        ? 'contract-warning' 
                        : warning.type === 'error' 
                          ? 'contract-error' 
                          : 'contract-success'
                    }
                  >
                    <AlertCircle className={`h-4 w-4 ${
                      warning.type === 'warning' 
                        ? 'text-warning' 
                        : warning.type === 'error' 
                          ? 'text-error' 
                          : 'text-success'
                    }`} />
                    <span className="text-sm">{warning.message}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-success flex items-center gap-2 p-3 rounded-md bg-success/10">
                <CheckCircle className="h-5 w-5" />
                <span>All sections compliant</span>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default ContractStructure;
