const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUsersCollectionID: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwriteProductsCollectionID: String(import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID),
    appwriteWishlistCollectionID: String(import.meta.env.VITE_APPWRITE_WISHLIST_COLLECTION_ID),
    appwriteCartCollectionID: String(import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID),
    appwriteOrdersCollectionID: String(import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID),
    appwriteDonateCollectionID: String(import.meta.env.VITE_APPWRITE_DONATE_COLLECTION_ID),
    appwriteRecycleCollectionID: String(import.meta.env.VITE_APPWRITE_RECYCLE_COLLECTION_ID),
    appwriteShiftCollectionID: String(import.meta.env.VITE_APPWRITE_SHIFT_COLLECTION_ID),
    appwriteRecycleAgencyCollectionID: String(import.meta.env.VITE_APPWRITE_RECYCLEAGENCY_COLLECTION_ID),
    appwriteRecycleAgencyProductsCollectionID: String(import.meta.env.VITE_APPWRITE_RECYCLEAGENCYPRODUCTS_COLLECTION_ID),
    appwriteShiftingAgencyCollectionID: String(import.meta.env.VITE_APPWRITE_SHIFTINGAGENCY_COLLECTION_ID),
    appwriteShiftingAgencyDonationProductsCollectionID: String(import.meta.env.VITE_APPWRITE_SHIFTINGAGENCYDONATIONPRODUCTS_COLLECTION_ID),
    appwriteShiftingAgencyDeliveryProductsCollectionID: String(import.meta.env.VITE_APPWRITE_SHIFTINGAGENCYDELIVERYPRODUCTS_COLLECTION_ID),
    appwriteShiftingAgencyShiftProductsCollectionID: String(import.meta.env.VITE_APPWRITE_SHIFTINGAGENCYSHIFTPRODUCTS_COLLECTION_ID),
    appwriteRatingCollectionID: String(import.meta.env.VITE_APPWRITE_RATING_COLLECTION_ID),
    appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf