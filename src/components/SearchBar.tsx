'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div id="search" className="container mx-auto px-4 py-6">
      <form onSubmit={handleSearch} className="relative">
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Buscar productos..."
          className="w-full rounded-full py-3 pl-4 pr-12 text-sm text-gray-900 placeholder:text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c]"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#ea580c] transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}