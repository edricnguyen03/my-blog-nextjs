
import Container from "@/app/container";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { TArticle } from "./schema";
import { cookies } from "next/headers";

export const isEmptyObject = (obj: object) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const metadata: Metadata = {
    title: "All Blogs",
    description: "A collection of all blog posts available.",
};

export const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Blogs() {
    const userCookie = cookies().get("user");
    if (!userCookie) {
        // Redirect to login page if not authenticated
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">You are not logged in</h1>
                <Link href="/auth/login" className="text-blue-500 underline">
                    Go to Login
                </Link>
            </div>
        );
    }

    const articles = await fetch(`${process.env.JSON_API_URL}/articles`)
        .then((res) => res.json());

    if (isEmptyObject(articles)) {
        notFound();
    }

    return (
        <Container classNames="my-12">
            <h1 className="mb-6 text-4xl font-bold">All Blogs</h1>
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
