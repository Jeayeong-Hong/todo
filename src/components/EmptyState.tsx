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
        ? (isMobile ? "/Img/Todo_Empty_mobile.svg" : "/Img/Todo_Empty.svg")
        : (isMobile ? "/Img/Done_Empty_mobile.svg" : "/Img/Done_Empty.svg");

    const emptyText = type === "todo"
        ? "할 일이 없어요.\nTODO를 새롭게 추가해주세요!"
        : "아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!";

    return (
        <div className="empty-state">
            <Image
                src={imageSrc}
                alt={type === "todo" ? "할 일이 없어요" : "다 한 일이 없어요"}
                width={isMobile ? 240 : 240}
                height={isMobile ? 120 : 120}
                style={{ width: 'auto', height: 'auto' }}
            />
            <div className="empty-text-description">
                {emptyText}
            </div>
        </div>
    );
}
