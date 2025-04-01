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
  onSelect: (value: string) => void
}

export function StayDuration({ onSelect }: StayDurationProps) {
  const [duration, setDuration] = useState<string>("3-6")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)

  const handleSubmit = () => {
    const formattedDate = startDate
      ? `a partir del ${format(startDate, "d 'de' MMMM", { locale: es })}`
      : "próximamente"

    const durationText = {
      "1-3": "1-3 meses",
      "3-6": "3-6 meses",
      "6-12": "6-12 meses",
      "12+": "más de 12 meses",
    }[duration]

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
                <SelectItem value="1-3">1-3 meses</SelectItem>
                <SelectItem value="3-6">3-6 meses</SelectItem>
                <SelectItem value="6-12">6-12 meses</SelectItem>
                <SelectItem value="12+">Más de 12 meses</SelectItem>
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

