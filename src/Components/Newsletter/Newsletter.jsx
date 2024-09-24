import React from 'react';

const Newsletter = () => {
    return (
        <div className='px-3 mt-5 flex-col flex gap-3'>
            <h4 className='text-4xl text-center'>Join The Club</h4>
            <p className='text-base text-center'>Join & Get 15% Off On Your First Order, be the first one to know our exciting deals and offers</p>
            <div className="flex flex-col" >
                <input type="email" className='h-11 border mb-3 px-3 lg:w-1/2 lg:mx-auto' placeholder='your email' />
                <input className='bg-gray-800 rounded-xl w-fit px-16 text-2xl py-2 text-white mx-auto' type="button" value="JOIN NOW" />
            </div>
            <hr />
        </div>
    );
}


export default Newsletter;