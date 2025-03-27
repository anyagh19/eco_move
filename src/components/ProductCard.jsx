import React from "react";
import productService from "../appwrite/Product";
import { Link } from "react-router-dom";

function ProductCard({ $id, title, price, productImage }) {
    const productImageUrl = productImage
        ? productService.getProductFilePreview(productImage)
        : "/default-image.png";

    return (
        <Link to={`/product/${$id}`} className="block">
            <div className="bg-gray-100 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4 w-[260px]">
                {/* Image Section */}
                <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
                    <img
                        src={productImageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="mt-3 text-center">
                    <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
                    <h1 className="text-xl font-bold text-green-600">Rs. {price}</h1>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
