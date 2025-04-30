import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import productService from '../appwrite/Product';
import { Container, ProductCard } from '../Index';
import { toast } from 'react-toastify';

function CartProducts() {
    const [products, setProducts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await productService.getCartProducts(userData?.$id);
                setProducts(response?.documents || []);
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };

        if (userData) {
            fetchCartProducts();
        }
    }, [userData]);

    const removeFromCart = async (cartID) => {
        try {
            const response = await productService.removeCartProduct(cartID);
            if (response) {
                setProducts((prev) => prev.filter((product) => product.$id !== cartID));
                toast.info('Removed from cart', { position: 'top-center' });
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const calculateTotal = () => {
        return products.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    const handleProceedToPayment = () => {
        navigate('/payment', {
            state: {
                fromCart: true,
                products,
                totalAmount: calculateTotal()
            }
        });
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <Container>
                {products.length === 0 ? (
                    <h3 className="text-center text-gray-600 text-lg">No products added to cart.</h3>
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
                                    onClick={() => removeFromCart(product.$id)}
                                >
                                    Remove from Cart
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </Container>

            {products.length > 0 && (
                <div className="mt-5 p-4 rounded-lg shadow-lg border-t-2 flex items-center justify-between px-5 bg-white">
                    <h2 className="text-xl font-bold">Total Amount: ₹{calculateTotal()}</h2>
                    <button
                        onClick={handleProceedToPayment}
                        className="py-2 px-6 bg-green-500 text-white rounded text-xl font-bold hover:bg-green-600 transition"
                    >
                        Proceed to Pay ₹{calculateTotal()}
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartProducts;
