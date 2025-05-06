
import React from 'react';
import { Button } from "@/components/ui/button";
import { EditIcon, Download, FileText } from 'lucide-react';
import { ContractData } from '@/types/contract';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface ContractPreviewProps {
  contract: ContractData;
  onEdit: () => void;
}

const ContractPreview = ({ contract, onEdit }: ContractPreviewProps) => {
  // Function to identify and highlight the active section
  const highlightActiveSection = (content: string, activeSection?: string) => {
    if (!activeSection || !content) return { __html: content };
    
    // This is a simple implementation - in a real app, you would need more sophisticated 
    // logic to find and highlight sections based on their ID
    const sectionMap: {[key: string]: string} = {
      'preamble': 'THIS EMPLOYMENT AGREEMENT',
      'recitals': 'WHEREAS:',
      'definitions': 'Definitions',
      'operative-clauses': 'APPOINTMENT AND POSITION',
      'financial-terms': 'COMPENSATION AND BENEFITS',
      'risk-management': 'CONFIDENTIALITY AND INTELLECTUAL PROPERTY',
      'termination': 'TERMINATION',
      'signature': 'IN WITNESS WHEREOF'
    };
    
    const searchTerm = sectionMap[activeSection] || '';
    
    if (!searchTerm) return { __html: content };
    
    // Highlight the relevant section
    const highlightedContent = content.replace(
      new RegExp(`(<p><strong>[^<]*${searchTerm}[^<]*</strong></p>)`, 'g'), 
      `<div class="bg-contractBlue/10 p-2 rounded my-2 border-l-4 border-contractBlue">$1</div>`
    );
    
    return { __html: highlightedContent };
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-contractDark">Contract Preview</h2>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {contract.progress}% Complete
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-contractBlue"
                style={{ width: `${contract.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="border rounded-md p-4 bg-white min-h-[300px] prose max-w-none overflow-y-auto max-h-[500px]">
          <h3 className="font-bold text-lg mb-2">{contract.title}</h3>
          {contract.content ? (
            <div dangerouslySetInnerHTML={highlightActiveSection(contract.content, contract.activeSection)} />
          ) : (
            <div className="text-muted-foreground italic">
              Your contract will appear here as you answer the questions.
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="justify-between border-t pt-4">
        <div className="flex gap-2">
          <Button variant="outline" className="text-contractPurple">
            <Download className="h-4 w-4 mr-2" />
            Export DOCX
          </Button>
          <Button variant="outline" className="text-contractPurple">
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
        <Button 
          onClick={onEdit}
          variant="outline"
          className="text-contractPurple hover:text-contractBlue"
        >
          <EditIcon className="h-4 w-4 mr-2" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContractPreview;
