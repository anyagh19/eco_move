import React, { useEffect, useState } from 'react'
import { Container, ProductCard } from '../Index'
import { useSelector } from 'react-redux'
import productService from '../appwrite/Product'

function Orders() {
  const [orders, setOrders] = useState([])
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await productService.getOrderedProducts(userData?.$id)
        if (response?.documents) {
          setOrders(response.documents)
        } else {
          setOrders([])
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    if (userData) {
      fetchOrders()
    }
  }, [userData])

  return (
    <div className="w-full bg-gray-50">
      <Container>
        <div className="flex flex-wrap gap-6">
          {orders.length > 0 ? (
            orders.map((product) => (
              <ProductCard
                key={product.$id}
                $id={product.$id}
                title={product.title}
                price={product.price}
                productImage={product.productImage}
              />
            ))
          ) : (
            <p className="text-gray-500 text-lg">No orders found.</p>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Orders
