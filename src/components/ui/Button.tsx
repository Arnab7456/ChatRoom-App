export interface ButtonProps {
    variant?: "primary" | "secondary"; // Optional with default value
    size?: "sm" | "md" | "lg"; // Restricted to available sizes
    onClick: () => void;
    title: string; // Corrected from 'tittle' to 'title'
}

export const Button = (props: ButtonProps) => {
    const { variant = "primary", size = "md", onClick, title } = props; // Default values

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
            className={`${BaseClass} ${sizeClasses[size] || ""} ${
                variantClasses[variant] || ""
            } m-2`}
            onClick={onClick}
            title={title} // Correctly set the title attribute
        >
            {title} {/* Display the button's title */}
        </button>
    );
};
