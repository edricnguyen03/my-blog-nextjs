"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        // Xóa cookie chứa thông tin người dùng
        document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        router.push("/");
        window.location.reload();
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Logging out...</h1>
        </div>
    );
};

export default Logout;