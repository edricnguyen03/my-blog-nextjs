"use client";

import useHashPath from "@/hooks/useHashPath";
import Link from "next/link";

const ClientLink = ({
    children,
    href,
    classNames
}: {
    children: React.ReactNode,
    href: string,
    classNames?: string
}) => {
    const hashPathId = useHashPath();
    const hashHref = href.substring(1);
    const actualPathname = hashHref === "" ? hashPathId : `#${hashPathId}`;

    return (
        <>
            <Link
                href={href}
                className={`${classNames} ${hashHref === actualPathname ? "undefined" : ""}`}
                onClick={() => (window.location.href = hashHref)}
            >
                {children}
            </Link >
        </>
    );
}

export default ClientLink;