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

  // Procesamos los mensajes para detectar en qué etapa estamos
  const userMessages = messages.filter((m: Message) => m.role === 'user');
  const lastUserMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;
  
  // Detectamos las selecciones del usuario para saber en qué paso vamos
  const hasBudgetSelection = lastUserMessage?.content.includes('He seleccionado el presupuesto:');
  const hasLocationSelection = lastUserMessage?.content.includes('Me interesa la zona:');
  const hasPreferenceSelection = lastUserMessage?.content.includes('Mis preferencias son:');
  const hasDurationSelection = lastUserMessage?.content.includes('Planeo quedarme:');
  
  // También verificamos si ya se han usado herramientas
  const hasUsedBudgetTool = messages.some((m: Message) => 
    m.role === 'assistant' && m.toolInvocations?.some((t: ToolInvocation) => t.toolName === 'budgetSelector')
  );
  
  const hasUsedLocationTool = messages.some((m: Message) => 
    m.role === 'assistant' && m.toolInvocations?.some((t: ToolInvocation) => t.toolName === 'locationSelector')
  );
  
  const hasUsedPreferencesTool = messages.some((m: Message) => 
    m.role === 'assistant' && m.toolInvocations?.some((t: ToolInvocation) => t.toolName === 'roomPreferences')
  );
  
  const hasUsedDurationTool = messages.some((m: Message) => 
    m.role === 'assistant' && m.toolInvocations?.some((t: ToolInvocation) => t.toolName === 'stayDuration')
  );

  // Determinamos en qué paso estamos del flujo
  let currentStep = 0;
  
  // Si hay un mensaje del usuario con selección, va a influir en el paso actual
  if (hasDurationSelection) {
    currentStep = 5; // Mostrar propiedades
  } else if (hasPreferenceSelection) {
    currentStep = 4; // Preguntar duración
  } else if (hasLocationSelection) {
    currentStep = 3; // Preguntar preferencias
  } else if (hasBudgetSelection) {
    currentStep = 2; // Preguntar ubicación
  } else if (hasUsedDurationTool) {
    currentStep = 5; // Mostrar propiedades
  } else if (hasUsedPreferencesTool) {
    currentStep = 4; // Preguntar duración
  } else if (hasUsedLocationTool) {
    currentStep = 3; // Preguntar preferencias
  } else if (hasUsedBudgetTool) {
    currentStep = 2; // Preguntar ubicación
  } else {
    currentStep = 1; // Preguntar presupuesto (primer paso)
  }

  // Elegimos el mensaje de sistema según el paso
  let systemPrompt = "";
  
  switch (currentStep) {
    case 1:
      systemPrompt = `Eres un asistente amigable de coliving en CDMX. El usuario está buscando opciones de vivienda.
      IMPORTANTE: Usa la herramienta budgetSelector sin argumentos para mostrar opciones de presupuesto.
      Di una frase breve dando la bienvenida y pregunta por el presupuesto, luego usa la herramienta.`;
      break;
    
    case 2:
      systemPrompt = `Ahora que conoces el presupuesto del usuario, pregunta por las zonas de interés.
      IMPORTANTE: Usa la herramienta locationSelector sin argumentos para mostrar las opciones de ubicación.
      Agradece la selección del presupuesto y pregunta por la zona preferida.`;
      break;
    
    case 3:
      systemPrompt = `Ahora pregunta por sus preferencias de habitación y servicios.
      IMPORTANTE: Usa la herramienta roomPreferences sin argumentos para mostrar las opciones.
      Menciona que ahora necesitas saber qué características buscan en su espacio.`;
      break;
    
    case 4:
      systemPrompt = `Pregunta por cuánto tiempo planean quedarse en el coliving.
      IMPORTANTE: Usa la herramienta stayDuration sin argumentos para mostrar las opciones.
      Menciona que ya casi tienen toda la información necesaria.`;
      break;
    
    case 5:
      systemPrompt = `Es momento de mostrar las propiedades recomendadas basadas en toda la información recopilada.
      IMPORTANTE: Usa la herramienta propertyCard sin argumentos para mostrar las opciones.
      Menciona que estas son las opciones que mejor se adaptan a sus necesidades.`;
      break;
    
    default:
      systemPrompt = `Eres un asistente virtual especializado en coliving en CDMX.
      Sigue el flujo: presupuesto → ubicación → preferencias → duración → recomendaciones.
      Si el usuario pregunta por información general, responde brevemente y vuelve al paso actual del flujo.`;
  }

  console.log("Paso actual:", currentStep);

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

