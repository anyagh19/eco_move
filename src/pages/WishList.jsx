import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import productService from '../appwrite/Product'
import { Container, ProductCard } from '../Index'
import { toast } from 'react-toastify'

function WishList() {
  const [products, setProducts] = useState([])
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await productService.getWishlistProducts(userData?.$id)
        setProducts(response?.documents || [])
      } catch (error) {
        console.error('Error fetching wishlist products:', error)
      }
    }

    if (userData?.$id) {
      fetchWishlistProducts()
    }
  }, [userData?.$id])

  const removeFromWishlist = async (wishlistID) => {
    try {
      const response = await productService.deleteWishlistProduct(wishlistID)
      if (response) {
        setProducts((prev) => prev.filter((product) => product.$id !== wishlistID))
        toast.info('Removed from wishlist', { position: 'top-center' })
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }

  return (
    <div className="w-full bg-gray-50">
      <Container>
        {products.length === 0 ? (
          <h3 className="text-center text-gray-500 text-lg">No products found in Wishlist.</h3>
        ) : (
          <div className="flex flex-wrap gap-6">
            {products.map((product) => (
              <div key={product.$id} className="flex flex-col items-center p-2">
                <ProductCard
                  $id={product.$id}
                  title={product.title}
                  price={product.price}
                  productImage={product.productImage}
                />
                <button
                  className="mt-2 py-2 px-4 rounded-lg bg-red-400 text-white hover:bg-red-500 transition"
                  onClick={() => removeFromWishlist(product.$id)}
                >
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default WishList
