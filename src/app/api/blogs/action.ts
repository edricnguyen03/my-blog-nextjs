"use server";

import fs from "fs";
import path from "path";
import {TArticle}  from "@/app/blogs/schema";
const filePath = path.join(process.cwd(),"db.json");


export async function getBlogs(searchQuery?: string) {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    const articles = jsonData.articles;
    
    if (searchQuery && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return articles.filter((article: TArticle) => 
            article.title.toLowerCase().includes(query)
        );
    }
    
    return articles;
};

export async function addBlogs(blog : TArticle) {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    const newBlog = {
        ...blog,
        id: (jsonData.articles.length + 1).toString(),
    };
    jsonData.articles.push(newBlog);
    await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
    return jsonData.articles;
}


