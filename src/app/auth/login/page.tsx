"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/container";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Trạng thái đang xử lý đăng nhập
    const router = useRouter();

    // Kiểm tra nếu người dùng đã đăng nhập
    useEffect(() => {
        if (document.cookie.includes("user=")) {
            router.push("/"); // Chuyển hướng nếu đã đăng nhập
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Bắt đầu xử lý đăng nhập
        setError(""); // Xóa lỗi cũ (nếu có)
        try {
            const response = await fetch("/api/users");
            const users = await response.json();

            const user = users.find(
                (u: { email: string; password: string }) =>
                    u.email === email && u.password === password
            );

            if (user) {
                // Lưu thông tin người dùng vào cookie
                document.cookie = `user=${encodeURIComponent(
                    JSON.stringify(user)
                )}; path=/`;
                window.location.reload();
                router.push("/");
            } else {
                setError("Incorrect email or password!");
            }
        } catch {
            setError("An error occurred. Please try again!");
        } finally {
            setIsLoading(false); // Kết thúc xử lý đăng nhập
        }
    };

    return (
        <Container classNames="flex flex-col items-center justify-center h-screen">
            {isLoading && <p className="text-blue-500 mb-4">Signing in...</p>}
            <form className="flex flex-col gap-4 w-full max-w-xl rounded-xl shadow-2xl p-6" onSubmit={handleLogin}>
                <h1 className="text-2xl text-center font-bold mb-4">Login</h1>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                        disabled={isLoading} // Vô hiệu hóa khi đang xử lý
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                        disabled={isLoading} // Vô hiệu hóa khi đang xử lý
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className={`p-2 rounded font-bold ${isLoading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white"
                        }`}
                    disabled={isLoading} // Vô hiệu hóa khi đang xử lý
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </Container>
    );
};

export default Login;