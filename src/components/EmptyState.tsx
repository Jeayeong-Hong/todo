"use client";

import Image from "next/image";
import { useMediaQuery } from "react-responsive";

interface EmptyStateProps {
    type: "todo" | "done";
}

// 빈 상태 안내 컴포넌트
export default function EmptyState({ type }: EmptyStateProps) {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const imageSrc = type === "todo"
        ? (isMobile ? "/img/Todo_Empty_mobile.png" : "/img/Todo_Empty.png")
        : (isMobile ? "/img/Done_Empty_mobile.png" : "/img/Done_Empty.png");

    return (
        <div className="empty-state">
            <Image
                src={imageSrc}
                alt={type === "todo" ? "할 일이 없어요" : "다 한 일이 없어요"}
                width={isMobile ? 200 : 300}
                height={isMobile ? 150 : 200}
                style={{ width: 'auto', height: 'auto' }}
            />
        </div>
    );
}
