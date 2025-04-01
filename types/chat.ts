export interface UIComponent {
  type: string
  props: any
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  ui?: UIComponent[]
} 