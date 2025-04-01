"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PreferenceOption {
  id: string
  label: string
  description: string
  icon?: React.ReactNode
}

interface RoomPreferencesProps {
  options: PreferenceOption[]
  onSelect: (value: string[]) => void
}

export function RoomPreferences({ options, onSelect }: RoomPreferencesProps) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleOption = (id: string) => {
    const newSelected = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]

    setSelected(newSelected)
  }

  const handleSubmit = () => {
    const selectedLabels = options.filter((option) => selected.includes(option.id)).map((option) => option.label)

    onSelect(selectedLabels)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <p className="text-sm font-medium mb-3">¿Qué características buscas?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "border rounded-lg p-3 cursor-pointer transition-all",
                selected.includes(option.id) ? "border-primary bg-primary/5" : "hover:border-primary/50",
              )}
              onClick={() => toggleOption(option.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{option.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                </div>
                <div
                  className={cn(
                    "h-5 w-5 rounded-full flex items-center justify-center",
                    selected.includes(option.id) ? "bg-primary" : "border border-muted-foreground",
                  )}
                >
                  {selected.includes(option.id) && <Check className="h-3 w-3 text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full" onClick={handleSubmit} disabled={selected.length === 0}>
          Confirmar selección
        </Button>
      </CardContent>
    </Card>
  )
}

