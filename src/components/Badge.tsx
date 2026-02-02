"use client";

import Image from "next/image";
import { useMediaQuery } from "react-responsive";

interface BadgeProps {
    tone?: "todo" | "done";
}

// 공용 배지 컴포넌트
export default function Badge({ tone = "todo" }: BadgeProps) {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const imageSrc = tone === "todo"
        ? (isMobile ? "/img/todo_mobile.png" : "/img/todo.png")
        : (isMobile ? "/img/done_mobile.png" : "/img/done.png");

    return (
        <div className="badge">
            <Image
                src={imageSrc}
                alt={tone === "todo" ? "TODO" : "DONE"}
                width={isMobile ? 100 : 150}
                height={40}
                style={{ width: 'auto', height: 'auto' }}
            />
        </div>
    );
}
