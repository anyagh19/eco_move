import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import shiftAuthService from '../../appwrite/ShiftAuthService'

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
                }
                else {
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
            // Remove deleted product from UI
            setDeliveryProduct((prevProducts) => prevProducts.filter((product) => product.$id !== productID));
        } catch (error) {
            console.error("Error deleting donation:", error);
        }
    };
    return (
        <div className="w-full py-6">
            <div className="flex flex-wrap gap-8">
                {deliveryProduct.map((product) => (
                    <div key={product.$id} className="gap-10 p-3">
                        <div className='w-[250px] p-3 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>

                            <div className="flex">
                                <img
                                    src={shiftAuthService.getProductFilePreview(product.productImage)}
                                    alt={product.title}
                                    className="rounded-xl object-fill object-center h-[300px] w-full"
                                />
                            </div>
                            <h2 className='font-medium text-xl'>{product.title}</h2>
                            {/* <h1 className='font-semibold text-lg'>Category: {product.category}</h1>
                    <h2 className='font-medium text-xl'>Description: {product.description}</h2>
                    <h2 className='font-medium text-xl'>Address: {product.pickupAddress}</h2> */}

                            <button
                                onClick={() => deleteDonation(product.$id)}
                                className='py-3 px-6 rounded-xl bg-red-400 mt-2'>
                                Complete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShiftingDeliveryProducts