import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import productService from "../appwrite/Product";
import Input from "./Input";
import Select from "./Select";
import { RTE, Button } from "../Index";
import { orphanages } from "../data/orphanages";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DonateForm() {
    const { register, handleSubmit, control, setValue, reset } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedOrphanage, setSelectedOrphanage] = useState(null);

    // Prefill the form based on the selected orphanage
    useEffect(() => {
        if (location.state?.orphanageId) {
            const orphanage = orphanages.find((o) => o.id === location.state.orphanageId);
            if (orphanage) {
                setSelectedOrphanage(orphanage);
                setValue("agencyType", "Orphanage");
                setValue("selectedAgency", orphanage.name);
                setValue("title", `Donation for ${orphanage.name}`);
                setValue("description", `Helping children at ${orphanage.name} located in ${orphanage.city}.`);
            }
        }
    }, [location.state, setValue]);

    const submit = async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            let fileID = null;
            if (file) {
                const uploadedFile = await productService.uploadProductFile(file);
                fileID = uploadedFile.$id;
            }

            const dbProduct = await productService.addToDonate(
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
                reset();
            }
        } catch (error) {
            console.error("Donation error:", error);
            toast.error("Failed to donate. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Make a Donation</h2>
            <Input label="Title:" {...register("title", { required: true })} className="w-full border-gray-300 rounded-lg shadow-sm p-4" />
            <Select label="Category:" options={["furniture", "electronics", "others"]} {...register("category", { required: true })} className="w-full border-gray-300 rounded-lg shadow-sm p-4" />
            <RTE label="Description:" name="description" control={control} className="border-gray-300 rounded-lg shadow-sm p-4" />
            <Input label="Pickup Address:" {...register("pickupAddress", { required: true })} className="w-full border-gray-300 rounded-lg shadow-sm p-4" />
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full border-gray-300 rounded-lg shadow-sm p-4" />
            <Button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg shadow-md hover:bg-orange-700 transition" disabled={isSubmitting}>
                {isSubmitting ? "Donating..." : "Donate Now"}
            </Button>
        </form>
    );
}

export default DonateForm;
