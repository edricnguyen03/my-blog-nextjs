"use server";

import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(),"db.json");


export async function getBlogs() {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData.articles;
};

export async function addBlogs(blog: any) {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    const newBlog = {
        id: (jsonData.articles.length + 1).toString(),
        createdAt: new Date().toISOString(),
        ...blog,
    };

    jsonData.articles.push(newBlog);
    await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
    return jsonData.articles;
}


