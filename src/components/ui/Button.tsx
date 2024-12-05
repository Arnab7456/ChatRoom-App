export interface ButtonProps {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    title: string;
    endIcon?: React.ReactNode;
    onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
    const { variant = "primary", size = "md", onClick, title, endIcon } = props; // Default values

    const BaseClass =
        "inline-flex items-center justify-center rounded font-normal transition duration-200";

    const sizeClasses: Record<string, string> = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-8 py-2 text-lg",
    };

    const variantClasses: Record<string, string> = {
        secondary: "bg-primary text-white hover:bg-primary-dark",
        primary: "bg-secondary text-white hover:bg-secondary-dark",
    };

    return (
        <button
            className={`${BaseClass} ${sizeClasses[size] || ""} ${variantClasses[variant] || ""} m-2`}
            onClick={onClick}
            title={title}
        >
            {title}
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </button>
    );
};
