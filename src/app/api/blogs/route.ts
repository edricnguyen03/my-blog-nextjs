import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


export async function GET() {
    try {
        // Đường dẫn tới file db.json
        const filePath = path.join(process.cwd(), "db.json");
        const data = await fs.promises.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(data);
        return NextResponse.json(jsonData.articles);
    } catch {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const filePath = path.join(process.cwd(), "db.json");
        const data = await fs.promises.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(data);

        const body = await req.json();
        const newBlog = {
            id: (jsonData.articles.length + 1).toString(),
            createdAt: new Date().toISOString(),
            ...body,
        };

        jsonData.articles.push(newBlog);

        await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}