import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import shiftAuthService from '../../appwrite/ShiftAuthService'
import productService from '../../appwrite/Product'

function ShiftingDeliveryProducts() {
    const [deliveryProduct, setDeliveryProduct] = useState([])
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        const acceptedDeliveryProducts = async () => {
            try {
                const agencyID = userData.$id
                const response = await shiftAuthService.listAcceptedDeliveryProducts(agencyID)
                if (response?.documents && response.documents.length > 0) {
                    setDeliveryProduct(response.documents)
                } else {
                    setDeliveryProduct([])
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (userData) {
            acceptedDeliveryProducts()
        }
    }, [userData])

    const deleteDonation = async (productID) => {
        try {
            await shiftAuthService.deleteAcceptedDelivryProducts(productID);
            await productService.deleteOrder(productID)
            setDeliveryProduct((prevProducts) => prevProducts.filter((product) => product.$id !== productID));
        } catch (error) {
            console.error("Error deleting donation:", error);
        }
    };

    return (
        <div className="w-full py-6 bg-gray-50 flex flex-col items-center min-h-[80vh]">
            {deliveryProduct.length === 0 ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <h3 className="text-center text-gray-500 text-2xl font-semibold">No delivery products available</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                    {deliveryProduct.map((product) => (
                        <div key={product.$id} className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105 w-full max-w-sm">
                            <div className="flex justify-center">
                                <img
                                    src={shiftAuthService.getProductFilePreview(product.productImage)}
                                    alt={product.title}
                                    className="rounded-xl object-cover h-[250px] w-full max-w-[300px]"
                                />
                            </div>
                            <h2 className='font-semibold text-xl mt-3 text-gray-800'>{product.title}</h2>
                            <button
                                onClick={() => deleteDonation(product.$id)}
                                className='w-full mt-3 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg font-medium transition duration-300 ease-in-out'>
                                Complete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ShiftingDeliveryProducts
