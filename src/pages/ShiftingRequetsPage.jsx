import React, { useEffect, useState } from 'react'
import shiftAuthService from '../appwrite/ShiftAuthService'
import { Link } from 'react-router-dom'

function ShiftingRequetsPage() {
  const [loading, setLoading] = useState(true)
  const [shiftProducts, setShiftProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    shiftAuthService.listShiftProducts()
      .then((response) => {
        if (response?.documents) {
          setShiftProducts(response.documents)
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

  const acceptedShiftingRequets = async (product) => {
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

      const existingProduct = await shiftAuthService.getShiftProduct(product.$id)
      if (!existingProduct) {
        console.warn("Product not found in database!");
        return;
      }

      await shiftAuthService.acceptedShiftProducts({
        productID: product.$id,
        agencyID,
        pickupAddress: product.pickupAddress,
        dropAddress: product.dropAddress,
        shiftType: product.shiftType,
        shiftVehicle: product.shiftVehicle,
        userPhone: product.userPhone
      })

      await shiftAuthService.deleteShiftProduct(product.$id);
      setShiftProducts((prev) => prev.filter((p) => p.$id !== product.$id));

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
      ) : shiftProducts.length === 0 ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <h3 className="text-center text-gray-500 text-2xl font-semibold">No products available</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {shiftProducts.map((product) => (
            <div key={product.$id} className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105 w-full max-w-sm">
              <Link to={`/${product.$id}`}>
                <div className="flex justify-center">
                  {/* <img
                  src={shiftAuthService.getProductFilePreview(product.productImage)}
                  alt={product.title}
                  className="rounded-xl object-cover h-[250px] w-full max-w-[300px]"
                /> */}
                </div>
                <h2 className='font-semibold text-xl mt-3 text-gray-800'>Pickup Address:</h2>
                <h2 className='text-gray-700 break-words'>{product.pickupAddress}</h2>
                <h2 className='font-semibold text-xl mt-3 text-gray-800'>Drop Address:</h2>
                <h2 className='text-gray-700 break-words'>{product.dropAddress}</h2>
                <h2 className='font-semibold text-xl mt-3 text-gray-800'>Shift Type:</h2>
                <h2 className='text-gray-700 break-words'>{product.shiftType}</h2>
                <h2 className='font-semibold text-xl mt-3 text-gray-800'>Vehicle:</h2>
                <h2 className='text-gray-700'>{product.shiftVehicle}</h2>
                <h2 className='font-semibold text-xl mt-3 text-gray-800'>Phone:</h2>
                <h2 className='text-gray-700'>{product.userPhone}</h2>
              </Link>
              <button onClick={() => acceptedShiftingRequets(product)} className='w-full mt-3 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg font-medium transition duration-300 ease-in-out'>Accept</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ShiftingRequetsPage
