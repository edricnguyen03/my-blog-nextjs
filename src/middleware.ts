import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const user = request.cookies.get("user"); // Lấy thông tin từ cookie

    if (!user) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang login
        const loginUrl = new URL("/auth/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Nếu đã đăng nhập, cho phép tiếp tục
    return NextResponse.next();
}

// Áp dụng middleware cho các route bắt đầu bằng /blogs
export const config = {
    matcher: ["/blogs/new/"],
};