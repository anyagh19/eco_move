import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../appwrite/Product';
import { Button } from '../Index';
import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProductAndReviews() {
      const fetchedProduct = await productService.getProduct(id);
      setProduct(fetchedProduct);

      const fetchedReviews = await productService.getRating(id);
      if (fetchedReviews?.documents) {
        setReviews(fetchedReviews.documents);
      }
    }

    async function checkIfInCart() {
      if (userData) {
        const cartItems = await productService.getCartProducts(userData.$id);
        const isInCart = cartItems?.documents?.some((item) => item.productId === id);

        setIsAddedToCart(isInCart);
      }
    }

    fetchProductAndReviews();
    if (userData) {
      checkIfInCart();
    }
  }, [id, userData]);

  const addWish = async () => {
    try {
      if (userData && product) {
        const imageToSave = product.productImage || null;
        const response = await productService.addToWishlist(
          userData.$id,
          id,
          product.title,
          product.price,
          new Date().toISOString(),
          imageToSave
        );
        if (response) toast.success("Added to wishlist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        );
        if (response) {
          setIsAddedToCart(true);
          toast.success("Added to Cart");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addRate = async (e) => {
    e.preventDefault();
    try {
      if (!rate || !review.trim()) {
        toast.error("Please provide a rating and a review.");
        return;
      }

      const res = await productService.addRating({
        productID: id,
        rate: String(rate),
        review,
      });

      if (res) {
        toast.success("Review submitted!");
        setRate(0);
        setReview('');
        setShowForm(false);

        const updatedReviews = await productService.getRating(id);
        if (updatedReviews?.documents) {
          setReviews(updatedReviews.documents);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error submitting review");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
      {/* Product Image */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex-shrink-0"
      >
        <img
          src={productService.getProductFilePreview(product.productImage)}
          alt={product.title}
          className="w-full max-w-sm h-auto object-cover rounded-2xl shadow-md"
        />
      </motion.div>

      {/* Product Details */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6 w-full"
      >
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        <p className="text-2xl font-semibold text-green-700">₹{product.price}</p>

        {/* Cart & Wishlist Buttons */}
        <div className="flex flex-wrap gap-5">
          {isAddedToCart ? (
            <button disabled className="py-3 px-6 rounded-lg bg-green-500 text-white shadow-md cursor-not-allowed">
              Added to Cart
            </button>
          ) : (
            <button
              onClick={addCart}
              className="flex items-center gap-2 py-3 px-6 rounded-lg bg-red-500 hover:bg-red-400 text-white font-semibold transition-all shadow-md"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
          )}
          <button
            onClick={addWish}
            className="border border-gray-300 py-3 px-6 rounded-lg hover:border-gray-500 transition shadow-sm"
          >
            ❤️ Add to Wishlist
          </button>
        </div>

        {/* Review Toggle */}
        <div className="mt-4">
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="bg-green-400 hover:bg-green-300 text-white py-2 px-5 rounded-xl transition shadow"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <motion.form 
            onSubmit={addRate}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-4 p-5 border rounded-lg bg-white shadow space-y-4 max-w-lg"
          >
            <label>
              <span className="block mb-1 font-medium">Rating (1–5):</span>
              <select
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="block mb-1 font-medium">Your Review:</span>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                className="w-full p-2 border rounded"
                placeholder="Share your experience..."
                required
              />
            </label>

            <Button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-5 rounded-lg shadow">
              Submit Review
            </Button>
          </motion.form>
        )}

        {/* Reviews */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="space-y-4"
            >
              {reviews.map((r) => (
                <div key={r.$id} className="p-4 border rounded bg-gray-50 shadow-sm">
                  <p className="font-semibold text-yellow-600">⭐ {r.rate}</p>
                  <p className="text-gray-800">{r.review}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ProductPage;
