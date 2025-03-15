// import React, {useState, useEffect} from "react";
// import productService from "../appwrite/Product";
// import { Container, ProductCard } from "../Index";

// function Home() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         console.log('Fetching products...');
//         productService.listActiveProduct()
//             .then((response) => {
//                 console.log('API Response:', response); // Log the response
//                 if (response?.documents) {
//                     console.log('Products found:', response.documents); // Log the documents
//                     setProducts(response.documents);
//                 } else {
//                     console.warn('No documents found in response');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error fetching products:', error); // Log the error
//                 setError(error.message || 'Error fetching products');
//             })
//             .finally(() => {
//                 console.log('Fetch completed');
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <div>Loading products...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (products.length === 0) {
//         return <div>No products available</div>;
//     }

//     return (
//         <div className="w-full  py-6 " >
//             {/* <Container> */}
//                 <div className="flex flex-wrap gap-8">
//                     {products.map((product) => (
//                         <div key={product.$id} className="gap-10  p-3">
//                             <ProductCard {...product} />
//                         </div>
//                     ))}
//                 </div>
//             {/* </Container> */}
//         </div>
//     );
// }

// export default Home;
import React from 'react'

function Home() {
  return (
    <div>Home</div>
  )
}

export default Home