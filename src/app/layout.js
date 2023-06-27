import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Valahd',
  description: 'Giddy up! Let\'s ride through this market storm. Into the clouds! To the end of the rainbow! Where our pot of gold awaits!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
