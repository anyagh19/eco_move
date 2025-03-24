import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import recycleAuthService from '../appwrite/RecycleAuth'

function AcceptedRecycleRequets() {
    const[acceptedRequets , setAcceptedRequets] = useState([])
    const[loading , setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)
    
    useEffect(() => {
        const acceptedProducts = async() => {
            try {
                const agencyId = userData.$id
                const response =await recycleAuthService.listAcceptedRecycleRequets(agencyId)
                if(response?.documents && response.documents.length > 0){
                    setAcceptedRequets(response.documents)
                }
                else{
                    setAcceptedRequets([])
                }
            } catch (error) {
                throw error
            }
        }
        if(userData){
            acceptedProducts()
        }
    } , [userData])
  return (
    <div className="w-full py-6">
            <div className="flex flex-wrap gap-8">
                {acceptedRequets.map((product) => (
                    <div key={product.$id} className="gap-10 p-3">
                        <div className='w-[250px] p-3 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
                            
                                <div className="flex">
                                    <img
                                        src={recycleAuthService.getProductFilePreview(product.productImage)}
                                        alt={product.title}
                                        className="rounded-xl object-fill object-center h-[300px] w-full"
                                    />
                                </div>
                                <h2 className='font-medium text-xl'>{product.title}</h2>
                                <h1 className='font-semibold text-lg'>Category: {product.category}</h1>
                                <h2 className='font-medium text-xl'>Weight: {product.weight}</h2>
                                <h2 className='font-medium text-xl'>Address: {product.pickupAddress}</h2>
                           
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default AcceptedRecycleRequets