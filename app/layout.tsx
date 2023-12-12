import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BiljartLine',
  description: 'Categorisering voor de biljartsport',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="grid grid-cols-12">
            <div className='col-start-2 col-span-10 mt-6' >
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
