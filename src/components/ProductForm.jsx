import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import productService from '../appwrite/Product';
import { Input, Button, RTE, Select } from '../Index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductForm({ product }) {
    const { register, handleSubmit, control, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: product?.title || '',
            description: product?.description || '',
            category: product?.category || '',
            price: product?.price || '',
            productImage: product?.productImage || '',
            address: product?.address || '',
            status: product?.status || 'active',
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const resetForm = () => {
        setValue('title', '');
        setValue('description', '');
        setValue('category', '');
        setValue('price', '');
        setValue('address', '');
        setValue('status', 'active');
        setFile(null);
    };

    const submit = async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        try {
            if (!userData?.$id) {
                toast.error("You need to log in first!", { position: "top-center" });
                return;
            }

            let fileID = null;
            if (file) {
                const uploadedFile = await productService.uploadProductFile(file, userData.$id);
                fileID = uploadedFile.$id;
            }

            if (product) {
                if (fileID) {
                    await productService.deleteProductFile(product.productImage);
                }
                const dbProduct = await productService.updateProduct(product.$id, {
                    ...data,
                    productImage: fileID || product.productImage,
                    price: parseFloat(data.price),
                });

                if (dbProduct) {
                    toast.success("Product Updated Successfully!", { position: "top-center" });
                    navigate(`/product/${dbProduct.$id}`);
                }
            } else {
                const dbProduct = await productService.createProduct({
                    ...data,
                    status: 'active',
                    productImage: fileID,
                    userID: userData.$id,
                    price: parseFloat(data.price),
                });

                if (dbProduct) {
                    toast.success("Product Added Successfully!", { position: "top-center" });
                    navigate(`/product/${dbProduct.$id}`);
                    resetForm();
                }
            }
        } catch (error) {
            console.error("Error in submission:", error);
            toast.error("Failed to process the request. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="w-full min-h-screen flex flex-col md:flex-row gap-6 p-8 bg-gray-50 rounded-lg shadow-md">
            <div className="flex flex-col gap-6 w-full md:w-1/2">
                <Input
                    label="Title:"
                    type="text"
                    placeholder="Enter title"
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

                <Select
                    label="Category"
                    options={["furniture", "electronics", "others"]}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3"
                    {...register("category", { required: "Category is required" })}
                />
                {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}

                <RTE
                    label="Description"
                    name="description"
                    className="border-gray-300 rounded-lg shadow-sm p-3"
                    control={control}
                    defaultValue={getValues("description")}
                    rules={{ required: "Description is required" }}
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-6">
                <Input
                    label="Product Image:"
                    type="file"
                    className="border-gray-300 rounded-lg shadow-sm p-3"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                />
                {product?.productImage ? (
                    <div className="w-full">
                        <img
                            src={productService.getProductFilePreview(product.productImage)}
                            alt={product.title}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                ) : (
                    <p className="text-gray-500">No preview available</p>
                )}

                <Input
                    label="Price"
                    type="number"
                    placeholder="Enter price"
                    className="border-gray-300 rounded-lg shadow-sm p-3"
                    {...register("price", {
                        required: "Price is required",
                        validate: value => value > 0 || "Price must be greater than 0"
                    })}
                />
                {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}

                <Input
                    label="Address"
                    type="text"
                    placeholder="Enter address (House No, Street, City, State, Pincode)"
                    className="border-gray-300 rounded-lg shadow-sm p-3 h-[150px]"
                    {...register("address", { required: "Address is required" })}
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}

                <Select
                    label="Status"
                    options={["Active", "Inactive"]}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3"
                    {...register("status", { required: "Status is required" })}
                />
                {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}

                <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
                    {isSubmitting ? "Processing..." : product ? "Update Product" : "Submit Product"}
                </Button>
            </div>
        </form>
    );
}

export default ProductForm;
