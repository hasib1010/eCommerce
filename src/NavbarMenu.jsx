import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function NavbarMenu({ openCategories }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null); // Reference for the dropdown menu

    const handleClick = () => {
        setOpen(!open);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        // Attach the event listener
        document.addEventListener("mousedown", handleClickOutside);
        
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <div onClick={handleClick} className="cursor-pointer flex items-center">
                <h4 className='text-lg font-semibold hover:text-yellow-300 transition-colors'>Other Categories</h4>
                <span className={`ml-2 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}>
                    ▼ {/* Arrow down, rotate to up when open */}
                </span>
            </div>
            
            {open && (
                <div className="bg-white rounded-lg shadow-md mt-2 p-4 absolute -right-10 transition-opacity duration-300 ease-in-out opacity-100">
                    {
                        openCategories.slice(4).map((item, index) => (
                            <Link
                                onClick={() => setOpen(false)}
                                key={index}
                                to={`/navbar/${item}`}
                                className="block text-gray-700 hover:bg-gray-200 rounded px-2 py-1"
                            >
                                {item}
                            </Link>
                        ))
                    }
                </div>
            )}
        </div>
    );
}
