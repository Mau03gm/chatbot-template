"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface PropertyCardProps {
  properties: Property[]
  onSelect: (id: string) => void
}

interface Property {
  id: string
  name: string
  location: string
  price: string
  image?: string
  features: string[]
  availability: string
}

export function PropertyCard({ properties, onSelect }: PropertyCardProps) {
  return (
    <div className="space-y-4 w-full">
      <p className="text-sm font-medium">Propiedades recomendadas:</p>
      <div className="grid grid-cols-1 gap-4">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${property.image || "/placeholder.svg?height=300&width=600"})`,
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/70">
                  {property.price}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.location}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {property.features.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="bg-primary/5">
                    {feature}
                  </Badge>
                ))}
              </div>

              <p className="text-sm mt-4">
                <span className="font-medium">Disponibilidad:</span> {property.availability}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => onSelect(property.name)}>
                Solicitar visita
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

