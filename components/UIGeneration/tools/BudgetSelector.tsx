import React from 'react';

type Option = {
  id: string;
  label: string;
  value: string;
};

// Componente para selector de presupuesto
export function BudgetSelector({ options, onSelect }: { 
  options: Option[]; 
  onSelect: (value: string) => void 
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-2">
      <h3 className="text-lg font-semibold mb-3">Selecciona tu presupuesto:</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            className="block w-full text-left px-4 py-2 border rounded-md hover:bg-blue-50 transition-colors"
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}