interface LoadingSpinnerProps {
    className?: string;
}

function LoadingSpinner({ className = '' }: LoadingSpinnerProps) {
    return (
        <div className="flex items-center justify-center fixed inset-0 h-screen w-screen bg-white/80 z-50">
            <div className={`animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-primary ${className}`} />
        </div>
    );
}

export default LoadingSpinner;