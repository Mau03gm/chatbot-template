"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface BudgetOption {
  label: string
  value: string
}

interface BudgetSelectorProps {
  options: BudgetOption[]
  onSelect: (value: string) => void
}

export function BudgetSelector({ options, onSelect }: BudgetSelectorProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-medium mb-2">Selecciona tu presupuesto:</p>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="justify-start h-auto py-3 px-4"
                onClick={() => onSelect(option.label)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

