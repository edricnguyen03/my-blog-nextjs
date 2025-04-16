"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/container";
import { TArticle } from "@/app/blogs/schema";
import { addBlogs } from "@/app/api/blogs/action";

export default function NewBlog() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const [article, setArticle] = useState<TArticle>({
        id: "",
        title: "",
        description: "",
        content: "",
        category: "",
        image: "",
        createdAt: new Date().toISOString(),
    });

    const handleInputChange = (field: keyof TArticle, value: string) => {
        setArticle((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: article.title,
                    description: article.description,
                    content: article.content,
                    category: article.category,
                    image: "/images/articles/article-1.jpg",
                }),
            });
            if (!res.ok) {
                throw new Error("Failed to create blog");
            }
            alert("Blog created successfully!");
            router.push("/blogs");
        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.");
        }
    };

    return (
        <Container classNames="flex flex-col items-center justify-center h-screen">
            <form className="flex flex-col gap-4 w-full max-w-xl rounded-xl shadow-2xl p-6" onSubmit={handleSubmit}>
                <h1 className="text-2xl text-center font-bold mb-4">Create New Blog</h1>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="font-medium">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={article.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-medium">Description</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="Description"
                        value={article.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="content" className="font-medium">Content</label>
                    <textarea
                        id="content"
                        placeholder="Content"
                        value={article.content}
                        onChange={(e) => handleInputChange("content", e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        rows={5}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="category" className="font-medium">Category</label>
                    <input
                        type="text"
                        id="category"
                        placeholder="Category"
                        value={article.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Create Blog
                </button>
            </form>
        </Container>
    );
};
