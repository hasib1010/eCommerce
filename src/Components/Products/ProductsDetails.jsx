import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../AddToCartButton';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [thumbUrl, setThumbUrl] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for product quantity

  useEffect(() => {
    fetch(`https://e-commerce-server-alpha.vercel.app/products/clothings/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className='container mx-auto mt-10'>
      <div className='my-5 flex gap-10'>
        <div className='border rounded-xl w-fit flex-1 flex flex-col pt-10 items-center justify-start gap-20'>
          <img
            src={thumbUrl ? thumbUrl : product.thumbnailImage}
            className='rounded-xl h-[500px]' alt={product.name} />
          <div className="flex gap-3">
            {product.catalogImages.map(url => (
              <div key={url}>
                <img
                  onClick={() => setThumbUrl(url)}
                  className={`${thumbUrl === url ? "opacity-100 bg-black p-1" : "opacity-50"} opacity-50 hover:opacity-100 h-20 rounded-xl border cursor-pointer`}
                  src={url} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className='flex-1 flex flex-col gap-10'>
          <h3 className='text-5xl font-bold'>{product.name}</h3>
          <h4 className='text-4xl font-bold text-red-500'>$ {parseFloat(product.price).toFixed(2)}</h4>
          <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }} />
          <div>
            <h4 className='text-xl font-bold'>Sizes:</h4>
            <ul className='flex gap-3 ml-20'>
              {product.sizes.map(size => (
                <li
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`cursor-pointer px-3 py-1 rounded ${size === selectedSize ? 'bg-red-700 text-white' : 'bg-gray-200'}`}
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className='text-xl font-bold'>Color:</h4>
            <ul className='flex gap-3 ml-20'>
              {product.colors.map(color => (
                <li
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`cursor-pointer px-3 font-bold py-1 rounded ${color === selectedColor ? `${selectedColor === "White" ? "text-purple-600 border font-bold shadow-lg" : "text-white"}` : 'bg-gray-200'}`}
                  style={{ backgroundColor: color === selectedColor ? color : 'transparent' }}
                >
                  {color}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className='text-xl font-bold'>Material:</h4>
            <p className='ml-20'>{product.material}</p>
          </div>
          <div>
            <h4 className='text-xl font-bold'>Brand:</h4>
            <p className='ml-20 text-3xl font-bold'>{product.brand}</p>
          </div>
          <div>
            <h4 className='text-xl font-bold'>Stock:</h4>
            <p className='ml-20 font-bold'>{product.stock} pcs</p>
          </div>

          {/* Quantity Selector */}
          <div className='flex items-center gap-5'>
            <button onClick={decreaseQuantity} className='bg-gray-200 px-3 py-1 rounded'>-</button>
            <span className='text-xl font-bold'>{quantity}</span>
            <button 
              onClick={increaseQuantity} 
              className={`bg-gray-200 px-3 py-1 rounded ${quantity >= product.stock ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={quantity >= product.stock} // Disable button if at stock limit
            >
              +
            </button>
          </div>

          <AddToCartButton
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            quantity={quantity} 
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
