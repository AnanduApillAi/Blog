import { cookies } from 'next/headers';
import { ThemeProvider } from 'next-themes';
import '../styles/global.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');
  const isDark = theme?.value === 'dark';

  return (
    <html lang="en" className={isDark ? 'dark' : ''} suppressHydrationWarning>
      <body className="min-h-screen bg-theme-primary text-theme-primary transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme={isDark ? 'dark' : 'light'}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}