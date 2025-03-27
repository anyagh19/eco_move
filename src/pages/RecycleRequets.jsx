import React, { useEffect, useState } from 'react'
import recycleAuthService from '../appwrite/RecycleAuth'
import { Link } from 'react-router-dom'
import { Container } from '../Index'
import { toast } from 'react-toastify'

function RecycleRequests() {
    const [loading, setLoading] = useState(true)
    const [recycleProducts, setRecycleProducts] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRecycleProducts = async () => {
            try {
                const response = await recycleAuthService.listRecycleProducts()
                setRecycleProducts(response?.documents || [])
            } catch (error) {
                console.error('Error fetching recycle products:', error)
                setError(error.message || 'Error fetching products')
            } finally {
                setLoading(false)
            }
        }
        fetchRecycleProducts()
    }, [])

    const acceptRequest = async (product) => {
        try {
            console.log("Accepting request for product:", product)

            if (!product?.$id) {
                console.error("Invalid product ID:", product)
                return
            }

            const agency = await recycleAuthService.getCurrentRecycleAgency()
            if (!agency || !agency.$id) {
                console.error("Agency not found!")
                return
            }

            const existingProduct = await recycleAuthService.getRecycleProduct(product.$id)
            if (!existingProduct) {
                console.warn("Product not found in database!")
                return
            }

            await recycleAuthService.acceptedRecycleProducts({
                agencyID: agency.$id,
                productID: product.$id,
                title: product.title,
                category: product.category,
                weight: product.weight,
                pickupAddress: product.pickupAddress,
                productImage: product.productImage,
            })

            await recycleAuthService.deleteRecycleProduct(product.$id)
            setRecycleProducts((prev) => prev.filter((p) => p.$id !== product.$id))
            toast.success('Request accepted successfully!', { position: 'top-center' })

        } catch (error) {
            console.error("Error accepting request:", error)
            toast.error('Failed to accept request.', { position: 'top-center' })
        }
    }

    return (
        <div className="w-full min-h-[80vh] flex flex-col justify-center items-center bg-gray-50 py-6">
            <Container>
                {loading ? (
                    <div className="text-center text-lg font-medium">Loading products...</div>
                ) : error ? (
                    <div className="text-center text-red-500 text-lg font-medium">Error: {error}</div>
                ) : recycleProducts.length === 0 ? (
                    <div className="flex justify-center items-center min-h-[60vh]">
                        <h3 className="text-center text-gray-500 text-2xl font-semibold">No recycling requests available</h3>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-8 justify-center">
                        {recycleProducts.map((product) => (
                            <div key={product.$id} className="p-3 shadow-lg rounded-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105 w-[280px]">
                                <Link to={`/${product.$id}`} className="block">
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
                                    <h2 className='font-medium text-lg break-words whitespace-normal'>
                                        Address: {product.pickupAddress}
                                    </h2>
                                </Link>
                                <button
                                    onClick={() => acceptRequest(product)}
                                    className='mt-3 w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg font-medium transition'
                                >
                                    Accept Request
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default RecycleRequests
