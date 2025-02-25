const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUsersCollectionID: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwriteProductsCollectionID: String(import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID),
    appwriteWishlistCollectionID: String(import.meta.env.VITE_APPWRITE_WISHLIST_COLLECTION_ID),
    appwriteCartCollectionID: String(import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID),
    appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf