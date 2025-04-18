'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface SearchBarProps {
    onClientSearch?: (term: string) => void;
    initialValue?: string;
    useServerSide?: boolean;
    placeholder?: string;
}

export default function SearchBar({
    onClientSearch,
    initialValue = '',
    useServerSide = true,
    placeholder = "Search blogs by title, content, or category..."
}: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(initialValue);

    useEffect(() => {
        if (useServerSide) {
            const currentSearchQuery = searchParams.get('search') || '';
            setSearchQuery(currentSearchQuery);
        }
    }, [searchParams, useServerSide]);

    const handleSearch = useCallback((term: string) => {
        if (useServerSide) {
            const params = new URLSearchParams(searchParams.toString());

            if (term) {
                params.set('search', term);
            } else {
                params.delete('search');
            }

            router.push(`?${params.toString()}`);
        } else if (onClientSearch) {
            onClientSearch(term);
        }
    }, [router, searchParams, onClientSearch, useServerSide]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchQuery(newValue);

        if (!useServerSide && onClientSearch) {
            onClientSearch(newValue);
        }
    };

    return (
        <form onSubmit={onSubmit} className="mb-6">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                </div>
                <input
                    type="search"
                    id="search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="absolute right-2.5 bottom-2.5 bg-slate-950 hover:bg-slate-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-white"
                >
                    Search
                </button>
            </div>
        </form>
    );
}