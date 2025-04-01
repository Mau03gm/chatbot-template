"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocationOption {
  name: string
  description: string
  image?: string
}

interface LocationSelectorProps {
  locations: LocationOption[]
  onSelect: (value: string) => void
}

export function LocationSelector({ locations, onSelect }: LocationSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (name: string) => {
    setSelected(name)
    onSelect(name)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <p className="text-sm font-medium mb-3">Selecciona tu zona preferida:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {locations.map((location) => (
            <div
              key={location.name}
              className={cn(
                "border rounded-lg p-3 cursor-pointer transition-all",
                selected === location.name ? "border-primary bg-primary/5" : "hover:border-primary/50",
              )}
              onClick={() => handleSelect(location.name)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{location.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{location.description}</p>
                </div>
                {selected === location.name && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

