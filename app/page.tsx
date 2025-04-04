"use client";

import { useChat } from "ai/react";
import {
  BudgetSelector,
  LocationSelector,
  PropertyCard,
  RoomPreferences,
  StayDuration,
} from "./components/ui/selectors";
import { useState, useEffect } from "react";
import Loading from "@/components/loading/loading";
import ChatBot from "@/components/colive-bot";

// Extendemos el tipo de mensaje para incluir la opción de ocultar en UI
interface ExtendedMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  toolInvocations?: any[];
  hideInUI?: boolean;
}

export default function Home() {
  const [chatStarted, setChatStarted] = useState(false);

  // Usamos useChat con la configuración adecuada
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    append,
  } = useChat({
    api: "/api/chat",
    initialMessages: [],
  });


  // Iniciar chat con un mensaje del usuario normal
  const startChat = () => {
    setChatStarted(true);
  };

  return (
    <>
      {!chatStarted ? (
        <button
          onClick={startChat}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Iniciar Asistente
        </button>
      ) : (
        <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h1 className="text-xl font-bold">
                ColivingMX - Asistente Virtual
              </h1>
            </div>
            <ChatBot />
          </div>
        </main>
      )}
    </>
  );
}
