import React, { useEffect, useState } from 'react'
import shiftAuthService from '../appwrite/ShiftAuthService'
import { Link } from 'react-router-dom'

function DonationRequetsPage() {
  const [loading, setLoading] = useState(true)
  const [donationProducts, setDonationProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    shiftAuthService.listDonationProducts()
      .then((response) => {
        if (response?.documents) {
          setDonationProducts(response.documents)
        }
        else {
          console.warn('No documents found in response');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(error.message || 'Error fetching products');
      })
      .finally(() => {
        console.log('Fetch completed');
        setLoading(false);
      });
  }, [])

  const acceptedDonationRequets = async (product) => {
    try {
      if (!product?.$id) {
        console.error("Invalid product ID:", product);
        return;
      }

      const agency = await shiftAuthService.getCurrentShiftingAgency()
      if (!agency || !agency.$id) {
        console.error("Agency not found!", agency);
        return;
      }

      const agencyID = agency.$id;
      console.log("Agency ID:", agencyID);

      const existingProduct = await shiftAuthService.getDonationProduct(product.$id)
      if (!existingProduct) {
        console.warn("Product not found in database!");
        return;
      }

      await shiftAuthService.acceptedDonationProducts({
        productID: product.$id,
        agencyID,
        title: product.title,
        category: product.category,
        description: product.description,
        productImage: product.productImage,
        pickupAddress: product.pickupAddress,
      })

      await shiftAuthService.deleteDonationProduct(product.$id);
      setDonationProducts((prev) => prev.filter((p) => p.$id !== product.$id));

      console.log("Product accepted and removed from UI.");

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full py-6 bg-gray-50 flex flex-col items-center min-h-[80vh]">
      {loading ? (
        <div className="text-center text-lg font-medium">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg font-medium">Error: {error}</div>
      ) : donationProducts.length === 0 ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <h3 className="text-center text-gray-500 text-2xl font-semibold">No products available</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {donationProducts.map((product) => (
            <div key={product.$id} className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105 w-full max-w-sm">
              <div className="flex justify-center">
                <img
                  src={shiftAuthService.getProductFilePreview(product.productImage)}
                  alt={product.title}
                  className="rounded-xl object-cover w-[300px]"
                />
              </div>
              <h2 className='font-semibold text-xl mt-3'>{product.title}</h2>
              <div className='flex gap-2'><h1 className='font-medium text-lg'>Category:</h1><h2>{product.category}</h2></div>
              <div className='flex gap-2'><h1 className='font-medium text-lg'>Description:</h1><h2>{product.description}</h2></div>
              <div className='flex gap-2'><h1 className='font-medium text-lg'>Address:</h1><h2>{product.pickupAddress}</h2></div>
              <button onClick={() => acceptedDonationRequets(product)} className='w-full mt-3 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg font-medium transition'>Accept</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DonationRequetsPage