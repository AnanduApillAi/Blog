// app/layout.tsx
import { cookies } from 'next/headers'

import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import '../styles/global.css'



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore =await cookies()

  const theme = cookieStore.get('theme')
  const isDark = theme?.value === 'dark'
  


  return (
    <html lang="en" className={isDark ? 'dark' : ''}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.toggleTheme = function() {
                const isDark = document.documentElement.classList.contains('dark');
                document.documentElement.className = isDark ? '' : 'dark';
                document.cookie = 'theme=' + (isDark ? '' : 'dark') + ';path=/';
              }
            `
          }}
        />
      </head>
      <body className="bg-theme-primary text-theme-primary transition-colors duration-200">
        <Header/>
        
          <SearchBar />
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}