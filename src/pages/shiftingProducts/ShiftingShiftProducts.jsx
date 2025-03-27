import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import shiftAuthService from '../../appwrite/ShiftAuthService'

function ShiftingShiftProducts() {
    const [shiftProduct, setShiftProduct] = useState([])
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        const acceptedShiftProducts = async () => {
            try {
                const agencyID = userData.$id
                const response = await shiftAuthService.listAcceptedShiftProducts(agencyID)
                if (response?.documents && response.documents.length > 0) {
                    setShiftProduct(response.documents)
                } else {
                    setShiftProduct([])
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (userData) {
            acceptedShiftProducts()
        }
    }, [userData])

    const deleteShiftProduct = async (productID) => {
        try {
            await shiftAuthService.deleteAcceptedShiftProducts(productID);
            setShiftProduct((prevProducts) => prevProducts.filter((product) => product.$id !== productID));
        } catch (error) {
            console.error("Error deleting shift product:", error);
        }
    };

    return (
        <div className="w-full py-6 bg-gray-50 flex flex-col items-center min-h-[80vh]">
            {shiftProduct.length === 0 ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <h3 className="text-center text-gray-500 text-2xl font-semibold">No shift products available</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                    {shiftProduct.map((product) => (
                        <div key={product.$id} className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105 w-full min-w-[300px] max-w-sm">
                            <h2 className='font-semibold text-xl mt-3 text-gray-800'>Shift Details</h2>
                            <div className='flex gap-2'>
                                <h2 className='font-medium'>Pickup Address:</h2>
                                <h2 className=''>{product.pickupAddress}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h2 className='font-medium'>Drop Address:</h2>
                                <h2 className=''>{product.dropAddress}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h2 className='font-medium'>Shift Type:</h2>
                                <h2 className=''>{product.shiftType}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h2 className='font-medium'>Vehicle:</h2>
                                <h2 className=''>{product.shiftVehicle}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <h2 className='font-medium'>Phone:</h2>
                                <h2 className=''>{product.userPhone}</h2>
                            </div>
                            <button
                                onClick={() => deleteShiftProduct(product.$id)}
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

export default ShiftingShiftProducts