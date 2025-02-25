import React from 'react'
import productService from '../appwrite/Product'
import {Link} from 'react-router-dom'

function ProductCard({$id , title , price , productImage}) {
//   console.log("Product Image ID:", productImage);
//    console.log(productService.getProductFilePreview(productImage))
   const productImageUrl = productImage
        ? productService.getProductFilePreview(productImage )
        : '/default-image.png'; 

  return (
   <Link to={`/product/${$id} `}>
    <div className='w-[250px]  p-3 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
        
        <div className="flex ">
                    <img
                        src={productImageUrl}
                        alt={title}
                        className="rounded-xl object-fill object-center h-[300px] w-full"
                    />
                </div>
        <h2 className='font-medium text-xl'>{title}</h2>
        <h1 className='font-semibold text-lg'>Rs.{price}</h1>
    </div>
   </Link>
  )
}

export default ProductCard