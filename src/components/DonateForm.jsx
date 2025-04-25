import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import productService from "../appwrite/Product";
import Input from "./Input";
import Select from "./Select";
import { RTE, Button } from "../Index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DonateForm({ product }) {
    const agencyData = {
        "Orphanage": ["Hope for Children", "Sunrise Orphanage", "Little Angels"],
        "Old Age Home": ["Golden Years", "Silver Haven", "Elder Bliss"],
        "Others": ["Community Center A", "Shelter Home B"],
    };

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            title: "",
            category: "",
            description: "",
            productImage: "",
            pickupAddress: "",
            agencyType: "",
            selectedAgency: "",
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedType, setSelectedType] = useState("");
    const [availableAgencies, setAvailableAgencies] = useState([]);

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const resetForm = () => {
        setValue("title", "");
        setValue("category", "");
        setValue("description", "");
        setFile(null);
        setValue("pickupAddress", "");
        setValue("agencyType", "");
        setValue("selectedAgency", "");
        setSelectedType("");
        setAvailableAgencies([]);
    };

    const handleAgencyTypeChange = (e) => {
        const type = e.target.value;
        setSelectedType(type);
        setValue("agencyType", type);
        setAvailableAgencies(agencyData[type] || []);
        setValue("selectedAgency", ""); // reset specific agency on type change
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

            if (!product) {
                const dbProduct = await productService.addToDonate(
                    userData.$id,
                    data.title,
                    data.category,
                    data.description,
                    fileID,
                    data.pickupAddress,
                    data.agencyType,
                    data.selectedAgency
                );

                if (dbProduct) {
                    toast.success("🎉 Thanks for your donation!", { position: "top-center" });
                    navigate(`/donate-page`);
                    resetForm();
                }
            }
        } catch (error) {
            console.error("Donation error:", error);
            toast.error("Failed to donate. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="w-full min-h-screen flex flex-col md:flex-row gap-6 p-8 bg-gray-50 rounded-lg shadow-md"
        >
            {/* Left Section */}
            <div className="flex flex-col gap-6 w-full md:w-1/2">
                <Input
                    label="Title:"
                    type="text"
                    placeholder="Enter title"
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-900 p-3"
                    {...register("title", { required: true })}
                />
                <Select
                    label="Category"
                    options={["furniture", "electronics", "others"]}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-900 p-3"
                    {...register("category", { required: true })}
                />
                <Select
                    label="Select Agency Type"
                    options={Object.keys(agencyData)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-900 p-3"
                    onChange={handleAgencyTypeChange}
                />
                {availableAgencies.length > 0 && (
                    <Select
                        label="Select Specific Agency"
                        options={availableAgencies}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-900 p-3"
                        {...register("selectedAgency", { required: true })}
                    />
                )}
                <RTE
                    label="Description"
                    name="description"
                    className="border-gray-300 rounded-lg shadow-sm p-3"
                    control={control}
                    defaultValue={getValues("description")}
                />
            </div>

            {/* Right Section */}
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
                    label="Pickup Address"
                    type="text"
                    placeholder="Enter full address (House No, Building, Street, City, State, Pincode)"
                    className="border-gray-300 rounded-lg shadow-sm p-3 h-[150px]"
                    {...register("pickupAddress", { required: true })}
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition"
                >
                    {isSubmitting ? "Donating..." : "Donate Now"}
                </Button>
            </div>
        </form>
    );
}

export default DonateForm;
