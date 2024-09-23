import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const useWishlist = () => {
    const { user } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);

    // Fetch the user's wishlist from the backend
    const fetchUserWishlist = async () => {
        if (!user) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/users/${user.uid}`);
            if (!response.ok) throw new Error('Failed to fetch wishlist');
            const data = await response.json();
            setWishlist(data.wishList || []);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error!', text: error.message });
        }
    };

    // Toggle wishlist item
    const toggleWishlist = async (productId) => {
        if (!user) {
            Swal.fire({ icon: 'warning', title: 'Have You Logged In?' });
            return;
        }

        // Create a new wishlist based on whether the productId is already included
        setWishlist((prevWishlist) => {
            const newWishlist = prevWishlist.includes(productId) 
                ? prevWishlist.filter(id => id !== productId) // Remove from wishlist
                : [...prevWishlist, productId]; // Add to wishlist

            // Remove duplicates
            const uniqueWishlist = Array.from(new Set(newWishlist));

            // Update the backend with the new wishlist
            updateWishlist(user.uid, uniqueWishlist);
            return uniqueWishlist;
        });
    };

    // Update the wishlist in the backend
    const updateWishlist = async (id, updatedWishlist) => {
        const dataToSubmit = { wishList: updatedWishlist };
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSubmit),
            });
            if (!response.ok) throw new Error('Failed to update wishlist');
            Swal.fire({ title: 'Update Successful!', text: 'Your wishlist has been updated', icon: 'success' });
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error!', text: error.message });
        }
    };

    // Fetch the user's wishlist when the user changes
    useEffect(() => {
        fetchUserWishlist();
    }, [user]);

    return { wishlist, toggleWishlist };
};

export default useWishlist;
