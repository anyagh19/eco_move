import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../appwrite/Product";
import { Container, ProductCard } from "../Index";

function BuyPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    productService.listActiveProduct()
      .then((response) => {
        if (response?.documents) {
          setProducts(response.documents);
        }
      })
      .catch((error) => {
        setError(error.message || "Error fetching products");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center text-white py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center text-gray-400 py-10">No products available</div>;
  }

  const handleBuyNow = (product) => {
    navigate("/payment", { state: { product } });
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen">
      <Container className="bg-gray-900 text-white py-6">
        <h1 className="text-3xl font-bold text- center mb-8">Available Products</h1>

        <div className="flex flex-wrap justify-center gap-8">
          {products.map((product) => (
            <div
              key={product.$id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 w-72"
            >
              {/* Product Card */}
              <ProductCard {...product} />

              {/* Buy Now Button */}
              {/* <button
                onClick={() => handleBuyNow(product)}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg w-full"
              >
                Buy Now
              </button> */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default BuyPage;
