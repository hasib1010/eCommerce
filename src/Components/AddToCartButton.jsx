import React from 'react';
import Swal from 'sweetalert2';
import { useCart } from './Providers/CartProvider';

const AddToCartButton = ({ product, selectedSize, selectedColor }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select size and color!',
      });
      return;
    }

    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });

    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${product.name} has been added to your cart!`,
    });
  };

  return (
    <button onClick={handleAddToCart} className='bg-blue-500 text-white px-4 py-2 rounded'>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
