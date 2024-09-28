
export function CardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full h-full animate-pulse">
            <div className="p-6 flex flex-col h-full">
                <div className="flex-grow">
                    <div className="w-20 h-6 bg-gray-200 rounded-full mb-4"></div>
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-full"></div>
                        <div className="flex-grow">
                            <div className="w-3/4 h-6 bg-gray-200 rounded mb-2"></div>
                            <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="w-full h-4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6">
                    <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}
