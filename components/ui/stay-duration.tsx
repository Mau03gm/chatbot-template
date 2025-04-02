"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface StayDurationProps {
  durationText: DurationOption[]
  onSelect: (value: string) => void
}

interface DurationOption {
  label: string
  value: string
}


export function StayDuration({durationText,  onSelect }: StayDurationProps) {
  const [duration, setDuration] = useState<string>("3-6")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)

  const handleSubmit = () => {
    const formattedDate = startDate
      ? `a partir del ${format(startDate, "d 'de' MMMM", { locale: es })}`
      : "próximamente"

    onSelect(`${durationText} ${formattedDate}`)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <p className="text-sm font-medium mb-3">¿Cuánto tiempo planeas quedarte?</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Duración de estancia</label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona duración" />
              </SelectTrigger>
              <SelectContent>
                {durationText.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Fecha aproximada de inicio</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: es }) : "Selecciona una fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  locale={es}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Confirmar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

