'use client';

import React, { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type LocationSelectorProps = {
  options: Option[];
};

export const LocationSelector = ({ options }: LocationSelectorProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(item => item !== value));
    } else {
      setSelected([...selected, value]);
    }
    // Aquí se podría implementar envío de selección al chatbot
  };

  return (
    <div className="my-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-teal-100">
      <h3 className="text-lg font-medium text-teal-700 mb-3">¿En qué zonas de CDMX te gustaría vivir?</h3>
      <p className="text-sm text-gray-600 mb-3">Puedes seleccionar varias opciones</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleToggle(option.value)}
            className={`p-3 rounded-lg transition-all ${
              selected.includes(option.value)
                ? 'bg-teal-600 text-white'
                : 'bg-white hover:bg-teal-100 text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 