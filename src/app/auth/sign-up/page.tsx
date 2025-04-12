"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
                router.push("/auth/login");
            } else {
                const data = await response.json();
                setError(data.error || "Failed to sign up");
            }
        } catch {
            setError("An error occurred. Please try again!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <form className="flex flex-col mt-4 space-y-4" onSubmit={handleSignUp}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className={`p-2 rounded ${isLoading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Signing up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default SignUp;