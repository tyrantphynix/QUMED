import { useState, useEffect } from 'react';

export const LIQUID_OPTIONS = {
  original: {
    id: 'original',
    name: 'Original (Pale Water / Saline)',
    badgeColor: '#7dd3fc',
    tubeStroke: 'rgba(100, 170, 255, 0.45)',
    syringeStops: [
      { offset: '0%', color: '#bce7fd', opacity: 0.5 },
      { offset: '18%', color: '#e0f4fe', opacity: 0.65 },
      { offset: '48%', color: '#7dd3fc', opacity: 0.32 },
      { offset: '78%', color: '#bae6fd', opacity: 0.58 },
      { offset: '100%', color: '#38bdf8', opacity: 0.45 },
    ],
    meniscusStops: [
      { offset: '0%', color: '#ffffff', opacity: 0.8 },
      { offset: '50%', color: '#e0f2fe', opacity: 0.3 },
      { offset: '100%', color: '#ffffff', opacity: 0.7 },
    ]
  },
  option1: {
    id: 'option1',
    name: 'Option 1: Electric Cyan (Luminous Neon)',
    badgeColor: '#00E5FF',
    tubeStroke: 'rgba(0, 215, 255, 0.85)',
    syringeStops: [
      { offset: '0%', color: '#00E5FF', opacity: 0.85 },
      { offset: '20%', color: '#80F4FF', opacity: 0.95 },
      { offset: '50%', color: '#00B4D8', opacity: 0.75 },
      { offset: '80%', color: '#00E5FF', opacity: 0.90 },
      { offset: '100%', color: '#0077B6', opacity: 0.85 },
    ],
    meniscusStops: [
      { offset: '0%', color: '#ffffff', opacity: 0.95 },
      { offset: '50%', color: '#E0F7FA', opacity: 0.65 },
      { offset: '100%', color: '#ffffff', opacity: 0.95 },
    ]
  },
  option2: {
    id: 'option2',
    name: 'Option 2: Clinical Amber (Iodine / Gold)',
    badgeColor: '#F59E0B',
    tubeStroke: 'rgba(245, 158, 11, 0.88)',
    syringeStops: [
      { offset: '0%', color: '#F59E0B', opacity: 0.88 },
      { offset: '20%', color: '#FDE68A', opacity: 0.95 },
      { offset: '50%', color: '#D97706', opacity: 0.80 },
      { offset: '80%', color: '#F59E0B', opacity: 0.90 },
      { offset: '100%', color: '#B45309', opacity: 0.85 },
    ],
    meniscusStops: [
      { offset: '0%', color: '#ffffff', opacity: 0.95 },
      { offset: '50%', color: '#FEF3C7', opacity: 0.70 },
      { offset: '100%', color: '#ffffff', opacity: 0.95 },
    ]
  },
  option3: {
    id: 'option3',
    name: 'Option 3: Medical Emerald (Surgical Green)',
    badgeColor: '#10B981',
    tubeStroke: 'rgba(16, 185, 129, 0.85)',
    syringeStops: [
      { offset: '0%', color: '#10B981', opacity: 0.85 },
      { offset: '20%', color: '#6EE7B7', opacity: 0.95 },
      { offset: '50%', color: '#059669', opacity: 0.78 },
      { offset: '80%', color: '#10B981', opacity: 0.90 },
      { offset: '100%', color: '#047857', opacity: 0.85 },
    ],
    meniscusStops: [
      { offset: '0%', color: '#ffffff', opacity: 0.95 },
      { offset: '50%', color: '#D1FAE5', opacity: 0.65 },
      { offset: '100%', color: '#ffffff', opacity: 0.95 },
    ]
  },
  option4: {
    id: 'option4',
    name: 'Option 4: Royal Azure (Deep Medical Blue)',
    badgeColor: '#2563EB',
    tubeStroke: 'rgba(37, 99, 235, 0.88)',
    syringeStops: [
      { offset: '0%', color: '#3B82F6', opacity: 0.88 },
      { offset: '20%', color: '#93C5FD', opacity: 0.95 },
      { offset: '50%', color: '#1D4ED8', opacity: 0.82 },
      { offset: '80%', color: '#2563EB', opacity: 0.90 },
      { offset: '100%', color: '#1E40AF', opacity: 0.88 },
    ],
    meniscusStops: [
      { offset: '0%', color: '#ffffff', opacity: 0.95 },
      { offset: '50%', color: '#DBEAFE', opacity: 0.65 },
      { offset: '100%', color: '#ffffff', opacity: 0.95 },
    ]
  }
};

let currentColorKey = (typeof window !== 'undefined' && localStorage.getItem('qumed_liquid_color')) || 'option1';
const listeners = new Set();

export function setLiquidColor(key) {
  if (LIQUID_OPTIONS[key]) {
    currentColorKey = key;
    if (typeof window !== 'undefined') {
      localStorage.setItem('qumed_liquid_color', key);
    }
    listeners.forEach((listener) => listener(LIQUID_OPTIONS[key]));
  }
}

export function getCurrentColorKey() {
  return currentColorKey;
}

export function useLiquidColor() {
  const [color, setColor] = useState(LIQUID_OPTIONS[currentColorKey] || LIQUID_OPTIONS.option1);

  useEffect(() => {
    const handler = (newColor) => setColor(newColor);
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);

  return color;
}
