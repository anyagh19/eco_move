import React, { useEffect, useState } from 'react'
import productService from '../appwrite/Product'
import { Container, ProductCard } from '../Index';
import { useParams } from 'react-router-dom';

function CategoryProduct() {
    const [product, setProduct] = useState([])
    const { category } = useParams();

    useEffect(() => {
        async function fetchCategoryProduct() {
            try {
                const response = await productService.listProductByCategory(category.toLocaleLowerCase());
                if (response?.documents && response.documents.length > 0) {
                    console.log('fetched category product', response.documents)
                    setProduct(response.documents)
                }
                else {
                    setProduct([]);
                }
            }
            catch (error) {
                console.error('Error category fetching products:', error);
            }
        }
        if (category) {
            fetchCategoryProduct()
        }
    }, [category])

    return (
        <div className='w-full p-6'>
            <Container>
                {product.length === 0 ? (
                    <h3 className="text-center text-gray-500">No products found for this category.</h3>
                ) : (
                    <div className="flex flex-wrap gap-5">
                        {product.map((product) => (
                            <div key={product.$id}>
                                <ProductCard
                                    $id={product.$id}
                                    title={product.title}
                                    price={product.price}
                                    productImage={product.productImage}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default CategoryProduct