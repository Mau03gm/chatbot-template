'use client';

import { useState } from 'react';

export function RoomPreferences({ options, onSelect }: { 
  options: Option[]; 
  onSelect: (values: string[]) => void 
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-2">
      <h3 className="text-lg font-semibold mb-3">¿Qué características buscas?</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="checkbox"
              id={option.id}
              className="mr-2"
              checked={selected.includes(option.value)}
              onChange={() => toggleOption(option.value)}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => onSelect(selected)}
      >
        Confirmar selección
      </button>
    </div>
  );
}