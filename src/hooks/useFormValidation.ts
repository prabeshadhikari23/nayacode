import { useState } from 'react';
import { z } from 'zod';

export const useFormValidation = <T extends Record<string, any>>(
  schema: z.ZodSchema<T>,
  initialValues: T
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (data: T): boolean => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0] as keyof T] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (onSubmit: (data: T) => Promise<void> | void) => {
    setIsSubmitting(true);
    
    if (validate(values)) {
      try {
        await onSubmit(values);
        setValues(initialValues); // Reset form on success
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    validate,
    reset,
    setValues
  };
};