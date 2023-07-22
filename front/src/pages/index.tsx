import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/Components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="min-h-screen bg-pink-300 flex flex-col text-gray-700">
    <Header />
    </div>
  )
}
