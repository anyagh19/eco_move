import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import productService from '../appwrite/Product';
import authService from '../appwrite/Auth';
import { Container, ProductCard } from '../Index';
import { toast } from 'react-toastify';

const RAZORPAY_KEY_ID = 'rzp_test_kxwK4KltT9lbKS';

function CartProducts() {
    const [products, setProducts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const [address, setAddress] = useState({});
    const [villages, setVillages] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const user = await authService.getCurrentUser();
                const userID = user?.$id;

                if (!userID) {
                    throw new Error("User not logged in");
                }

                // Fetch cart products
                const response = await productService.getCartProducts(userID);
                setProducts(response?.documents || []);

                // Fetch user address
                const userAddress = JSON.parse(user?.prefs?.address || '{}');
                setAddress(userAddress);
            } catch (error) {
                console.error('Error fetching cart products:', error);
                toast.error('Error fetching cart products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (userData) {
            fetchCartProducts();
        }
    }, [userData]);

    const removeFromCart = async (cartID) => {
        try {
            await productService.removeCartProduct(cartID);
            setProducts((prev) => prev.filter((product) => product.$id !== cartID));
            toast.info('Removed from cart', { position: 'top-center' });
        } catch (error) {
            console.error('Error removing from cart:', error);
            toast.error('Failed to remove product. Please try again.');
        }
    };

    const calculateTotal = () => {
        return products.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePaymentSuccess = async () => {
    try {
        const user = await authService.getCurrentUser();
        const userID = user?.$id;

        if (!userID || userID.length > 36 || /[^a-zA-Z0-9._-]/.test(userID)) {
            throw new Error("Invalid user ID for permissions");
        }

        await Promise.all(
            products.map((item) =>
                productService.addToOrders(
                    userID,               // userID
                    item.$id,             // productID
                    item.title,           // title
                    item.productImage,    // productImage
                    item.price            // price
                )
            )
        );
        
        await productService.removeAllFromCart(userID);
        setProducts([]);
        toast.success('🎉 Payment Successful!', { position: 'top-center' });
    } catch (error) {
        console.error('Payment processing error', error);
        toast.error('Payment Failed. Try again!');
    }
};


    const handleProceedToPayment = async () => {
        const isScriptLoaded = await loadRazorpayScript();

        if (!isScriptLoaded) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const totalAmount = calculateTotal() * 100; // Convert to paise

        const options = {
            key: RAZORPAY_KEY_ID,
            amount: totalAmount,
            currency: 'INR',
            name: 'FarmFresh',
            description: 'Payment for your farm products',
            image: '/logo.png',
            handler: handlePaymentSuccess,
            prefill: {
                name: userData?.name,
                email: userData?.email,
            },
            notes: {
                address: JSON.stringify(address),
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <Container>
                {loading ? (
                    <h3 className="text-center text-gray-600 text-lg">Loading cart products...</h3>
                ) : products.length === 0 ? (
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
