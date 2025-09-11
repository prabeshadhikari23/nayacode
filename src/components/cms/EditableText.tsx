import React, { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateCMSContent } from '@/lib/cms';
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
  const { isEditMode, refreshData, content } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get current value from CMS content
  const getCurrentValue = () => {
    const item = content.find(item => item.key === contentKey);
    return item?.value || defaultValue;
  };
  
  const [value, setValue] = useState(getCurrentValue);

  // Update local state when content changes
  React.useEffect(() => {
    setValue(getCurrentValue());
  }, [content, contentKey, defaultValue]);

  const handleSave = async () => {
    await updateCMSContent(contentKey, value);
    setIsEditing(false);
    await refreshData();
  };

  const handleCancel = () => {
    setValue(getCurrentValue());
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
        {getCurrentValue()}
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