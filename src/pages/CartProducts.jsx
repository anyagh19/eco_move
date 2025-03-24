import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productService from '../appwrite/Product'
import { Container, ProductCard } from '../Index'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function CartProducts() {
    const [product, setProduct] = useState([])
    const userData = useSelector((state) => state.auth.userData)
   
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
        if (userData) {
            CartProducts()
        }
    }, [userData])

    const removeFromCart = async (cartID) => {
        try {
            const response = await productService.removeCartProduct(cartID)
            if (response) {
                console.log('removed from cart')
                setProduct((prev) => prev.filter((product) => product.$id !== cartID))
                // dispatch(removeFromCart(cartID));

                //dispatch(removeFromCart()); 
            }
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    const calculateTotal = () => {
        return product.reduce((total, item) => total + parseFloat(item.price), 0);
    };

    const placeOrder = async () => {
        try {
            
            
            await Promise.all(product.map(async (item) => {
                await productService.addToOrders(
                    userData.$id,     // User ID
                    item.$id,         // Product ID
                    item.title,       // Product Title
                    item.productImage,
                    parseFloat(item.price),
                    new Date().toISOString()
                );
            }));
            
            await productService.removeAllFromCart(userData.$id)

            setProduct([])
            toast.success('Thanks for Buying' , {position: 'top-center'})
        } catch (error) {
            console.log(error)
        }
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
                                            <button className='py-2 px-3 rounded-lg bg-red-300 hover:bg-red-500' onClick={() => removeFromCart(product.$id)}>remove from cart</button>
                                        </div>
                                    ))
                                }

                            </div>
                        )
                    }
                </Container>
            </div>
            <div className="mt-5 p-4  rounded-lg shadow-lg w-full border-t-2 flex items-center justify-between px-5">
                <h2 className="text-xl font-bold">
                    Total Amount: ₹{calculateTotal().toFixed(2)}
                </h2>
                <button onClick={placeOrder} className='py-2 px-5 bg-red-400 rounded text-xl font-bold '>BUY {calculateTotal().toFixed(2)}</button>
            </div>
        </div>

    )
}

export default CartProducts