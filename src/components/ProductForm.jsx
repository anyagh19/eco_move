import React, { useEffect, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import productService from '../appwrite/Product'
import { Input, Button, RTE, Select } from '../Index'
import { toast } from 'react-toastify'


function ProductForm({ product }) {
    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: product?.title || '',
            description: product?.description || '',
            category: product?.category || '',
            price: product?.price || '',
            productImage: product?.productImage || '',
            //    productID: product?.productID || '',
            status: product?.status || 'active',
        }
    })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const userData = useSelector((state) => state.auth.userData)
    
    

    
    const resetForm = () => {
        setValue('title', '');
        setValue('description', '');
        setValue('category', '');
        setValue('price', '');
        setValue('status', 'active');
        setFile(null);
    };

    const submit = async (data) => {
        if (isSubmitting) return; // Prevent duplicate submissions
        setIsSubmitting(true);
        try {
            console.log('Form data:', data); // Log form data
            if (!userData?.$id) {
                console.error("User not authenticated.");
                return;
            }

            let fileID = null;

            if (file) {
                console.log('Uploading file...'); // Log file upload
                const uploadedFile = await productService.uploadProductFile(file, userData.$id);
                fileID = uploadedFile.$id;
                console.log('File uploaded with ID:', fileID); // Log file ID
            }

            if (product) {
                console.log('Updating product...'); // Log product update
                if (fileID) {
                    await productService.deleteProductFile(product.productImage);
                }

                const dbProduct = await productService.updateProduct(product.$id, {
                    ...data,
                    productImage: fileID || product.productImage,
                    price: parseFloat(data.price),

                });

                if (dbProduct) {
                    console.log('Product updated:', dbProduct); // Log updated product
                    navigate(`/product/${dbProduct.$id}`);
                }
            } else {

                console.log('Creating product...'); // Log product creation
                const dbProduct = await productService.createProduct({
                    ...data,
                    status: 'active',
                    productImage: fileID,
                    userID: userData.$id,
                    price: parseFloat(data.price),
                    //documentID: ID.unique(), 
                });

                if (dbProduct) {
                    console.log('Product created:', dbProduct); // Log created product
                    navigate(`/product/${dbProduct.$id}`);


                }
                if (dbProduct) {
                    console.log('Product created:', dbProduct);
                    navigate(`/product/${dbProduct.$id}`);
                    // Clear form after successful submission
                    toast.success("Product Added Succesfully!" , {position: 'top-center'})
                    resetForm();
                }

            }
        } catch (error) {
            console.error('Error in submit:', error); // Log errors
        }
        finally {
            setIsSubmitting(false);
            console.log("Submitting data:", data);
            delete data.$id;
            delete data.productID;
        }
    };

    
    
    return (
        <form onSubmit={handleSubmit(submit)} className='flex w-full gap-4'>
            <div className='w-[55%] px-4 py-7 gap-5 flex flex-col min-h-screen'>
                <Input
                    label='Title:'
                    type='text'
                    placeholder='enetr title'
                    className='border px-10 py-3 w-full'
                    {...register('title', {
                        required: true
                    })}
                />
                <Select
                    options={['furniture', 'electronics', 'others']}
                    label="Category"
                    className="mb-4  px-10 py-3 w-full"
                    placeholder='choose category'
                    {...register("category", { required: true })}
                />
                
                <RTE
                    label='description'
                    name='description'
                    className='border-2'
                    control={control}
                    defaultValue={getValues('description')}
                />
            </div>
            <div className='w-[45%] px-4 py-7 gap-5 flex flex-col'>
                <Input
                    label="Product Image :"
                    type="file"
                    className="mb-4  px-10 py-3 w-full"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                // {...register("image", { required: !product })}
                />
                {product?.productImage ? (
                    <div className="w-full mb-4">
                        <img
                            src={productService.getProductFilePreview(product.productImage)}
                            alt={product.title}
                            className="rounded-lg"
                        />
                    </div>
                ) : (
                    <p className="text-gray-500">No preview available</p>
                )}
                <Input
                    label='Price'
                    type='float'
                    placeholder='enetr price'
                    className='border  px-10 py-3 w-full'
                    {...register('price', {
                        required: true
                    })}
                />
                <Input 
                label='address'
                type='text'
                placeholder='enter address(House No , building, Street Area - Town/Locality - City/District - State - Pincode)'
                className='border  px-10 py-3 w-full h-[200px]'
                {...register('address', {
                    required: true
                })}
                />
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4  px-10 py-3 w-full "
                    {...register("status", { required: true })}
                />
                <Button type="submit" disabled={isSubmitting} bgColor={product ? 'bg-red-300' : undefined} className="w-full bg-red-300">
                    {product ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default ProductForm

