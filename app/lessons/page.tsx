import Link from 'next/link'
import { BookOpen, CheckCircle, Lock } from 'lucide-react'

const lessons = [
  {
    id: 1,
    title: 'Hiragana',
    titlePt: 'Alfabeto Hiragana',
    description: 'Aprenda os 46 caracteres básicos do hiragana',
    difficulty: 'Iniciante',
    duration: '30 min',
    completed: false,
    locked: false,
  },
  {
    id: 2,
    title: 'Katakana',
    titlePt: 'Alfabeto Katakana',
    description: 'Domine o katakana para palavras estrangeiras',
    difficulty: 'Iniciante',
    duration: '30 min',
    completed: false,
    locked: false,
  },
  {
    id: 3,
    title: 'Vocabulário Básico',
    titlePt: 'Primeiras Palavras',
    description: 'Saudações e frases essenciais do dia a dia',
    difficulty: 'Iniciante',
    duration: '45 min',
    completed: false,
    locked: false,
  },
  {
    id: 4,
    title: 'Partículas は・を・が',
    titlePt: 'Partículas Básicas',
    description: 'Entenda as partículas fundamentais da gramática',
    difficulty: 'Iniciante',
    duration: '60 min',
    completed: false,
    locked: true,
  },
  {
    id: 5,
    title: 'Verbos no Presente',
    titlePt: 'Conjugação Verbal',
    description: 'Aprenda a conjugar verbos no tempo presente',
    difficulty: 'Intermediário',
    duration: '60 min',
    completed: false,
    locked: true,
  },
  {
    id: 6,
    title: 'Kanji Básico',
    titlePt: 'Primeiros Kanji',
    description: 'Comece com os 50 kanji mais comuns',
    difficulty: 'Intermediário',
    duration: '90 min',
    completed: false,
    locked: true,
  },
]

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📚 Suas Lições
          </h1>
          <p className="text-lg text-gray-600">
            Siga o caminho de aprendizado e desbloqueie novas lições
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Seu Progresso</span>
            <span className="text-sm font-semibold text-purple-600">0%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all"
              style={{ width: '0%' }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">0 de 6 lições completadas</p>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  )
}

function LessonCard({ lesson }: { lesson: typeof lessons[0] }) {
  const difficultyColors = {
    Iniciante: 'bg-green-100 text-green-700',
    Intermediário: 'bg-yellow-100 text-yellow-700',
    Avançado: 'bg-red-100 text-red-700',
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden ${
        lesson.locked ? 'opacity-60' : ''
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {lesson.title}
            </h3>
            <p className="text-sm text-gray-600">{lesson.titlePt}</p>
          </div>
          {lesson.completed && (
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
          )}
          {lesson.locked && (
            <Lock className="w-6 h-6 text-gray-400 flex-shrink-0" />
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>

        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              difficultyColors[lesson.difficulty as keyof typeof difficultyColors]
            }`}
          >
            {lesson.difficulty}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {lesson.duration}
          </span>
        </div>

        {/* Action Button */}
        {lesson.locked ? (
          <button
            disabled
            className="w-full bg-gray-200 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
          >
            Bloqueado
          </button>
        ) : (
          <Link
            href={`/lessons/${lesson.id}`}
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition"
          >
            {lesson.completed ? 'Revisar' : 'Começar'}
          </Link>
        )}
      </div>
    </div>
  )
}