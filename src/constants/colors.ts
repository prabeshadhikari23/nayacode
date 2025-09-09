// Centralized color constants
export const COLORS = {
  vibrant: {
    purple: '#8B5CF6',
    pink: '#EC4899',
    orange: '#F97316',
    cyan: '#06B6D4',
    emerald: '#10B981',
    yellow: '#F59E0B',
    indigo: '#6366F1',
    rose: '#F43F5E',
    blue: '#3B82F6',
    red: '#EF4444',
  },
  naya: {
    blue: 'hsl(220, 100%, 50%)',
    red: 'hsl(0, 100%, 60%)',
    white: 'hsl(0, 0%, 100%)',
  },
  gradients: {
    primary: 'from-vibrant-purple via-vibrant-pink to-vibrant-orange',
    secondary: 'from-vibrant-cyan to-vibrant-blue',
    accent: 'from-vibrant-orange to-vibrant-red',
    success: 'from-vibrant-emerald to-vibrant-cyan',
  }
} as const;

export const getColorByIndex = (index: number, type: 'vibrant' | 'border' = 'vibrant') => {
  const colors = Object.values(COLORS.vibrant);
  const selectedColor = colors[index % colors.length];
  
  if (type === 'border') {
    return `border-[${selectedColor}]`;
  }
  
  return `text-[${selectedColor}]`;
};