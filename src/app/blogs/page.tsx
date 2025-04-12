
import Container from "@/components/container";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { TArticle } from "./schema";

export const metadata: Metadata = {
    title: "All Blogs",
    description: "A collection of all blog posts available.",
};

export const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Blogs() {

    const res = await fetch("http://localhost:3000/api/blogs", { cache: "no-store" });
    const articles: TArticle[] = await res.json();

    if (!articles || articles.length === 0) {
        notFound();
    }

    return (
        <Container classNames="my-12">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-4xl font-bold">All Blogs</h1>
                <Link
                    href="/blogs/new"
                    className="w-max rounded-md bg-slate-950 px-4 py-2 text-lg text-slate-50"
                >
                    Create new
                </Link>
            </div>

            <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article: TArticle) => {
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
                                    href={`/blogs/${article.id}`}
                                    className="w-max rounded-md bg-slate-950 px-4 py-2 capitalize text-slate-50"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </section>
        </Container>
    );
};
