import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import productService from '../appwrite/Product'
import { Container , ProductCard } from '../Index'


function WishList() {
  const [product, setProduct] = useState([])
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    async function WishlistProducts() {
      try {
        const response = await productService.getWishlistProducts(userData.$id)
        if (response?.documents && response.documents.length > 0) {
          setProduct(response.documents)
        }
        else {
          setProduct([])
        }
      } 
      catch (error) {
        console.log(error)
      }
    
    }
    if (userData.$id) {
      WishlistProducts()
    }
  }, [userData.$id])

  const removeWish = async (wishlistID) => {
    try {
      const response = await productService.deleteWishlistProduct(wishlistID)
      if(response){
        console.log('removed')
        setProduct((prevProducts) =>
          prevProducts.filter((product) => product.$id !== wishlistID)
        );
      }
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full'>
      <Container>
        {
          product.length == 0 ? (
            <h3 className="text-center text-gray-500">No products found for Wishlist.</h3>
          ) : (
            <div className='flex flex-wrap gap-5'>
              {product.map((product) => (
                <div key={product.$id} className=' flex items-center flex-col p-2'>
                  
                  <ProductCard
                    $id={product.$id}
                    title={product.title}
                    price={product.price}
                    productImage={product.productImage}
                  />
                  <button className='py-2 px-3 rounded-lg bg-red-300 hover:bg-red-500' onClick={() => removeWish(product.$id)}>Remove from wishlist</button>
                </div>
              ))}
            </div>
          )
        }
      </Container>
    </div>
  )
}

export default WishList