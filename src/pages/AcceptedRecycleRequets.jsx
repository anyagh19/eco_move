import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import recycleAuthService from '../appwrite/RecycleAuth'

function AcceptedRecycleRequets() {
    const [acceptedRequets, setAcceptedRequets] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)
    
    useEffect(() => {
        const acceptedProducts = async () => {
            try {
                const agencyId = userData?.$id
                const response = await recycleAuthService.listAcceptedRecycleRequets(agencyId)
                setAcceptedRequets(response?.documents || [])
            } catch (error) {
                console.error("Error fetching accepted requests:", error)
            } finally {
                setLoading(false)
            }
        }
        if (userData) {
            acceptedProducts()
        }
    }, [userData])

    const deleteRecycle = async (recycleID) => {
        try {
            await recycleAuthService.deleteAcceptedRecycleProduct(recycleID)
            setAcceptedRequets((prevProducts) => prevProducts.filter((product) => product.$id !== recycleID))
        } catch (error) {
            console.error("Error deleting recycle request:", error)
        }
    }

    return (
        <div className="w-full py-6 bg-gray-50 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {acceptedRequets.map((product) => (
                    <div key={product.$id} className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105 w-full max-w-sm">
                        <div className="flex justify-center">
                            <img
                                src={recycleAuthService.getProductFilePreview(product.productImage)}
                                alt={product.title}
                                className="rounded-xl object-cover h-[250px] w-full"
                            />
                        </div>
                        <h2 className='font-semibold text-xl mt-3'>{product.title}</h2>
                        <h1 className='font-medium text-lg text-gray-600'>Category: {product.category}</h1>
                        <h2 className='font-medium text-lg'>Weight: {product.weight} kg</h2>
                        <h2 className='font-medium text-lg break-words whitespace-pre-wrap'>Address: {product.pickupAddress}</h2>
                        <button
                            onClick={() => deleteRecycle(product.$id)}
                            className='w-full mt-3 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg font-medium transition'
                        >
                            Complete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AcceptedRecycleRequets
