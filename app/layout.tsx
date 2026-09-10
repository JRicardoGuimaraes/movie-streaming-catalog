    import './globals.css';
    import { Inter } from 'next/font/google';

    const inter = Inter({ subsets: ['latin'] });

    export const metadata = {
      title: 'Movie Catalog - Onde Assistir',
      description: 'Catálogo de filmes disponíveis nos streamings',
    };

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="pt-BR">
          <body className={`${inter.className} bg-black text-white antialiased`}>
            {children}
          </body>
        </html>
      );
    }