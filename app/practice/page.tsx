'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react'

const quizQuestions = [
  {
    id: 1,
    question: 'Como se diz "Obrigado" em japonês?',
    options: ['こんにちは', 'ありがとう', 'さようなら', 'すみません'],
    correct: 1,
    explanation: 'ありがとう (arigatou) significa "obrigado"',
  },
  {
    id: 2,
    question: 'Qual é a romanização de あ?',
    options: ['i', 'u', 'a', 'e'],
    correct: 2,
    explanation: 'あ é pronunciado como "a"',
  },
  {
    id: 3,
    question: 'O que significa わたし (watashi)?',
    options: ['Você', 'Ele', 'Eu', 'Nós'],
    correct: 2,
    explanation: 'わたし (watashi) significa "eu"',
  },
  {
    id: 4,
    question: 'Como se escreve "ka" em hiragana?',
    options: ['か', 'き', 'く', 'こ'],
    correct: 0,
    explanation: 'か é "ka" em hiragana',
  },
  {
    id: 5,
    question: 'O que significa こんにちは (konnichiwa)?',
    options: ['Bom dia', 'Boa tarde/Olá', 'Boa noite', 'Adeus'],
    correct: 1,
    explanation: 'こんにちは (konnichiwa) significa "olá" ou "boa tarde"',
  },
  {
    id: 6,
    question: 'Qual caractere katakana representa "a"?',
    options: ['ア', 'イ', 'ウ', 'エ'],
    correct: 0,
    explanation: 'ア é "a" em katakana',
  },
  {
    id: 7,
    question: 'Como se diz "Bom dia" em japonês?',
    options: ['おはよう', 'こんばんは', 'さようなら', 'おやすみ'],
    correct: 0,
    explanation: 'おはよう (ohayou) significa "bom dia"',
  },
  {
    id: 8,
    question: 'O que significa みず (mizu)?',
    options: ['Comida', 'Água', 'Chá', 'Leite'],
    correct: 1,
    explanation: 'みず (mizu) significa "água"',
  },
]

export default function PracticePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const question = quizQuestions[currentQuestion]

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === question.correct) {
      setScore(score + 1)
    }
    setAnsweredQuestions(answeredQuestions + 1)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions(0)
    setQuizCompleted(false)
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className="mb-6">
              <Trophy className="w-24 h-24 mx-auto text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Quiz Concluído! 🎉
            </h1>
            <div className="my-8">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                {percentage}%
              </div>
              <p className="text-xl text-gray-600">
                Você acertou {score} de {quizQuestions.length} perguntas
              </p>
            </div>

            {/* Performance Message */}
            <div className="mb-8">
              {percentage >= 80 && (
                <p className="text-lg text-green-600 font-semibold">
                  ✨ Excelente trabalho! Você está dominando o japonês!
                </p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="text-lg text-blue-600 font-semibold">
                  👍 Bom trabalho! Continue praticando!
                </p>
              )}
              {percentage < 60 && (
                <p className="text-lg text-orange-600 font-semibold">
                  💪 Continue estudando! A prática leva à perfeição!
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Tentar Novamente
              </button>
              <button
                onClick={() => window.location.href = '/lessons'}
                className="flex-1 bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 font-bold py-4 rounded-lg transition"
              >
                Voltar às Lições
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Quiz de Prática</h1>
          <p className="text-lg opacity-90">Teste seus conhecimentos de japonês</p>
        </div>

        {/* Progress */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">
              Pergunta {currentQuestion + 1} de {quizQuestions.length}
            </span>
            <span className="text-white font-semibold">
              Pontuação: {score}/{answeredQuestions}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correct
              const showCorrectAnswer = showResult && isCorrect
              const showWrongAnswer = showResult && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 md:p-6 rounded-xl text-left font-semibold text-lg transition-all transform hover:scale-[1.02] ${
                    showCorrectAnswer
                      ? 'bg-green-100 border-2 border-green-500 text-green-700'
                      : showWrongAnswer
                      ? 'bg-red-100 border-2 border-red-500 text-red-700'
                      : isSelected
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-purple-300'
                  } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrectAnswer && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {showWrongAnswer && <XCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-6 rounded-xl mb-6 ${
              selectedAnswer === question.correct
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-red-50 border-2 border-red-200'
            }`}>
              <p className={`font-semibold mb-2 ${
                selectedAnswer === question.correct ? 'text-green-700' : 'text-red-700'
              }`}>
                {selectedAnswer === question.correct ? '✓ Correto!' : '✗ Incorreto'}
              </p>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNext}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}