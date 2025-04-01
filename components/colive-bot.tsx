"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { BudgetSelector } from "@/components/ui/budget-selector"
import { LocationSelector } from "@/components/ui/location-selector"
import { RoomPreferences } from "@/components/ui/room-preferences"
import { StayDuration } from "@/components/ui/stay-duration"
import { PropertyCard } from "@/components/ui/property-card"
import { v4 as uuidv4 } from "uuid"
import { Message, UIComponent } from "@/types/chat"
import { sendChatMessage } from "@/services/chat"

// Componente para renderizar UI generativa
function UIRenderer({ type, props, onSelect }: { type: string; props: any; onSelect: (value: any) => void }) {
  switch (type) {
    case "BudgetSelector":
      return <BudgetSelector {...props} onSelect={onSelect} />
    case "LocationSelector":
      return <LocationSelector {...props} onSelect={onSelect} />
    case "RoomPreferences":
      return <RoomPreferences {...props} onSelect={onSelect} />
    case "StayDuration":
      return <StayDuration onSelect={onSelect} />
    case "PropertyCard":
      return <PropertyCard {...props} onSelect={onSelect} />
    default:
      return null
  }
}

export default function ColiveBot() {
  // Estado para los mensajes
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente virtual para encontrar el espacio de coliving perfecto en CDMX. ¿Cuál es tu presupuesto mensual aproximado?",
      ui: [
        {
          type: "BudgetSelector",
          props: {
            options: [
              { label: "$5,000 - $8,000", value: "bajo" },
              { label: "$8,000 - $12,000", value: "medio" },
              { label: "$12,000 - $15,000", value: "alto" },
              { label: "Más de $15,000", value: "premium" },
            ],
          },
        },
      ],
    },
  ])

  // Estado para el input del usuario
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Referencia para el scroll
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Efecto para el scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Función para agregar un mensaje del usuario
  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
    }
    setMessages((prev) => [...prev, newMessage])
    return newMessage.id
  }

  // Función para obtener la respuesta del asistente
  const getAssistantResponse = async (userMessageId: string, userInput: string) => {
    setIsLoading(true)

    try {
      const response = await sendChatMessage([...messages, { id: userMessageId, role: "user", content: userInput }])
      console.log("Respuesta del asistente:", response)
      console.log("Mensajes actuales:", response.id, response.content)
      setMessages((prev) => [...prev, response])
    } catch (error) {
      console.error('Error al obtener respuesta:', error)
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsLoading(false)
    }
  }

  // Manejador para el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !isLoading) return

    const userMessageId = addUserMessage(input)
    getAssistantResponse(userMessageId, input)
    setInput("")
  }

  // Manejador para la interacción con componentes UI
  const handleUIInteraction = (value: any, componentType: string) => {
    const userMessageId = addUserMessage(typeof value === "string" ? value : JSON.stringify(value))
    getAssistantResponse(userMessageId, typeof value === "string" ? value : JSON.stringify(value))
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto">
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex flex-col gap-3 max-w-[90%]",
              message.role === "user" ? "ml-auto items-end" : "items-start",
            )}
          >
            <div className="flex items-start gap-3">
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20">
                    <Bot size={16} className="text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-lg px-4 py-2 text-sm",
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20">
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>

            {/* Renderizar componentes UI generativos */}
            {message.role === "assistant" && message.ui && message.ui.length > 0 && (
              <div className="pl-11 w-full space-y-3">
                {message.ui.map((component, idx) => (
                  <UIRenderer
                    key={`${message.id}-${component.type}-${idx}`}
                    type={component.type}
                    props={component.props}
                    onSelect={(value: any) => handleUIInteraction(value, component.type)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/20">
                <Bot size={16} className="text-primary" />
              </AvatarFallback>
            </Avatar>
            <div className="rounded-lg px-4 py-2 text-sm bg-muted">
              <span className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2 items-center">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send size={18} />
        </Button>
      </form>
    </div>
  )
}

