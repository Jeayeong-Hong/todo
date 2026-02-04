"use client";

import Image from "next/image";

interface BadgeProps {
    tone?: "todo" | "done";
}

// 공용 배지 컴포넌트
export default function Badge({ tone = "todo" }: BadgeProps) {
    const width = tone === "todo" ? 101 : 97;

    return (
        <Image
            src={tone === "todo" ? "/Img/todo.svg" : "/Img/done.svg"}
            alt={tone === "todo" ? "TODO" : "DONE"}
            width={width}
            height={36}
            style={{ width: `${width}px`, height: '36px', marginBottom: '12px' }}
        />
    );
}
