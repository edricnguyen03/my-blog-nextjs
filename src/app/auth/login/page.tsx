"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/data");
            const data = await response.json();
            console.log(data);

            const user = data.users.find(
                (u: { email: string; password: string }) =>
                    u.email === email && u.password === password
            );

            if (user) {
                // Lưu thông tin người dùng vào cookiee
                document.cookie = `user=${encodeURIComponent(
                    JSON.stringify(user)
                )}; path=/`;
                router.push("/blogs");
                window.location.reload();
            } else {
                setError("Incorrect email or password!");
            }
        } catch {
            setError("An error occurred. Please try again!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;