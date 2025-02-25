import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import productService from '../appwrite/Product'
import { Container, ProductCard } from '../Index'

function CartProducts() {
    const [product, setProduct] = useState([])
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        async function CartProducts() {
            try {

                const response = await productService.getCartProducts(userData.$id)
                if (response?.documents && response.documents.length > 0) {
                    setProduct(response.documents)
                }
                else {
                    setProduct([])
                }

            } catch (error) {
                console.log(error)
            }
        }
        if ( userData.$id) {
            CartProducts()
        }
    }, [ userData.$id])

    const removeFromCart= async (cartID) => {
        try {
            const response = await productService.removeCartProduct(cartID)
            if (response) {
                console.log('removed from cart')
                setProduct((prev) => prev.filter((product) => product.$id !== cartID))
            }
            return  response;
        } catch (error) {
            console.log(error)
        }
    }

    const calculateTotal = () => {
        return product.reduce((total, item) => total + parseFloat(item.price), 0);
      };
    return (
        <div className=' w-full'>
            <div className='w-full'>
            <Container>
                {
                    product.length == 0 ? (
                        <h3> no product added to cart</h3>
                    ) : (
                        <div className='flex flex-wrap gap-5 '>
                            {
                                product.map((product) => (
                                    <div key={product.$id} className='flex flex-col p-2'>
                                        <ProductCard
                                            $id={product.$id}
                                            title={product.title}
                                            price={product.price}
                                            productImage={product.productImage}
                                        />
                                        <button className='py-2 px-3 rounded-lg bg-red-300 hover:bg-red-500' onClick={() =>removeFromCart(product.$id)}>remove from cart</button>
                                    </div>
                                ))
                            }
                            
                        </div>
                    )
                }
            </Container>
        </div>
        <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow-lg w-full border-t-2">
              <h2 className="text-xl font-bold">
                Total Amount: ₹{calculateTotal().toFixed(2)}
              </h2>
            </div>
        </div>
        
    )
}

export default CartProducts