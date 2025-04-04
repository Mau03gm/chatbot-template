"use client";
import { useState } from "react";
import ChatBot from "@/components/colive-bot";


export default function Home() {
  const [chatStarted, setChatStarted] = useState(false);


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
