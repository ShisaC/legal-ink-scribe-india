
import React from 'react';
import { Button } from "@/components/ui/button";
import { EditIcon } from 'lucide-react';
import { ContractData } from '@/types/contract';

interface ContractPreviewProps {
  contract: ContractData;
  onEdit: () => void;
}

const ContractPreview = ({ contract, onEdit }: ContractPreviewProps) => {
  return (
    <div className="bg-white rounded-lg p-6 mt-4 contract-panel-shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-contractDark">Contract Preview</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onEdit}
          className="text-contractPurple hover:text-contractBlue hover:bg-accent"
        >
          <EditIcon className="h-4 w-4 mr-2" /> Edit
        </Button>
      </div>
      
      <div className="border rounded-md p-4 bg-white min-h-[300px] prose max-w-none">
        <h3 className="font-bold text-lg mb-2">{contract.title}</h3>
        {contract.content ? (
          <div dangerouslySetInnerHTML={{ __html: contract.content }} />
        ) : (
          <div className="text-muted-foreground italic">
            Your contract will appear here as you answer the questions.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractPreview;
