"use client"

import { useState, useEffect } from 'react';

const gethashPath = () => {
    if (typeof window !== "undefined") {
        return decodeURIComponent(window.location.hash.replace("#", ""))
    }
    return undefined;
}
const useHashPath = () => {
    const [hashPath, setHashPath] = useState(gethashPath());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleHashChangeHandler = () => {
            setHashPath(gethashPath());
        };
        window.addEventListener('hashchange', handleHashChangeHandler, false);
        return () => {
            window.removeEventListener('hashchange', handleHashChangeHandler, false);
        };
    }, []);

    return isClient ? hashPath : null;
}

export default useHashPath;