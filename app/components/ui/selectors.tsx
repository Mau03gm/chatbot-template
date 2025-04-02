import React from 'react';

type Option = {
  id: string;
  label: string;
  value: string;
};

type Property = {
  id: string;
  name: string;
  price: number;
  location: string;
  features: string[];
  imageUrl: string;
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

// Componente para selector de ubicación
export function LocationSelector({ options, onSelect }: { 
  options: Option[]; 
  onSelect: (value: string) => void 
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-2">
      <h3 className="text-lg font-semibold mb-3">¿En qué zona te gustaría vivir?</h3>
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

// Componente para selector de preferencias
export function RoomPreferences({ options, onSelect }: { 
  options: Option[]; 
  onSelect: (values: string[]) => void 
}) {
  const [selected, setSelected] = React.useState<string[]>([]);

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

// Componente para selector de duración
export function StayDuration({ options, onSelect }: { 
  options: Option[]; 
  onSelect: (value: string) => void 
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-2">
      <h3 className="text-lg font-semibold mb-3">¿Por cuánto tiempo planeas quedarte?</h3>
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

// Componente para mostrar propiedades
export function PropertyCard({ properties }: { properties: Property[] }) {
  return (
    <div className="space-y-4 my-2">
      <h3 className="text-lg font-semibold">Propiedades recomendadas para ti:</h3>
      {properties.map((property) => (
        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48">
            <img
              src={property.imageUrl}
              alt={property.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Coliving';
              }}
            />
          </div>
          <div className="p-4">
            <h4 className="text-xl font-semibold">{property.name}</h4>
            <p className="text-gray-500">{property.location}</p>
            <p className="text-lg font-bold mt-2">${property.price.toLocaleString()} MXN/mes</p>
            <div className="mt-2">
              <p className="font-medium">Características:</p>
              <ul className="list-disc list-inside">
                {property.features.map((feature, index) => (
                  <li key={index} className="text-sm">{feature}</li>
                ))}
              </ul>
            </div>
            <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Más información
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 