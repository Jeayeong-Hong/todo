import { InputHTMLAttributes, forwardRef } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
}

// 공용 텍스트 인풋 컴포넌트
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ className, fullWidth = false, ...props }, ref) => {
        return (
            <input
                ref={ref}
                {...props}
                className={[
                    "text-input",
                    fullWidth && "text-input-full",
                    className,
                ]
                    .filter(Boolean)
                    .join(" ")}
            />
        );
    },
);

TextInput.displayName = "TextInput";

export default TextInput;
