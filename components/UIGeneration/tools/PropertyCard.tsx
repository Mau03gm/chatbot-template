'use client';

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