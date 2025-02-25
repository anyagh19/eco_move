import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productService from '../appwrite/Product'
import { ProductCard , Container, ProductForm } from '../Index'

function EditProduct() {
    const[product , setProduct] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(id){
            productService.getProduct(id).then((product) => {
                if(product){
                    setProduct(product)
                }
            })
        }
        else{
            navigate('/')
        }
    }, [id, navigate])
    return product ? (
        <div className='py-8'>
            <Container>
                <ProductForm product={product} />
            </Container>
        </div>
      ) : null
}

export default EditProduct