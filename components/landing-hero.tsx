import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingHero() {
  return (
    <div className="relative bg-primary/10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Vive la experiencia de coliving en CDMX</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            Espacios diseñados para profesionales y nómadas digitales que buscan comunidad, comodidad y ubicaciones
            privilegiadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="#contact">Reserva una visita</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#locations">Explorar ubicaciones</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

