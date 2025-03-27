import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import shiftAuthService from '../../appwrite/ShiftAuthService'

function ShiftingDonationProducts() {
    const [donationProduct, setDonationProduct] = useState([])
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        const acceptedDonationProducts = async () => {
            try {
                const agencyID = userData.$id
                const response = await shiftAuthService.listAcceptedDonationProducts(agencyID)
                if (response?.documents && response.documents.length > 0) {
                    setDonationProduct(response.documents)
                } else {
                    setDonationProduct([])
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (userData) {
            acceptedDonationProducts()
        }
    }, [userData])

    const deleteDonation = async (productID) => {
        try {
            await shiftAuthService.deleteAcceptedDonationProducts(productID);
            setDonationProduct((prevProducts) => prevProducts.filter((product) => product.$id !== productID));
        } catch (error) {
            console.error("Error deleting donation:", error);
        }
    };

    return (
        <div className="w-full py-6 bg-gray-50 flex flex-col items-center min-h-[80vh]">
            {donationProduct.length === 0 ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <h3 className="text-center text-gray-500 text-2xl font-semibold">No donation products available</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                    {donationProduct.map((product) => (
                        <div key={product.$id} className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105 h-full w-full max-w-sm">
                            <div className="flex justify-center">
                                <img
                                    src={shiftAuthService.getProductFilePreview(product.productImage)}
                                    alt={product.title}
                                    className="rounded-xl object-cover w-full max-w-[300px]"
                                />
                            </div>
                            <h2 className='font-semibold text-xl mt-3 text-gray-800'>{product.title}</h2>
                            <div className='flex gap-2'>
                                <h1 className='font-medium text-lg'>Category:</h1>
                                <h2 className=''> {product.category}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h1 className='font-medium text-lg break-words'>Description:</h1>
                                <h2 className=''>{product.description}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h2 className='font-medium text-lg break-words'>Address:</h2>
                                <h2 className=''>{product.pickupAddress}</h2>
                            </div>
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

export default ShiftingDonationProducts