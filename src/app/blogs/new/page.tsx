"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/container";

export default function NewBlog() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    content,
                    category,
                    image: "/images/articles/article-1.jpg", // Default image
                }),
            });

            if (response.ok) {
                router.push("/blogs");
            } else {
                setError("Failed to create blog. Please try again.");
            }
        } catch {
            setError("An error occurred. Please try again.");
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="content" className="font-medium">Content</label>
                    <textarea
                        id="content"
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
