import React from 'react';
import { LIQUID_OPTIONS, useLiquidColor, setLiquidColor } from '../../config/liquidColors';
import styles from './LiquidColorSwitcher.module.css';

export default function LiquidColorSwitcher() {
  const current = useLiquidColor();

  const handleChange = (e) => {
    setLiquidColor(e.target.value);
  };

  return (
    <div className={styles.switcherWrap} title="Testing Mode: Change Syringe & IV Tube Liquid Color">
      <span 
        className={styles.colorPreviewDot} 
        style={{ 
          backgroundColor: current.badgeColor,
          boxShadow: `0 0 10px ${current.badgeColor}`
        }} 
      />
      <span className={styles.label}>Fluid:</span>
      <select 
        value={current.id} 
        onChange={handleChange} 
        className={styles.select}
        aria-label="Select Liquid Color"
      >
        {Object.values(LIQUID_OPTIONS).map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
