import { tool as createTool } from 'ai';
import { z } from 'zod';

// Esquema para selector de presupuesto
export const budgetSelectorTool = createTool({
  description: 'Muestra opciones de presupuesto para coliving',
  parameters: z.object({}),
  execute: async function () {
    // Esta función simula la UI generada - no realiza lógica real
    // En el frontend se renderizará el componente correspondiente
    return {
      options: [
        { id: 'bajo', label: 'Menos de $8,000', value: 'bajo' },
        { id: 'medio', label: '$8,000 - $12,000', value: 'medio' },
        { id: 'alto', label: 'Más de $12,000', value: 'alto' }
      ]
    };
  },
});

// Esquema para selector de ubicación
export const locationSelectorTool = createTool({
  description: 'Muestra opciones de ubicación en CDMX',
  parameters: z.object({}),
  execute: async function () {
    return {
      options: [
        { id: 'condesa', label: 'La Condesa', value: 'condesa' },
        { id: 'roma', label: 'Roma Norte/Sur', value: 'roma' },
        { id: 'polanco', label: 'Polanco', value: 'polanco' },
        { id: 'centro', label: 'Centro Histórico', value: 'centro' },
        { id: 'coyoacan', label: 'Coyoacán', value: 'coyoacan' }
      ]
    };
  },
});

// Esquema para preferencias de habitación
export const roomPreferencesTool = createTool({
  description: 'Muestra opciones de preferencias para el espacio',
  parameters: z.object({}),
  execute: async function () {
    return {
      options: [
        { id: 'privado', label: 'Habitación privada', value: 'privado' },
        { id: 'compartido', label: 'Habitación compartida', value: 'compartido' },
        { id: 'baño_privado', label: 'Baño privado', value: 'baño_privado' },
        { id: 'wifi', label: 'WiFi de alta velocidad', value: 'wifi' },
        { id: 'cocina', label: 'Cocina equipada', value: 'cocina' },
        { id: 'terraza', label: 'Terraza/Áreas comunes', value: 'terraza' }
      ]
    };
  },
});

// Esquema para duración de estancia
export const stayDurationTool = createTool({
  description: 'Muestra opciones de duración de estancia',
  parameters: z.object({}),
  execute: async function () {
    return {
      options: [
        { id: 'corto', label: '1-3 meses', value: 'corto' },
        { id: 'medio', label: '4-6 meses', value: 'medio' },
        { id: 'largo', label: '6+ meses', value: 'largo' }
      ]
    };
  },
});

// Esquema para mostrar propiedades
export const propertyCardTool = createTool({
  description: 'Muestra propiedades recomendadas basadas en las preferencias',
  parameters: z.object({}),
  execute: async function () {
    // Aquí normalmente consultarías una base de datos basado en las selecciones anteriores
    return {
      properties: [
        {
          id: 'prop1',
          name: 'Coliving Roma Norte',
          price: 10000,
          location: 'Roma Norte',
          features: ['Habitación privada', 'Baño compartido', 'WiFi', 'Cocina equipada'],
          imageUrl: 'https://ejemplo.com/imagen1.jpg'
        },
        {
          id: 'prop2',
          name: 'Condesa Coliving',
          price: 9500,
          location: 'La Condesa',
          features: ['Habitación privada', 'Baño privado', 'WiFi', 'Terraza'],
          imageUrl: 'https://ejemplo.com/imagen2.jpg'
        }
      ]
    };
  },
});

// Exportamos todas las herramientas
export const tools = {
  budgetSelector: budgetSelectorTool,
  locationSelector: locationSelectorTool,
  roomPreferences: roomPreferencesTool,
  stayDuration: stayDurationTool,
  propertyCard: propertyCardTool
}; 