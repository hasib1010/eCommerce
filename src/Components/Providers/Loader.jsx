import React from 'react';
function Loader() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <img className='animate-pulse' src="https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Flogos%2Fconverted-c274775b-8cda-4b47-af41-342385184758.webp&w=1920&q=75" alt="" />
            </div>
        </div>
    )
}

export default Loader;