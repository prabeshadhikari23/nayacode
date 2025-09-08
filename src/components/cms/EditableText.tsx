import React, { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateCMSContent, getCMSContentByKey } from '@/lib/cms';
import { useCMS } from './CMSProvider';

interface EditableTextProps {
  contentKey: string;
  defaultValue?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  contentKey,
  defaultValue = '',
  className = '',
  as: Component = 'p',
  multiline = false
}) => {
  const { isEditMode, refreshData } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(() => getCMSContentByKey(contentKey) || defaultValue);

  const handleSave = () => {
    updateCMSContent(contentKey, value);
    setIsEditing(false);
    refreshData();
  };

  const handleCancel = () => {
    setValue(getCMSContentByKey(contentKey) || defaultValue);
    setIsEditing(false);
  };

  if (isEditMode && isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full"
            rows={3}
          />
        ) : (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full"
          />
        )}
        <div className="flex gap-2 mt-2">
          <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Component className={className}>
        {getCMSContentByKey(contentKey) || defaultValue}
      </Component>
      {isEditMode && (
        <Button
          size="sm"
          variant="outline"
          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
        >
          <Edit3 className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};