import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Please enter a valid email address');
export const phoneSchema = z.string().min(10, 'Phone number must be at least 10 digits');
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters');

// Contact form validation
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// CMS validation schemas
export const serviceSchema = z.object({
  id: z.string(),
  icon: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  features: z.array(z.string()),
  category: z.string(),
  order: z.number().min(1),
});

export const portfolioSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  category: z.string(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageUrl: z.string().url('Please enter a valid URL'),
  tags: z.array(z.string()),
  featured: z.boolean(),
  order: z.number().min(1),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;
export type PortfolioFormData = z.infer<typeof portfolioSchema>;