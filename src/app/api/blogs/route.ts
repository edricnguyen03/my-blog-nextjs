import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


export async function GET() {
    try {
        // Đường dẫn tới file db.json
        const filePath = path.join(process.cwd(), "db.json");
        const data = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(data);

        return NextResponse.json(jsonData.articles);
    } catch {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
export async function POST(req: Request) {
    try {
        const filePath = path.join(process.cwd(), "db.json");
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const body = await req.json();
        const newBlog = {
            id: (data.articles.length + 1).toString(),
            createdAt: new Date().toISOString(),
            ...body,
        };

        data.articles.push(newBlog);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

        return NextResponse.json(newBlog, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}