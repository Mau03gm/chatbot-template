'use client';

import React from 'react';

type Property = {
  name: string;
  location: string;
  price: string;
  amenities: string[];
  imageUrl?: string;
};

type PropertyCardProps = {
  properties: Property[];
};

export const PropertyCard = ({ properties }: PropertyCardProps) => {
  return (
    <div className="my-4">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Propiedades recomendadas para ti:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map((property, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
            {property.imageUrl ? (
              <div className="h-48 overflow-hidden">
                <img 
                  src={property.imageUrl} 
                  alt={property.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-r from-blue-200 to-indigo-200 flex items-center justify-center">
                <span className="text-lg font-medium text-indigo-700">{property.name}</span>
              </div>
            )}
            <div className="p-4">
              <h4 className="font-bold text-lg mb-1">{property.name}</h4>
              <p className="text-gray-600 mb-2">{property.location}</p>
              <p className="text-indigo-600 font-medium mb-3">{property.price} MXN / mes</p>
              
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700 mb-1">Amenidades:</p>
                <div className="flex flex-wrap gap-1">
                  {property.amenities.map((amenity, i) => (
                    <span 
                      key={i} 
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Más información
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 