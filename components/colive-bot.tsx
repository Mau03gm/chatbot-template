"use client"

import { useChat } from 'ai/react';
import Loading from "./loading/loading"
import { useEffect } from 'react';
import { UIRender } from './UIGeneration/UIRender';


interface ExtendedMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolInvocations?: any[];
  hideInUI?: boolean;
}

export default function ChatBot() {
  useEffect(() => {
    append({
      role: "user",
      content: "Hola, estoy buscando coliving",
    });

    setTimeout(() => {
      const updatedMessages = [...messages];
      if (updatedMessages.length > 0) {
        (updatedMessages[0] as ExtendedMessage).hideInUI = true;
        setMessages(updatedMessages);
      }
    }, 100);
  }, []);

   const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, append } = useChat({
    api: '/api/chat',
    initialMessages: []
  });


  const visibleMessages = messages.filter(msg => {
    return !(msg as ExtendedMessage).hideInUI;
  });
  
  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-container">
        <>
          {visibleMessages.map((message:any) => (
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
              
              {message.role === 'assistant' && message.toolInvocations?.map((tool:Tool) => {
                console.log("tool", tool);
                if (tool.state === 'result') {
                  return(
                  <UIRender
                  key={tool.toolCallId}
                  tool={tool}
                  append={append}
                  /> 
                  )
                }
                
                return (
                  <div key={tool.toolCallId} className="mt-2 text-sm text-gray-500">
                    Lo sentimos, hubo un error al cargar los datos. Por favor, intenta nuevamente.
                  </div>
                );
              })}
            </div>
          ))}
          {isLoading && (
            <Loading />
          )}
        </>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white sticky bottom-0">
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
    </div>
  )
}

