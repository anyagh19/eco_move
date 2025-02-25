import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../appwrite/Product';
import { Button } from '../Index';
import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct = await productService.getProduct(id);
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, [id]);

  const addWish = async () => {
    try {
      if (userData && product) {
        const imageToSave = product.productImage ? product.productImage : null;
        const response = await productService.addToWishlist(
          userData.$id,
          id,
          product.title,
          product.price,
          new Date().toISOString(),
          imageToSave,

        )
        if (response) {
          console.log('added')
        }
        return response;
      }

    } catch (error) {
      console.log(error)
    }
  }

  const addCart = async () => {
    try {
      if (userData && product) {
        const response = await productService.addToCart(
          userData.$id,
          id,
          product.title,
          product.productImage,
          product.price,
          new Date().toISOString()
        )
        if (response) {
          console.log('added to cart')
        }
        return response;
      }
    } catch (error) {
      console.log(error)
    }
  }

  //console.log("Product Image Before Adding to Wishlist: ", product.productImage);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 flex gap-7">
      <div>
        <img
          src={productService.getProductFilePreview(product.productImage)}
          alt={product.title}
          className='w-[400px] h-[500px] object-covera'
        />
      </div>
      <div className='flex flex-col gap-6'>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        {/* <p>{product.description}</p> */}
        <div dangerouslySetInnerHTML={{ __html: product.description }} />

        <p className='font-semibold text-2xl'>₹{product.price}</p>

        <div className='flex gap-7 '>
          <button onClick={addCart} className='py-3 px-7 rounded bg-red-500 mr-1 flex gap-2 hover:bg-red-400 font-medium'><ShoppingCart/>Add to Cart</button>
          <button onClick={addWish} className='border border-gray-200 py-3 px-7 rounded hover:border-gray-500 font-medium'>❤️ add to wishlist</button>

        </div>
      </div>

    </div>
  );
}

export default ProductPage;
