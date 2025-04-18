"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Logout = () => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    useEffect(() => {
        document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

        const timer = setTimeout(() => {
            setIsLoggingOut(false);
            router.push("/");
        }, 500);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-2xl mb-4">{isLoggingOut ? "Logging out..." : "Logged out successfully!"}</p>
            {!isLoggingOut && (
                <button
                    onClick={() => router.push("/")}
                    className="bg-slate-950 text-white px-4 py-2 rounded-md hover:bg-slate-800"
                >
                    Return to Home
                </button>
            )}
        </div>
    );
};

export default Logout;