'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'

interface Character {
  char: string
  romaji: string
  sound: string
}

interface Example {
  word: string
  romaji: string
  meaning: string
}

interface LessonContent {
  introduction: string
  characters: Character[]
  examples: Example[]
}

interface Lesson {
  id: number
  title: string
  titlePt: string
  description: string
  content: LessonContent
}

// 模擬データ - 後でデータベースから取得
const lessonData: Record<string, Lesson> = {
  '1': {
    id: 1,
    title: 'Hiragana',
    titlePt: 'Alfabeto Hiragana',
    description: 'Aprenda os 46 caracteres básicos do hiragana',
    content: {
      introduction: 'O hiragana é um dos três sistemas de escrita japoneses. É usado para palavras japonesas nativas e partículas gramaticais.',
      characters: [
        { char: 'あ', romaji: 'a', sound: 'Como "a" em "casa"' },
        { char: 'い', romaji: 'i', sound: 'Como "i" em "vida"' },
        { char: 'う', romaji: 'u', sound: 'Como "u" em "uva"' },
        { char: 'え', romaji: 'e', sound: 'Como "e" em "peso"' },
        { char: 'お', romaji: 'o', sound: 'Como "o" em "olho"' },
        
        { char: 'か', romaji: 'ka', sound: 'Como "ca" em "casa"' },
        { char: 'き', romaji: 'ki', sound: 'Como "qui" em "quilo"' },
        { char: 'く', romaji: 'ku', sound: 'Como "cu" em "cubo"' },
        { char: 'け', romaji: 'ke', sound: 'Como "que" em "queda"' },
        { char: 'こ', romaji: 'ko', sound: 'Como "co" em "cola"' },

        { char: 'さ', romaji: 'sa', sound: 'Como "sa" em "sala"' },
        { char: 'し', romaji: 'shi', sound: 'Como "xi" em "xícara"' },
        { char: 'す', romaji: 'su', sound: 'Como "su" em "suco"' },
        { char: 'せ', romaji: 'se', sound: 'Como "se" em "seta"' },
        { char: 'そ', romaji: 'so', sound: 'Como "so" em "sol"' },

        { char: 'た', romaji: 'ta', sound: 'Como "ta" em "tarde"' },
        { char: 'ち', romaji: 'chi', sound: 'Como "ti" em "tinta"' },
        { char: 'つ', romaji: 'tsu', sound: 'Som entre "t" e "su"' },
        { char: 'て', romaji: 'te', sound: 'Como "te" em "telefone"' },
        { char: 'と', romaji: 'to', sound: 'Como "to" em "tomate"' },

        { char: 'な', romaji: 'na', sound: 'Como "na" em "nariz"' },
        { char: 'に', romaji: 'ni', sound: 'Como "ni" em "nível"' },
        { char: 'ぬ', romaji: 'nu', sound: 'Como "nu" em "nuvem"' },
        { char: 'ね', romaji: 'ne', sound: 'Como "ne" em "neto"' },
        { char: 'の', romaji: 'no', sound: 'Como "no" em "novo"' },

        { char: 'は', romaji: 'ha', sound: 'Como "ra" suave (ha)' },
        { char: 'ひ', romaji: 'hi', sound: 'Som suave entre "ri" e "hi"' },
        { char: 'ふ', romaji: 'fu', sound: 'Entre "fu" e "hu"' },
        { char: 'へ', romaji: 'he', sound: 'Como "re" suave' },
        { char: 'ほ', romaji: 'ho', sound: 'Como "ro" suave' },

        { char: 'ま', romaji: 'ma', sound: 'Como "ma" em "mala"' },
        { char: 'み', romaji: 'mi', sound: 'Como "mi" em "mil"' },
        { char: 'む', romaji: 'mu', sound: 'Como "mu" em "mudo"' },
        { char: 'め', romaji: 'me', sound: 'Como "me" em "mel"' },
        { char: 'も', romaji: 'mo', sound: 'Como "mo" em "moto"' },

        { char: 'や', romaji: 'ya', sound: 'Como "ia" em "iate"' },
        { char: '*', romaji: '*', sound: '*' },
        { char: 'ゆ', romaji: 'yu', sound: 'Como "iu" em "viu"' },
        { char: '*', romaji: '*', sound: '*' },
        { char: 'よ', romaji: 'yo', sound: 'Como "io" em "ióga"' },

        { char: 'ら', romaji: 'ra', sound: 'Som entre "ra" e "la"' },
        { char: 'り', romaji: 'ri', sound: 'Som entre "ri" e "li"' },
        { char: 'る', romaji: 'ru', sound: 'Som entre "ru" e "lu"' },
        { char: 'れ', romaji: 're', sound: 'Som entre "re" e "le"' },
        { char: 'ろ', romaji: 'ro', sound: 'Som entre "ro" e "lo"' },

        { char: 'わ', romaji: 'wa', sound: 'Como "ua" em "uau"' },
        { char: '*', romaji: '*', sound: '*' },
        { char: '*', romaji: '*', sound: '*' },
        { char: '*', romaji: '*', sound: '*' },
        { char: 'を', romaji: 'wo', sound: 'Usado como partícula, pronunciado "o"' },
        { char: 'ん', romaji: 'n', sound: 'Som nasal "n" no final das palavras' },
      ],
      examples: [
        { word: 'あい', romaji: 'ai', meaning: 'amor' },
        { word: 'いえ', romaji: 'ie', meaning: 'casa' },
        { word: 'うえ', romaji: 'ue', meaning: 'cima' },
        { word: 'かお', romaji: 'kao', meaning: 'rosto' },
      ],
    },
  },
  '2': {
    id: 2,
    title: 'Katakana',
    titlePt: 'Alfabeto Katakana',
    description: 'Domine o katakana para palavras estrangeiras',
    content: {
      introduction: 'O katakana é usado principalmente para palavras estrangeiras, nomes estrangeiros e onomatopeias.',
      characters: [
        { char: 'ア', romaji: 'a', sound: 'Como "a" em "casa"' },
        { char: 'イ', romaji: 'i', sound: 'Como "i" em "vida"' },
        { char: 'ウ', romaji: 'u', sound: 'Como "u" em "uva"' },
        { char: 'エ', romaji: 'e', sound: 'Como "e" em "peso"' },
        { char: 'オ', romaji: 'o', sound: 'Como "o" em "olho"' },

        { char: 'カ', romaji: 'ka', sound: 'Como "ca" em "casa"' },
        { char: 'キ', romaji: 'ki', sound: 'Como "qui" em "quilo"' },
        { char: 'ク', romaji: 'ku', sound: 'Como "cu" em "cubo"' },
        { char: 'ケ', romaji: 'ke', sound: 'Como "que" em "queda"' },
        { char: 'コ', romaji: 'ko', sound: 'Como "co" em "cola"' },
        
        { char: 'サ', romaji: 'sa', sound: 'Como "sa" em "sala"' },
        { char: 'シ', romaji: 'shi', sound: 'Como "xi" em "xícara"' },
        { char: 'ス', romaji: 'su', sound: 'Como "su" em "suco"' },
        { char: 'セ', romaji: 'se', sound: 'Como "se" em "seta"' },
        { char: 'ソ', romaji: 'so', sound: 'Como "so" em "sol"' },

        { char: 'タ', romaji: 'ta', sound: 'Como "ta" em "tarde"' },
        { char: 'チ', romaji: 'chi', sound: 'Como "ti" em "tinta"' },
        { char: 'ツ', romaji: 'tsu', sound: 'Som entre "t" e "su"' },
        { char: 'テ', romaji: 'te', sound: 'Como "te" em "telefone"' },
        { char: 'ト', romaji: 'to', sound: 'Como "to" em "tomate"' },

        { char: 'ナ', romaji: 'na', sound: 'Como "na" em "nariz"' },
        { char: 'ニ', romaji: 'ni', sound: 'Como "ni" em "nível"' },
        { char: 'ヌ', romaji: 'nu', sound: 'Como "nu" em "nuvem"' },
        { char: 'ネ', romaji: 'ne', sound: 'Como "ne" em "neto"' },
        { char: 'ノ', romaji: 'no', sound: 'Como "no" em "novo"' },

        { char: 'ハ', romaji: 'ha', sound: 'Como "ra" suave (ha)' },
        { char: 'ヒ', romaji: 'hi', sound: 'Som suave entre "ri" e "hi"' },
        { char: 'フ', romaji: 'fu', sound: 'Entre "fu" e "hu"' },
        { char: 'ヘ', romaji: 'he', sound: 'Como "re" suave' },
        { char: 'ホ', romaji: 'ho', sound: 'Como "ro" suave' },

        { char: 'マ', romaji: 'ma', sound: 'Como "ma" em "mala"' },
        { char: 'ミ', romaji: 'mi', sound: 'Como "mi" em "mil"' },
        { char: 'ム', romaji: 'mu', sound: 'Como "mu" em "mudo"' },
        { char: 'メ', romaji: 'me', sound: 'Como "me" em "mel"' },
        { char: 'モ', romaji: 'mo', sound: 'Como "mo" em "moto"' },

        { char: 'ヤ', romaji: 'ya', sound: 'Como "ia" em "iate"' },
        { char: '*', romaji: '*', sound: '*' },
        { char: 'ユ', romaji: 'yu', sound: 'Como "iu" em "viu"' },
        { char: '*', romaji: '*', sound: '*' },
        { char: 'ヨ', romaji: 'yo', sound: 'Como "io" em "ióga"' },

        { char: 'ラ', romaji: 'ra', sound: 'Som entre "ra" e "la"' },
        { char: 'リ', romaji: 'ri', sound: 'Som entre "ri" e "li"' },
        { char: 'ル', romaji: 'ru', sound: 'Som entre "ru" e "lu"' },
        { char: 'レ', romaji: 're', sound: 'Som entre "re" e "le"' },
        { char: 'ロ', romaji: 'ro', sound: 'Som entre "ro" e "lo"' },

        { char: 'ワ', romaji: 'wa', sound: 'Como "ua" em "uau"' },
        { char: '*', romaji: '*', sound: '*' },
        { char: '*', romaji: '*', sound: '*' },
        { char: '*', romaji: '*', sound: '*' },
        { char: '*', romaji: '*', sound: '*' },
        { char: 'ヲ', romaji: 'wo', sound: 'Usado como partícula, pronunciado "o"' },

        { char: 'ン', romaji: 'n', sound: 'Som nasal "n" no final das palavras' },
      ],
      examples: [
        { word: 'コーヒー', romaji: 'kōhī', meaning: 'café' },
        { word: 'アイス', romaji: 'aisu', meaning: 'sorvete' },
        { word: 'カメラ', romaji: 'kamera', meaning: 'câmera' },
      ],
    },
  },
}

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const lesson = lessonData[id]
  const [completedChars, setCompletedChars] = useState<Set<string>>(new Set())

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Lição não encontrada</h1>
          <Link href="/lessons" className="text-purple-600 hover:underline">
            ← Voltar para lições
          </Link>
        </div>
      </div>
    )
  }

  const toggleCharacter = (romaji: string) => {
    const newSet = new Set(completedChars)
    if (newSet.has(romaji)) {
      newSet.delete(romaji)
    } else {
      newSet.add(romaji)
    }
    setCompletedChars(newSet)
  }

  const progress = (completedChars.size / lesson.content.characters.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/lessons"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para lições
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {lesson.title}
          </h1>
          <p className="text-xl text-gray-600">{lesson.titlePt}</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Progresso da Lição</span>
            <span className="text-sm font-semibold text-purple-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {completedChars.size} de {lesson.content.characters.length} caracteres aprendidos
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Introdução</h2>
          <p className="text-gray-700 leading-relaxed">{lesson.content.introduction}</p>
        </div>

        {/* Characters Grid */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Caracteres</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {lesson.content.characters.map((item: Character) => (
              <button
                key={item.romaji}
                onClick={() => toggleCharacter(item.romaji)}
                className={`relative p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                  completedChars.has(item.romaji)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                {completedChars.has(item.romaji) && (
                  <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-green-500" />
                )}
                <div className="text-4xl font-bold text-center mb-2">{item.char}</div>
                <div className="text-sm text-gray-600 text-center font-semibold">{item.romaji}</div>
                <div className="text-xs text-gray-500 text-center mt-2">{item.sound}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Exemplos de Palavras</h2>
          <div className="space-y-4">
            {lesson.content.examples.map((example: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100"
              >
                <div>
                  <div className="text-2xl font-bold text-purple-700 mb-1">{example.word}</div>
                  <div className="text-sm text-gray-600">{example.romaji}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-800">{example.meaning}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              alert('Lição concluída! 🎉')
              router.push('/lessons')
            }}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition"
          >
            Concluir Lição
          </button>
          <Link
            href="/practice"
            className="flex-1 bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 font-bold py-4 rounded-lg transition text-center"
          >
            Praticar Agora
          </Link>
        </div>
      </div>
    </div>
  )
}
