import React from 'react';
import Swal from 'sweetalert2';
import { useCart } from './Providers/CartProvider';

const AddToCartButton = ({ product, selectedSize, selectedColor }) => {
    const { dispatch } = useCart();

    const handleAddToCart = () => {
        if (selectedSize && selectedColor) {
            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    id: product._id,
                    name: product.name,
                    thumbnailImage: product.thumbnailImage,
                    price: product.price,
                    size: selectedSize,
                    color: selectedColor,
                }
            });
            
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart',
                text: 'Product has been added to your cart!',
                confirmButtonText: 'OK'
            });
        } else {
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
