import React from 'react';
import Swal from 'sweetalert2';
import { useCart } from './Providers/CartProvider';

const AddToCartButton = ({ product, selectedSize, selectedColor, quantity }) => {
    const { dispatch } = useCart();

    const handleAddToCart = () => {
        if (selectedSize && selectedColor) {
            // Dispatching the action to add the item to the cart
            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    id: product._id,
                    name: product.name,
                    thumbnailImage: product.thumbnailImage,
                    price: product.price,
                    size: selectedSize,
                    color: selectedColor,
                    quantity: quantity, // Include quantity here
                }
            });

            // Show a success notification
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart',
                text: 'Product has been added to your cart!',
                showConfirmButton: false,
                timer: 1500,
                position: 'top-end',
                toast: true,
                timerProgressBar: true,
            });
        } else {
            // Show an error notification if size or color is not selected
            Swal.fire({
                icon: 'error',
                title: 'Selection Error',
                text: 'Please select both size and color.',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            className='bg-blue-500 text-white px-4 py-2 rounded'
        >
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
