import React from 'react'; 
import Filter from './Filter/Filter';
 
const ProductCatalog = () => {
    return (
        <div className=''>
            <div className=' h-80  flex flex-col border-b justify-end   bg-[url("https://t3.ftcdn.net/jpg/06/36/44/26/360_F_636442646_II8z4yhYbPoea8P6HoimUblo6ZQXzUXY.jpg")]'>
                        
                        <div className='bg-white w-fit  p-10 rounded-lg  '>
                      <h3 className='text-4xl font-bold'>  Shop</h3>
                      <p className='mt-1 text-xl '>You don't need to approach fashion. <br /> Fashion approaches you here.
                      </p>
                        </div>
            </div>
            <div className=''>
                <div className=' border-t'>
                    <Filter></Filter> 
                </div>
            </div>
            
        </div>
    );
}
  
 
export default ProductCatalog;