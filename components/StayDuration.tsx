'use client';

import React, { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type StayDurationProps = {
  options: Option[];
};

export const StayDuration = ({ options }: StayDurationProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    // Aquí se podría implementar envío de selección al chatbot
  };

  return (
    <div className="my-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
      <h3 className="text-lg font-medium text-amber-700 mb-3">¿Por cuánto tiempo planeas quedarte?</h3>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`p-3 rounded-lg transition-all ${
              selected === option.value
                ? 'bg-amber-600 text-white'
                : 'bg-white hover:bg-amber-100 text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 