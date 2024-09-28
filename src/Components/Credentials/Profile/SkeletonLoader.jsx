// SkeletonLoader.js
import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="rounded-full bg-gray-300 h-32 w-32 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-2 animate-pulse"></div>
        </div>
    );
};

export default SkeletonLoader;
