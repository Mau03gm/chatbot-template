'use client';

import { useChat } from 'ai/react';
import { BudgetSelector, LocationSelector, PropertyCard, RoomPreferences, StayDuration } from './components/ui/selectors';
import { useState, useEffect } from 'react';

// Extendemos el tipo de mensaje para incluir la opción de ocultar en UI
interface ExtendedMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolInvocations?: any[];
  hideInUI?: boolean;
}

export default function Home() {
  const [chatStarted, setChatStarted] = useState(false);
  
  // Usamos useChat con la configuración adecuada
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, append } = useChat({
    api: '/api/chat',
    initialMessages: []
  });
  
  // Manejar la selección de presupuesto
  const handleBudgetSelection = (value: string) => {
    // Usando append en lugar de setMessages para mantener la conversación
    append({
      role: 'user',
      content: `He seleccionado el presupuesto: ${value}`
    });
  };
  
  // Manejar la selección de ubicación
  const handleLocationSelection = (value: string) => {
    append({
      role: 'user',
      content: `Me interesa la zona: ${value}`
    });
  };
  
  // Manejar la selección de preferencias
  const handlePreferencesSelection = (values: string[]) => {
    append({
      role: 'user',
      content: `Mis preferencias son: ${values.join(', ')}`
    });
  };
  
  // Manejar la selección de duración
  const handleDurationSelection = (value: string) => {
    append({
      role: 'user',
      content: `Planeo quedarme: ${value}`
    });
  };
  
  // Iniciar chat con un mensaje del usuario normal
  const startChat = () => {
    setChatStarted(true);
    
    // Iniciamos directamente con un mensaje clásico pero no lo mostramos en la UI
    append({
      role: 'user',
      content: 'Hola, estoy buscando coliving'
    });
    
    // Marcamos manualmente el primer mensaje como oculto
    setTimeout(() => {
      const updatedMessages = [...messages];
      if (updatedMessages.length > 0) {
        // Añadimos una propiedad personalizada al mensaje
        (updatedMessages[0] as ExtendedMessage).hideInUI = true;
        setMessages(updatedMessages);
      }
    }, 100);
  };
  
  // Filtrar mensajes para no mostrar aquellos marcados como ocultos
  const visibleMessages = messages.filter(msg => {
    // Si es un mensaje marcado como oculto, no lo mostramos
    return !(msg as ExtendedMessage).hideInUI;
  });
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">ColivingMX - Asistente Virtual</h1>
        </div>
        
        <div className="h-[500px] overflow-y-auto p-4 space-y-4" id="chat-container">
          {!chatStarted ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-semibold mb-4">Bienvenido a ColivingMX</h2>
              <p className="text-center mb-6">Tu asistente para encontrar el mejor coliving en CDMX</p>
              <button 
                onClick={startChat}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Iniciar Asistente
              </button>
            </div>
          ) : (
            <>
              {visibleMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.role === 'user' 
                      ? 'bg-blue-100 ml-auto' 
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="text-sm font-semibold mb-1">
                    {message.role === 'user' ? 'Tú' : 'Asistente'}
                  </div>
                  <div>{message.content}</div>
                  
                  {/* Herramientas UI */}
                  {message.role === 'assistant' && message.toolInvocations?.map((tool) => {
                    if (tool.state === 'result') {
                      if (tool.toolName === 'budgetSelector') {
                        return (
                          <BudgetSelector 
                            key={tool.toolCallId}
                            options={tool.result.options} 
                            onSelect={handleBudgetSelection}
                          />
                        );
                      } else if (tool.toolName === 'locationSelector') {
                        return (
                          <LocationSelector 
                            key={tool.toolCallId}
                            options={tool.result.options} 
                            onSelect={handleLocationSelection}
                          />
                        );
                      } else if (tool.toolName === 'roomPreferences') {
                        return (
                          <RoomPreferences 
                            key={tool.toolCallId}
                            options={tool.result.options} 
                            onSelect={handlePreferencesSelection}
                          />
                        );
                      } else if (tool.toolName === 'stayDuration') {
                        return (
                          <StayDuration 
                            key={tool.toolCallId}
                            options={tool.result.options} 
                            onSelect={handleDurationSelection}
                          />
                        );
                      } else if (tool.toolName === 'propertyCard') {
                        return (
                          <PropertyCard 
                            key={tool.toolCallId}
                            properties={tool.result.properties} 
                          />
                        );
                      }
                    }
                    
                    // Estado cargando
                    return (
                      <div key={tool.toolCallId} className="mt-2 text-sm text-gray-500">
                        {tool.toolName === 'budgetSelector' && "Cargando opciones de presupuesto..."}
                        {tool.toolName === 'locationSelector' && "Cargando zonas disponibles..."}
                        {tool.toolName === 'roomPreferences' && "Cargando opciones de habitación..."}
                        {tool.toolName === 'stayDuration' && "Cargando opciones de duración..."}
                        {tool.toolName === 'propertyCard' && "Buscando propiedades que se ajusten a tus necesidades..."}
                      </div>
                    );
                  })}
                </div>
              ))}
              
              {/* Indicador de carga */}
              {isLoading && (
                <div className="flex justify-center my-4">
                  <div className="loader"></div>
                </div>
              )}
            </>
          )}
        </div>
        
        {chatStarted && (
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              >
                Enviar
              </button>
            </div>
          </form>
        )}
      </div>
      
      {/* Estilos para el indicador de carga */}
      <style jsx>{`
        .loader {
          border: 3px solid #f3f3f3;
          border-radius: 50%;
          border-top: 3px solid #3498db;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}

