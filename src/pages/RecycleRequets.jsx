import React, { useEffect, useState } from 'react';
import recycleAuthService from '../appwrite/RecycleAuth';
import { Link } from 'react-router-dom';
import { Button } from '../Index';

function RecycleRequets() {
    const [loading, setLoading] = useState(true);
    const [recycleProduct, setRecycleProduct] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('Fetching recycle products...');
        recycleAuthService.listRecycleProducts()
            .then((response) => {
                if (response?.documents) {
                    setRecycleProduct(response.documents);
                } else {
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
    }, []);

    const acceptRequets = async (product) => {
        try {
            console.log("Accepting request for product:", product);

            if (!product?.$id) {
                console.error("Invalid product ID:", product);
                return;
            }

            const agency = await recycleAuthService.getCurrentRecycleAgency();
            if (!agency || !agency.$id) {
                console.error("Agency not found!", agency);
                return;
            }

            const agencyID = agency.$id;
            console.log("Agency ID:", agencyID);

            // Check if product exists before accepting
            const existingProduct = await recycleAuthService.getRecycleProduct(product.$id);
            if (!existingProduct) {
                console.warn("Product not found in database!");
                return;
            }

            await recycleAuthService.acceptedRecycleProducts({
                agencyID,
                productID: product.$id,
                title: product.title,
                category: product.category,
                weight: product.weight,
                pickupAddress: product.pickupAddress,
                productImage: product.productImage,
            });

            await recycleAuthService.deleteRecycleProduct(product.$id);
            setRecycleProduct((prev) => prev.filter((p) => p.$id !== product.$id));

            console.log("Product accepted and removed from UI.");
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (recycleProduct.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div className="w-full py-6">
            <div className="flex flex-wrap gap-8">
                {recycleProduct.map((product) => (
                    <div key={product.$id} className="gap-10 p-3">
                        <div className='w-[250px] p-3 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
                            <Link to={`/${product.$id}`}>
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
                            </Link>
                            <button onClick={() => acceptRequets(product)} className='bg-red-300 px-5 py-3 rounded-xl hover:bg-red-500 text-lg font-medium'>accept</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecycleRequets;
