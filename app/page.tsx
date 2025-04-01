import ColiveBot from "@/components/colive-bot"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col space-y-8">
          <div className="rounded-lg border bg-card shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">Encuentra tu espacio ideal</h2>
            <ColiveBot />
          </div>
        </div>
      </div>
    </main>
  )
}

