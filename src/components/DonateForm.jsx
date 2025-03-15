import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import productService from '../appwrite/Product'
import Input from './Input'
import Select from './Select'
import { RTE, Button } from '../Index'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//toast.configure();

function DonateForm({ product }) {
    const { register, handleSubmit, control, getValues, setValue } = useForm({
        defaultValues: {
            title: '',
            category: '',
            description: '',
            productImage: '',
            pickupAddress: '',
        }
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const resetForm = () => {
        setValue('title', '')
        setValue('category', '')
        setValue('description', '')
        setFile(null)
        setValue('pickupAddress', '')
    }

    const submit = async (data) => {
        if (isSubmitting)
            return true;
        setIsSubmitting(true)

        try {
            console.log('foem data', data);
            if (!userData.$id) {
                console.log('user not verify')
                alert('login')
                return;
            }

            let fileID = null
            if (file) {
                console.log('uploading file');
                const uploadedFile = await productService.uploadProductFile(file, userData.$id)
                fileID = uploadedFile.$id
                console.log('file id', fileID)
            }

            if (!product) {
                console.log('donating product');
                const dbProduct = await productService.addToDonate(
                    userData.$id, // Pass user ID correctly
                    data.title,
                    data.category,
                    data.description,
                    fileID,
                    data.pickupAddress
                )

                if (dbProduct) {
                    console.log('Product donated:', dbProduct);
                    navigate(`/donate-page`);
                    toast.success("🎉 Thanks for your donation!", { position: "top-center" });
                    resetForm()
                }
            }

        } catch (error) {
            console.log('donate submit ', error);
        }
        finally {
            setIsSubmitting(false)
            console.log('submitting', data);
            //alert('Thanks for ur Donation')
        }
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='w-full min-h-screen flex gap-5 py-5 px-7'>
            <div className='flex flex-col gap-6 w-[50%]'>
                <Input
                    label='Title:'
                    type='text'
                    placeholder='enter title'
                    className='w-full border py-3 px-5 opacity-15 hover:opacity-50'
                    {...register('title', {
                        required: true
                    })}
                />
                <Select
                    label='Category'
                    options={['furniture', 'electronics', 'others']}
                    className='w-full border py-3 px-5  hover:opacity-50'
                    {...register('category', {
                        required: true
                    })}
                />
                <RTE
                    label='description'
                    name='description'
                    className='border-2'
                    control={control}
                    defaultValue={getValues('description')}
                />
            </div>
            <div className='w-[50%] flex flex-col gap-6'>
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
                    label='address'
                    type='text'
                    placeholder='enter address(House No , building, Street Area - Town/Locality - City/District - State - Pincode)'
                    className='border  px-10 py-3 w-full h-[200px]'
                    {...register('pickupAddress', {
                        required: true
                    })}
                />
                <Button type="submit" disabled={isSubmitting} bgColor={product ? 'bg-red-300' : undefined} className="w-full bg-red-300">
                    Donate
                </Button>
            </div>
        </form>
    )
}

export default DonateForm