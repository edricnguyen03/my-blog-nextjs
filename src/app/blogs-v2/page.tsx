"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { TArticle } from "../blogs/schema";
import Loading from "../loading";
import SearchBar from "@/components/search/SearchBar";

export default function BlogTest() {
    const [articles, setArticles] = useState<TArticle[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<TArticle[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/blogs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch blogs");
                }

                const data = await res.json();
                setArticles(data);
                setFilteredArticles(data);
            } catch {
                alert("An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleClientSearch = (term: string) => {
        setSearchQuery(term);

        if (term.trim() === '') {
            setFilteredArticles(articles);
        } else {
            const query = term.toLowerCase();
            const filtered = articles.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.description.toLowerCase().includes(query) ||
                article.content.toLowerCase().includes(query) ||
                article.category.toLowerCase().includes(query)
            );
            setFilteredArticles(filtered);
        }
    };

    if (loading) return <Loading />;

    return (
        <Container classNames="my-12">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-4xl font-bold">All Blogs</h1>
                <Link
                    href="/blogs-v2/new"
                    className="w-max rounded-md bg-slate-950 px-4 py-2 text-base font-bold text-slate-50"
                >
                    Create new
                </Link>
            </div>

            {/* Sử dụng SearchBar component trong chế độ client-side */}
            <SearchBar
                onClientSearch={handleClientSearch}
                initialValue={searchQuery}
                useServerSide={false}
            />

            {filteredArticles.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-xl">No blog posts found{searchQuery ? ` for "${searchQuery}"` : ''}.</p>
                </div>
            ) : (
                <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {filteredArticles.map((article: TArticle) => {
                        return (
                            <div
                                className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg"
                                key={article.id}
                            >
                                <div className="flex-shrink-0">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        priority={false}
                                        width={384}
                                        height={192}
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-2 p-6">
                                    <div className="flex items-center justify-start gap-4 text-sm font-medium leading-5 text-slate-600">
                                        <span className="rounded-md bg-red-700 px-2 py-1 capitalize text-red-50">
                                            {format(new Date(article.createdAt), "MMMM dd, yyyy")}
                                        </span>
                                        <span className="rounded-md bg-purple-700 px-2 py-1 capitalize text-purple-50">
                                            {article.category}
                                        </span>
                                    </div>
                                    <h3 className="mt-2 text-xl font-semibold capitalize">
                                        {article.title}
                                    </h3>
                                    <p className="text-base leading-6 text-slate-600">
                                        {article.description}
                                    </p>
                                    <Link
                                        href={`/blogs-v2/${article.id}`}
                                        className="w-max rounded-md bg-slate-950 px-4 py-2 capitalize text-slate-50"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </section>
            )}
        </Container>
    );
};
