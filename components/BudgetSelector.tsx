'use client';

import React, { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type BudgetSelectorProps = {
  options: Option[];
};

export const BudgetSelector = ({ options }: BudgetSelectorProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    // Aquí se podría implementar envío de selección al chatbot
  };

  return (
    <div className="my-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-indigo-100">
      <h3 className="text-lg font-medium text-indigo-700 mb-3">¿Cuál es tu presupuesto mensual?</h3>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`p-3 rounded-lg transition-all ${
              selected === option.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white hover:bg-indigo-100 text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 