'use client';

import React, { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type RoomPreferencesProps = {
  options: Option[];
};

export const RoomPreferences = ({ options }: RoomPreferencesProps) => {
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
    <div className="my-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
      <h3 className="text-lg font-medium text-purple-700 mb-3">¿Qué características son importantes para ti?</h3>
      <p className="text-sm text-gray-600 mb-3">Selecciona todas las que apliquen</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleToggle(option.value)}
            className={`p-3 rounded-lg transition-all ${
              selected.includes(option.value)
                ? 'bg-purple-600 text-white'
                : 'bg-white hover:bg-purple-100 text-gray-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 