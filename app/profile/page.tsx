'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { BookOpen, Trophy, Flame, Target, TrendingUp, Calendar } from 'lucide-react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Mock data - 後でデータベースから取得
  const userData = {
    lessonsCompleted: 2,
    totalLessons: 6,
    quizzesTaken: 5,
    averageScore: 78,
    currentStreak: 3,
    totalStudyTime: 180, // minutos
    level: 'Iniciante',
    nextLevel: 'Intermediário',
    pointsToNextLevel: 250,
    currentPoints: 450,
  }

  const recentActivity = [
    { date: '2025-10-05', activity: 'Completou a lição de Hiragana', points: 100 },
    { date: '2025-10-04', activity: 'Quiz de Prática - 80% de acerto', points: 80 },
    { date: '2025-10-03', activity: 'Completou a lição de Katakana', points: 100 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Olá, {session.user?.name || 'Estudante'}! 👋
              </h1>
              <p className="text-purple-100 text-lg">
                Continue sua jornada de aprendizado
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg px-6 py-3 rounded-xl">
              <div className="text-sm opacity-90 mb-1">Nível Atual</div>
              <div className="text-2xl font-bold">{userData.level}</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<BookOpen className="w-8 h-8" />}
            value={`${userData.lessonsCompleted}/${userData.totalLessons}`}
            label="Lições Completas"
            color="bg-blue-500"
          />
          <StatCard
            icon={<Trophy className="w-8 h-8" />}
            value={userData.quizzesTaken.toString()}
            label="Quizzes Realizados"
            color="bg-yellow-500"
          />
          <StatCard
            icon={<Flame className="w-8 h-8" />}
            value={`${userData.currentStreak} dias`}
            label="Sequência Atual"
            color="bg-orange-500"
          />
          <StatCard
            icon={<Target className="w-8 h-8" />}
            value={`${userData.averageScore}%`}
            label="Média de Acertos"
            color="bg-green-500"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level Progress */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Progresso de Nível</h2>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {userData.level} → {userData.nextLevel}
                  </span>
                  <span className="text-sm font-semibold text-purple-600">
                    {userData.currentPoints} / {userData.currentPoints + userData.pointsToNextLevel} pts
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-4 rounded-full transition-all"
                    style={{
                      width: `${(userData.currentPoints / (userData.currentPoints + userData.pointsToNextLevel)) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Faltam {userData.pointsToNextLevel} pontos para o próximo nível
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Atividade Recente</h2>
              </div>
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.activity}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-green-600">
                        +{item.points} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Streak */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-800">Sequência</h3>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-500 mb-2">
                  {userData.currentStreak}
                </div>
                <p className="text-gray-600">dias consecutivos</p>
                <p className="text-sm text-gray-500 mt-4">
                  Continue estudando para manter sua sequência! 🔥
                </p>
              </div>
            </div>

            {/* Study Time */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tempo de Estudo</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {Math.floor(userData.totalStudyTime / 60)}h {userData.totalStudyTime % 60}m
                </div>
                <p className="text-gray-600">tempo total</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Continue Aprendendo</h3>
              <button
                onClick={() => router.push('/lessons')}
                className="w-full bg-white text-purple-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition mb-3"
              >
                Ver Lições
              </button>
              <button
                onClick={() => router.push('/practice')}
                className="w-full bg-white/20 backdrop-blur text-white font-bold py-3 rounded-lg hover:bg-white/30 transition"
              >
                Praticar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode
  value: string
  label: string
  color: string
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}