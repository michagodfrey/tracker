interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`rounded-lg border bg-white p-6 shadow-sm ${className}`}>
        {children}
        </div>
    );
    }

    export function CardHeader({ children, className = "" }: CardProps) {
    return <div className={`space-y-1.5 ${className}`}>{children}</div>;
    }

    export function CardTitle({ children, className = "" }: CardProps) {
    return <h3 className={`text-2xl font-semibold ${className}`}>{children}</h3>;
    }

    export function CardDescription({ children, className = "" }: CardProps) {
    return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
    }

    export function CardContent({ children, className = "" }: CardProps) {
    return <div className={`mt-4 ${className}`}>{children}</div>;
}
