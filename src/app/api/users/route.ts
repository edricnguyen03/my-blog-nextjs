import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "db.json");
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        return NextResponse.json(data.users);
    } catch {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const filePath = path.join(process.cwd(), "db.json");
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const body = await req.json();
        const newUser = {
            id: (data.users.length + 1).toString(),
            createdAt: new Date().toISOString(),
            ...body,
        };

        data.users.push(newUser);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

        return NextResponse.json(newUser, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}