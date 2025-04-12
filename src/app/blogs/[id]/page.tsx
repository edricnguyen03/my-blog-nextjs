import Container from "@/app/container";
import { format } from "date-fns";
import { TArticle } from "../schema";
import { notFound } from "next/navigation";
import Link from "next/link";

const isEmptyObject = (obj: object) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const generateStaticParams = async () => {
    const data = await fetch("http://localhost:3000/api/data", { cache: "no-store" }).then((res) =>
        res.json()
    );
    const articles: TArticle[] = data.articles;

    return articles.map((article) => ({
        id: article.id,
    }));
};

export const generateMetadata = async ({
    params,
}: {
    params: { id: string };
}) => {
    const { id } = params;
    const data = await fetch("http://localhost:3000/api/data", { cache: "no-store" })
        .then((res) => res.json()
        );
    const article = data.articles.find((item: TArticle) => item.id === id);

    if (!article || isEmptyObject(article)) {
        return {
            title: "Single Blog",
            description: "Single blog description",
        };
    }

    return {
        title: article.title,
        description: article.description,
        category: article.category,
        alternates: {
            canonical: `/blogs/${article.id}`,
        },
        other: {
            customMetaDataName: "customMetaDataContent",
        },
    };
};

const SingleBlog = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const data = await fetch("http://localhost:3000/api/data", { cache: "no-store" }).then((res) =>
        res.json()
    );
    const article = data.articles.find((item: TArticle) => item.id === id);

    if (!article || isEmptyObject(article)) return notFound();

    return (
        <Container classNames="my-12">
            <h1 className="mb-6 text-4xl font-bold capitalize">{article.title}</h1>
            <div className="flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={article.image}
                    alt={article.title}
                    className="h-48 w-full object-cover md:h-64 lg:h-96"
                />
            </div>
            <div className="flex flex-1 flex-col gap-2 px-0 py-6">
                <div className="flex items-center justify-start gap-4 text-sm font-medium leading-5 text-slate-600">
                    <span className="rounded-md bg-red-700 px-2 py-1 capitalize text-red-50">
                        {format(new Date(article.createdAt), "MMMM dd, yyyy")}
                    </span>
                    <span className="rounded-md bg-purple-700 px-2 py-1 capitalize text-purple-50">
                        {article.category}
                    </span>
                </div>
                <p className="text-base leading-6 text-slate-600">{article.content}</p>
                <Link
                    href={`/blogs`}
                    className="w-max rounded-md bg-slate-950 px-4 py-2 capitalize text-slate-50"
                >
                    Go back
                </Link>
            </div>
        </Container>
    );
};

export default SingleBlog;