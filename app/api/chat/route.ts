import { deepseek } from "@ai-sdk/deepseek"
import { streamText } from "ai"
import { tools } from "@/ai/tools";
import { z } from "zod";

// Definimos tipos para mensajes y tool invocations
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  toolInvocations?: ToolInvocation[];
};

type ToolInvocation = {
  toolName: string;
  toolCallId: string;
  state: string;
  result?: any;
};

// Definimos esquemas Zod para la validación
const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  toolInvocations: z.array(z.object({
    toolName: z.string(),
    toolCallId: z.string(),
    state: z.string(),
    result: z.any().optional()
  })).optional()
});

// Permitir respuestas streaming hasta 60 segundos
export const maxDuration = 60;

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;
  
  // Validamos los mensajes con Zod
  const validMessages = z.array(MessageSchema).safeParse(messages);
  
  if (!validMessages.success) {
    return new Response(JSON.stringify({ error: "Formato de mensajes inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  
  const model = deepseek("deepseek-chat");



  // Elegimos el mensaje de sistema según el paso
  let systemPrompt =`Eres un asistente virtual especializado en coliving en CDMX.
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
    
    Mantén un tono amigable y profesional.

    Logica de negocio:
    - Entre menos presupuesto, menos opciones de calidad.
    - Entre mas presupuesto, más opciones de calidad.
    - si el presupuesto es bajo, recomienda zonas más alejadas.
    - si el presupuesto es alto, recomienda zonas más céntricas.
    - Si el presupuesto es premium, recomienda zonas exclusivas.
    - si el presupuesto es bajo, sugiere habitaciones compartidas o estancias mas baratas.
    - el cliente puede hacer mas de un cambio en sus preferencias.
    `;


  // Usamos streamText con maxSteps=1 para prevenir el bucle
  const result = streamText({
    model,
    messages,
    tools,
    temperature: 0.2,
    maxSteps: 1,
    system: systemPrompt,
    maxTokens: 800 // Limitamos tokens para evitar respuestas largas
  });

  return result.toDataStreamResponse();
}

