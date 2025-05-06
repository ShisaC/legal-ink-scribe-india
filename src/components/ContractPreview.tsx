import React from 'react';
import { Button } from "@/components/ui/button";
import { EditIcon, Download, FileText, Eye } from 'lucide-react';
import { ContractData } from '@/types/contract';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ContractPreviewProps {
  contract: ContractData;
  onEdit: () => void;
}

const ContractPreview = ({ contract, onEdit }: ContractPreviewProps) => {
  const { toast } = useToast();
  
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

  // Handle document export
  const handleExport = (format: 'pdf' | 'docx') => {
    if (!contract.content) {
      toast({
        title: "Cannot Export Empty Contract",
        description: "Please answer some questions to generate contract content first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: `Export as ${format.toUpperCase()}`,
      description: `Your contract is being prepared as a ${format.toUpperCase()} file.`,
    });
    
    // In a real application, this would trigger an API call to generate and download the document
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your ${format.toUpperCase()} document is ready to download.`,
      });
    }, 1500);
  };

  // Handle preview in full screen
  const handleFullPreview = () => {
    if (!contract.content) {
      toast({
        title: "Empty Contract",
        description: "Please answer some questions to generate contract content first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Full Preview",
      description: "Opening full contract preview.",
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold text-contractDark">Contract Preview</h2>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleFullPreview}
            variant="ghost"
            size="sm"
            className="text-contractPurple hover:text-contractBlue"
            disabled={!contract.content}
          >
            <Eye className="h-4 w-4 mr-2" /> Full View
          </Button>
          <Button 
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="text-contractPurple hover:text-contractBlue"
          >
            <EditIcon className="h-4 w-4 mr-2" /> Edit
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <div className="border rounded-md p-4 bg-[#f7f9fc] h-full prose max-w-none overflow-y-auto max-h-[500px] text-left">
          <h1 className="text-2xl font-bold mb-4">{contract.title}</h1>
          {contract.content ? (
            <div dangerouslySetInnerHTML={highlightActiveSection(contract.content, contract.activeSection)} className="text-sm" />
          ) : (
            <div className="text-muted-foreground italic text-center py-10">
              Your contract will appear here as you answer the questions.
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="justify-between border-t pt-4">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-contractPurple hover:text-contractBlue hover:bg-contractBlue/5"
            onClick={() => handleExport('docx')}
            disabled={!contract.content}
          >
            <Download className="h-4 w-4 mr-2" />
            Export DOCX
          </Button>
          <Button 
            variant="outline" 
            className="text-contractPurple hover:text-contractBlue hover:bg-contractBlue/5"
            onClick={() => handleExport('pdf')}
            disabled={!contract.content}
          >
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">
            {contract.progress}% Complete
          </span>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-contractBlue transition-all duration-500 ease-in-out"
              style={{ width: `${contract.progress}%` }}
            ></div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContractPreview;
