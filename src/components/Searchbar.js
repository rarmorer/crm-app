'use client';

import { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      // const res = await fetch(`/api/search-address-book?q=${encodeURIComponent(query)}`); the dynamic search
      const res = await fetch('/api/search?q=Jane');      
      const data = await res.json();
      setResults(data.contacts || []);
      console.log(results)
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <div className="flex space-x-2">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search contacts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300"
        >
          Search
        </button>
      </div>
      {results.length > 0 && (
        <ul className="mt-2 bg-white border rounded-xl shadow p-2 space-y-1">
          {results.map((contact) => (
            <li key={contact.id} className="text-sm text-gray-700">
              {contact.name} — {contact.phone_number}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;