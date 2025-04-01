import { Message } from "@/types/chat"

export const sendChatMessage = async (messages: Message[]) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages })
    })
    
    if (!response.ok) {
      throw new Error('Error al enviar el mensaje')
    }

    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
} 