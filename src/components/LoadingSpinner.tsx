const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="absolute text-sm text-blue-700 mt-16 animate-pulse">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
