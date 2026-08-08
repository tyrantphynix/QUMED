import { useState, useMemo } from 'react';
import products from '../data/products.json';

export const CATEGORIES = [
  { id: 'all',            label: 'All Products' },
  { id: 'infusion',       label: 'Infusion' },
  { id: 'anesthesia',     label: 'Anesthesia' },
  { id: 'urology',        label: 'Urology' },
  { id: 'surgery-suction',label: 'Surgery Suction' },
  { id: 'critical-care',  label: 'Critical Care' },
];

export function useProductFilter() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(() =>
    active === 'all' ? products : products.filter(p => p.category === active),
    [active]
  );

  return { active, setActive, filtered, categories: CATEGORIES };
}
