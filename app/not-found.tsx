import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı - 404 | 68 Riders',
  description: 'Aradığınız sayfa bulunamadı. 68 Riders ana sayfasına dönün.',
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-display font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-6">Sayfa Bulunamadı</h2>
        <p className="text-xl text-gray-400 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link 
          href="/"
          className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-all"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  )
}
