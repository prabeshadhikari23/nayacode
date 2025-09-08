import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCMS } from './CMSProvider';

export const CMSEditButton: React.FC = () => {
  const { isEditMode, setEditMode } = useCMS();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={() => setEditMode(!isEditMode)}
        className={`rounded-full p-3 shadow-lg ${
          isEditMode 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        size="icon"
      >
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  );
};