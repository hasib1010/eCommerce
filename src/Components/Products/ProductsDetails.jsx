import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../AddToCartButton';
import Skeleton from '@mui/material/Skeleton';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [thumbUrl, setThumbUrl] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://e-commerce-server-alpha.vercel.app/products/clothings/${id}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setProduct(data);
        setThumbUrl(data.thumbnailImage); // Set default thumbnail
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className='container mx-auto mt-10 px-2'>
      <div className='my-5 flex flex-col lg:flex-row gap-10'>
        <div className='border w-full rounded-xl pb-10 flex-1 flex flex-col pt-10 items-center justify-start gap-20'>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={500} className="rounded-xl" />
          ) : (
            <div
              className="image-zoom"
              onMouseMove={(e) => {
                const { clientX, clientY, currentTarget } = e;
                const { offsetWidth, offsetHeight } = currentTarget;

                const xPercent = ((clientX - currentTarget.offsetLeft) / offsetWidth) * 100;
                const yPercent = ((clientY - currentTarget.offsetTop) / offsetHeight) * 100;

                const img = currentTarget.querySelector('img');
                img.style.transform = `translate(-${xPercent}%, -${yPercent}%) scale(2)`;
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                img.style.transform = 'translate(-50%, -50%) scale(1)'; // Reset zoom
              }}
            >
              <img
                src={thumbUrl}
                alt={product.name}
                className="rounded-xl object-center lg:p-12 p-10 "
              />
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} variant="rectangular" width={80} height={80} className="rounded-xl" />
              ))
            ) : (
              product.catalogImages.map((url, index) => (
                <div key={index}>
                  <img
                    onClick={() => setThumbUrl(url)}
                    className={`rounded-xl cursor-pointer lg:h-20 h-10 ${thumbUrl === url ? "border-red-300 border-2" : ""}`}
                    src={url}
                    alt=""
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className='flex-1 flex flex-col gap-10'>
          {loading ? (
            <Skeleton width="60%" height={40} />
          ) : (
            <div className='flex flex-col gap-5'>
              <h3 className='lg:text-5xl font-bold'>{product.name}</h3>
              <h4 className='lg:text-4xl font-bold text-red-500'>${parseFloat(product.price).toFixed(2)}</h4>
              <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }} />
              <div>
                <h4 className='text-xl font-bold'>Sizes:</h4>
                <ul className='flex gap-3 lg:ml-20 items-center justify-center lg:justify-start'>
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
                <ul className='flex gap-3 flex-wrap lg:ml-20'>
                  {product.colors.map(color => (
                    <li
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`cursor-pointer px-6 py-3 font-bold rounded-3xl border-2 ${color === selectedColor ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-600 border-gray-400 hover:bg-gray-300'}`}
                    >
                      {color}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='flex gap-10 lg:flex-col'>
                <div>
                  <h4 className='text-xl font-bold'>Material:</h4>
                  <p className='lg:ml-20'>{product.material}</p>
                </div>
                <div>
                  <h4 className='text-xl font-bold'>Brand:</h4>
                  <p className='lg:ml-20 text-3xl font-bold'>{product.brand}</p>
                </div>
              </div>
              <div>
                <h4 className='text-xl font-bold'>Stock:</h4>
                <p className='lg:ml-20 font-bold'>{product.stock} pcs</p>
              </div>

              {/* Quantity Selector */}
              <div className='flex items-center gap-5'>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className='bg-gray-200 px-3 py-1 rounded'>-</button>
                <span className='text-xl font-bold'>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className={`bg-gray-200 px-3 py-1 rounded ${quantity >= product.stock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={quantity >= product.stock}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
