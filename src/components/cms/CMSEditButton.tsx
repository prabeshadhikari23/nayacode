import React from 'react';
import { Settings, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCMS } from './CMSProvider';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export const CMSEditButton: React.FC = () => {
  const { isEditMode, setEditMode } = useCMS();
  const { user, isEditor } = useAuth();

  // Show login button if not authenticated
  if (!user) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Link to="/auth/login">
          <Button
            className="rounded-full p-3 shadow-lg bg-blue-600 hover:bg-blue-700"
            size="icon"
          >
            <LogIn className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  // Only show edit button for editors and admins
  if (!isEditor) {
    return null;
  }
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