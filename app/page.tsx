import Link from 'next/link'
import { BookOpen, Brain, MessageCircle, Trophy } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            🇯🇵 Aprenda Japonês
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Domine o idioma japonês do zero ao avançado
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signin"
              className="bg-white text-purple-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              Começar Agora
            </Link>
            <Link
              href="/lessons"
              className="bg-purple-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-400 transition transform hover:scale-105"
            >
              Ver Lições
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <FeatureCard
            icon={<BookOpen className="w-12 h-12" />}
            title="Alfabetos"
            description="Aprenda Hiragana, Katakana e Kanji com exercícios interativos"
          />
          <FeatureCard
            icon={<Brain className="w-12 h-12" />}
            title="Gramática"
            description="Entenda a estrutura da língua japonesa de forma clara"
          />
          <FeatureCard
            icon={<MessageCircle className="w-12 h-12" />}
            title="Vocabulário"
            description="Expanda seu vocabulário com palavras e frases do dia a dia"
          />
          <FeatureCard
            icon={<Trophy className="w-12 h-12" />}
            title="Quizzes"
            description="Teste seus conhecimentos e acompanhe seu progresso"
          />
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center text-white">
          <h2 className="text-3xl font-bold mb-12">Por que aprender japonês?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard number="130M+" label="Falantes nativos" />
            <StatCard number="3" label="Sistemas de escrita" />
            <StatCard number="Top 10" label="Línguas mais faladas" />
          </div>
        </div>

        {/* Learning Path Preview */}
        <div className="mt-20 bg-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Seu Caminho de Aprendizado
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <LevelCard
              level="Iniciante"
              color="bg-green-500"
              topics={['Hiragana', 'Katakana', 'Saudações', 'Números']}
            />
            <LevelCard
              level="Intermediário"
              color="bg-yellow-500"
              topics={['Kanji Básico', 'Partículas', 'Verbos', 'Adjetivos']}
            />
            <LevelCard
              level="Avançado"
              color="bg-red-500"
              topics={['Kanji Complexo', 'Keigo', 'Expressões', 'Leitura']}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="opacity-90">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-lg opacity-90">{label}</div>
    </div>
  )
}

function LevelCard({ level, color, topics }: { 
  level: string
  color: string
  topics: string[] 
}) {
  return (
    <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
      <div className={`${color} text-white px-4 py-2 rounded-lg inline-block mb-4 font-bold`}>
        {level}
      </div>
      <ul className="space-y-2">
        {topics.map((topic, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700">
            <span className="text-purple-600">✓</span>
            {topic}
          </li>
        ))}
      </ul>
    </div>
  )
}