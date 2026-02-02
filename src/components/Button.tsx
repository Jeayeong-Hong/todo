import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

interface ImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
}

// 공용 텍스트 버튼 컴포넌트
export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={["btn", `btn-${variant}`, className].filter(Boolean).join(" ")}
    />
  );
}

// 이미지 버튼 컴포넌트
export function ImageButton({
  imageSrc,
  imageAlt,
  imageWidth = 56,
  imageHeight = 56,
  className,
  ...props
}: ImageButtonProps) {
  return (
    <button
      {...props}
      className={["image-btn", className].filter(Boolean).join(" ")}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
      />
    </button>
  );
}
