"use client";

import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

// 상단 로고 헤더 컴포넌트
export default function Header() {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <header className="header">
            <Link href="/" style={{ cursor: 'pointer' }}>
                <Image
                    src={isMobile ? "/Img/top_cha_mobile.svg" : "/Img/top_cha.svg"}
                    alt="do it ;"
                    width={isMobile ? 71 : 120}
                    height={isMobile ? 40 : 68}
                    style={{ width: 'auto', height: 'auto' }}
                />
            </Link>
        </header>
    );
}
