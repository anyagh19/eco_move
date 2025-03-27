import React, { useState, useEffect } from "react";
import productService from "../appwrite/Product";
import { Container, ProductCard } from "../Index";

function BuyPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className="bg-gray-50 w-full">
            <Container className="bg-gray-900 text-white min-h-screen py-6">
            <h1 className="text-3xl font-bold text-center mb-8">Available Products</h1>
            <div className="flex flex-wrap justify-center gap-8">
                {products.map((product) => (
                    <div key={product.$id} className="p-3  rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>
        </Container>
        </div>
    );
}

export default BuyPage;
