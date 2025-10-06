import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aprenda Japonês - Seu Portal de Aprendizado",
  description: "Aprenda japonês do zero com lições interativas, quizzes e muito mais",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers> 
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}