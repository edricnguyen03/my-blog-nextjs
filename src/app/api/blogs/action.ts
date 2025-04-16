"use server";

import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(),"db.json");

function getMaxId(articles: any[]): number {
    if (!articles || articles.length === 0) {
        return 0; // Trả về 0 nếu danh sách rỗng
    }
    return articles.reduce((max, article) => {
        const id = parseInt(article.id, 10);
        return isNaN(id) ? max : Math.max(max, id); // Bỏ qua các id không hợp lệ
    }, 0);
}

export async function getBlogs() {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData.articles;
};

export async function addBlogs(blog: any) {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);

    const maxId = getMaxId(jsonData.articles);
    const newId = (maxId + 1).toString();

    const newBlog = {
        id: newId,
        ...blog,
    };

    jsonData.articles.push(newBlog);
    await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
    return jsonData.articles;
}


