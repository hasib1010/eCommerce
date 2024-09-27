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
            console.log(error.message);

        }
    };

    // Toggle wishlist item
    const toggleWishlist = async (productId) => {
        if (!user) {
            Swal.fire({ icon: 'warning', title: 'Have You Logged In?' });
            return;
        }

        setWishlist((prevWishlist) => {
            const newWishlist = prevWishlist.includes(productId)
                ? prevWishlist.filter(id => id !== productId) : [...prevWishlist, productId]; // Add to wishlist

            const uniqueWishlist = Array.from(new Set(newWishlist));

            updateWishlist(user.uid, uniqueWishlist);
            return uniqueWishlist;
        });
    };
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    })
    // Update the wishlist in the backend
    const updateWishlist = async (id, updatedWishlist) => {
        console.log('Updating wishlist...'); // Debug statement
        const dataToSubmit = { wishList: updatedWishlist };
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSubmit),
            });
    
            console.log('Response status:', response.status); // Debug statement
    
            if (!response.ok) throw new Error('Failed to update wishlist');
    
            await Toast.fire({
                icon: 'success',
                title: 'Updated Successfully!',
            });
        } catch (error) {
            console.error(error); // Log the error
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
