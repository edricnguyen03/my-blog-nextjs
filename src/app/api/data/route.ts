import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        // Đường dẫn tới file db.json
        const filePath = path.join(process.cwd(), "db.json");
        const data = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(data);

        return NextResponse.json(jsonData);
    } catch {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}