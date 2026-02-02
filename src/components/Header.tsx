"use client";

import Image from "next/image";
import { useMediaQuery } from "react-responsive";

// 상단 로고 헤더 컴포넌트
export default function Header() {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <header className="header">
            <Image
                src={isMobile ? "/img/top_cha_mobile.png" : "/img/top_cha.png"}
                alt="do it ;"
                width={isMobile ? 60 : 120}
                height={isMobile ? 45 : 90}
                style={{ width: 'auto', height: 'auto' }}
            />
        </header>
    );
}
