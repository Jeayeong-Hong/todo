import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

interface ImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

// 이미지 버튼 컴포넌트 - CSS 기반 스타일링
export function ImageButton({
  className,
  children,
  ...props
}: ImageButtonProps & { children?: React.ReactNode }) {
  return (
    <button
      {...props}
      className={["image-btn", className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}
