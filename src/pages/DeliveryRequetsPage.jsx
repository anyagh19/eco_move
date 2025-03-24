import React,{useState , useEffect} from 'react'
import shiftAuthService from '../appwrite/ShiftAuthService'
import { Link } from 'react-router-dom'
import shiftDeliveryAuthService from '../appwrite/ShiftDeliveryAuthService'
//import shiftAuthService from '../appwrite/ShiftAuthService'


function DeliveryRequetsPage() {
  const [loading, setLoading] = useState(true)
  const [deliveryProducts, setDeliveryProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    shiftAuthService.listDeliveryProducts()
      .then((response) => {
        if (response?.documents) {
          setDeliveryProducts(response.documents)
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

  const acceptedDeliveryRequets = async (product) => {
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

      const existingProduct = await shiftAuthService.getDeliveryProduct(product.$id)
      if (!existingProduct) {
        console.warn("Product not found in database!");
        return;
      }

      await shiftDeliveryAuthService.acceptedDeliveryProducts({

        productID: product.$id,
        agencyID,
        title: product.title,
        //price: product.price,
        productImage: product.productImage,
      }
      )

      await shiftAuthService.deleteDeliveryProduct(product.$id);
      setDeliveryProducts((prev) => prev.filter((p) => p.$id !== product.$id));

      console.log("Product accepted and removed from UI.");

    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (deliveryProducts.length === 0) {
    return <div>No products available</div>;
  }
  return (
    <div className="w-full py-6">
      <div className="flex flex-wrap gap-8">
        {deliveryProducts.map((product) => (
          <div key={product.$id} className="gap-10 p-3">
            <div className='w-[250px] p-3 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
              <Link to={`/${product.$id}`}>
                <div className="flex">
                  <img
                    src={shiftAuthService.getProductFilePreview(product.productImage)}
                    alt={product.title}
                    className="rounded-xl object-fill object-center h-[300px] w-full"
                  />
                </div>
                <h2 className='font-medium text-xl'>{product.title}</h2>
                {/* <h1 className='font-semibold text-lg'>Category: {product.category}</h1> */}
                {/* <h2 className='font-medium text-xl'>Weight: {product.price}</h2> */}
                {/* <h2 className='font-medium text-xl'>Address: {product.pickupAddress}</h2> */}
              </Link>
              <button onClick={() => acceptedDeliveryRequets(product)} className='bg-red-300 px-5 py-3 rounded-xl hover:bg-red-500 text-lg font-medium'>accept</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeliveryRequetsPage