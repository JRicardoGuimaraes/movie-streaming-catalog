    'use client';
    import { useRouter } from 'next/navigation';
    import { useState } from 'react';

    const PROVIDERS = [
      { id: '8', name: 'Netflix' },
      { id: '337', name: 'Disney+' },
      { id: '119', name: 'Prime Video' },
      { id: '220', name: 'Max' },
    ];

    export default function Navbar() {
      const [search, setSearch] = useState('');
      const router = useRouter();

      const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search) router.push(`/?q=${search}`);
      };

      return (
        <nav className="bg-zinc-900/80 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <a href="/" className="text-2xl font-bold text-red-600 tracking-tighter">
              MOVIE<span className="text-white">CATALOG</span>
            </a>
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <input
                type="text"
                placeholder="Pesquisar filme..."
                className="bg-zinc-800 text-white px-4 py-2 rounded-l-md outline-none focus:ring-2 ring-red-600 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
    <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-r-md
    hover:bg-red-700">🔍</button>
            </form>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {PROVIDERS.map(p => (
                <button
                  key={p.id}
                  onClick={() => router.push(`/?provider=${p.id}`)}
    className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full hover:bg-zinc-700
    hover:text-white transition-all whitespace-nowrap"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      );
    }