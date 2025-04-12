"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/container";

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
        <Container classNames="flex flex-col items-center justify-center h-screen">
            <form className="flex flex-col mt-4 space-y-4 w-full max-w-xl rounded-xl shadow-2xl p-6" onSubmit={handleSignUp}>
                <h1 className="text-2xl text-center font-bold">Sign Up</h1>
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="font-medium">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-medium    ">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className={`p-2 rounded font-bold ${isLoading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Signing up..." : "Sign Up"}
                </button>
            </form >
        </Container >
    );
};

export default SignUp;