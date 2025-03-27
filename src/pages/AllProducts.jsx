import React, { useEffect, useState } from 'react'
import { Container, ProductCard } from '../Index'
import productService from '../appwrite/Product'

function AllProducts() {
    const [product, setProduct] = useState([])

    // useEffect(() => { }, [])
    // productService.listActiveProduct([]).then((products) => {
    //     if (products) {
    //         setProduct(products.documents)
    //     }
    // })
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await productService.listActiveProduct();
                if (response?.documents) {
                    console.log('Fetched Products:', response.documents); // Check the whole response
                    setProduct(response.documents);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    

    return (
        <div className='w-full bg-gray-50'>
            <Container >
            <div className="">

                    {product.map((product) => (
                        <div key={product.$id}>
                            {/* <ProductCard product={product}/> */}
                            <ProductCard
                                $id={product.$id}
                                title={product.title}
                                price={product.price}
                                productImage={product.productImage}
                               
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        // <ProductCard />
    )
}

export default AllProducts