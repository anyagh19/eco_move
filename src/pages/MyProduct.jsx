import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import productService from '../appwrite/Product'
import { Container, ProductCard } from '../Index'
import { Link } from 'react-router-dom'

function MyProduct() {
  const [product, setProduct] = useState([])
  const userData = useSelector((state) => state.auth.userData)
  console.log(userData)

  useEffect(() => {
    async function fetchUserProduct() {
      try {
        const response = await productService.ListUsersProduct(userData.$id)
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
      fetchUserProduct()
    }
  }, [userData])

  const deleteProduct = async (productID) => {
    try {
      const delResponse = await productService.deleteProduct(productID)
      if (delResponse) {
        setProduct((prev) => prev.filter((product) => product.$id !== productID))
      }
      return delResponse;
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full p-6'>
      <Container>
        {product.length === 0 ? (
          <h3 className="text-center text-gray-500">No products found for this category.</h3>
        ) : (
          <div className="flex flex-wrap gap-5 items-center">
            {product.map((product) => (
              <div key={product.$id}>
                <ProductCard
                  $id={product.$id}
                  title={product.title}
                  price={product.price}
                  productImage={product.productImage}
                />
                <div className='flex gap-5 '>
                  <Link to={`/edit-product/${product.$id}`} state={{product}} >
                    <button className='bg-green-300 hover:bg-green-500 py-2 px-4'>Update</button>
                  </Link>

                  <button onClick={() => deleteProduct(product.$id)} className='bg-red-300 hover:bg-red-500 py-2 px-4'>Delete</button>

                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default MyProduct