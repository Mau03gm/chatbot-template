import { anthropic } from "@ai-sdk/anthropic"
import { streamUI } from "ai/rsc";

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages } = await req.json()
  const model= anthropic("claude-3-5-haiku-lastest");

  const result = streamUI({
    model:model,
    messages,
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
              {label: "$5,000 - $8,000", value: "bajo" },
              { label: "$8,000 - $12,000", value: "medio" },
              { label: "$12,000 - $15,000", value: "alto" },
              { label: "Más de $15,000", value: "premium"
    
    Mantén un tono amigable y profesional.`,
  })

  return new Response(JSON.stringify({ result }), {
    headers: { "Content-Type": "application/json" },  
});
}

