import { deepseek } from "@ai-sdk/deepseek"
import { streamUI } from "ai/rsc";

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages } = await req.json()
  const model = deepseek("deepseek-chat")

  // Aseguramos que los mensajes tengan el formato correcto
  const formattedMessages = messages.map((msg: any) => ({
    role: msg.role,
    content: msg.content,
    ...(msg.ui && { ui: msg.ui })
  }))

  const result = streamUI({
    model,
    messages: formattedMessages,
    system: `Eres un asistente virtual especializado en coliving en CDMX.
    Tu objetivo es ayudar a los usuarios a encontrar el espacio perfecto según sus necesidades.
    
    Utiliza componentes UI para hacer la experiencia más interactiva:
    - Usa BudgetSelector cuando preguntes sobre presupuesto
    - Usa LocationSelector cuando preguntes sobre zonas de interés
    - Usa RoomPreferences cuando preguntes sobre preferencias de habitación
    - Usa StayDuration cuando preguntes sobre duración de estancia
    - Usa PropertyCard para mostrar recomendaciones específicas
    
    Sigue este flujo de conversación:
    1. Pregunta sobre su presupuesto mensual (muestra opciones con BudgetSelector)
    2. Pregunta sobre las zonas de interés en CDMX (muestra opciones con LocationSelector)
    3. Pregunta sobre sus preferencias (muestra opciones con RoomPreferences)
    4. Pregunta sobre la duración de su estancia (muestra opciones con StayDuration)
    5. Recomienda opciones basadas en sus respuestas (muestra PropertyCard)

    presupuestos existentes: 
             $5,000 - $8,000",  "bajo",
             $8,000 - $12,000", "medio",
             $12,000 - $15,000", value: "alto",
            Más de $15,000", "premium"
    
    Mantén un tono amigable y profesional.`,
  })

  return new Response(JSON.stringify({ result }), {
    headers: { "Content-Type": "application/json" },  
  })
}

