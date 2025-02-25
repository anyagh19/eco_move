import { Client, ID, Databases, Storage, Query, Permission, Role } from 'appwrite'
import conf from '../conf/Conf';
import { nanoid } from '@reduxjs/toolkit';

export class ProductService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createProduct({ title, description, category, price, productImage, productID = ID.unique(), status, userID }) {
        try {
            if (!userID) throw new Error("User ID is required for permission handling.");

            const permissions = [
                // Permission.create(Role.user(userID)),
                Permission.read(Role.any()),
                Permission.update(Role.user(userID)),
                Permission.delete(Role.user(userID)),
                Permission.write(Role.user(userID)),
            ];

            const uniqueID = ID.unique();

            //const productID = `product_${Date.now()}`; // Guarantees a unique ID based on time
            console.log("Generated Unique ID:", uniqueID);


            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProductsCollectionID,
                uniqueID,
                {
                    title,
                    description,
                    category,
                    price,
                    productImage,
                    status,
                    userID,
                    productID
                },
                permissions,
            );


        } catch (error) {
            console.log('createProduct error', error)
            throw error
        }
    }

    async updateProduct(productID, { title, description, category, price, productImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProductsCollectionID,
                productID,
                {
                    title,
                    description,
                    category,
                    price,
                    productImage,
                    status
                }
            )
        } catch (error) {
            console.log('updateProduct error', error)
            throw error
        }
    }

    async deleteProduct(productID) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProductsCollectionID,
                productID
            )
            return true
        } catch (error) {
            console.log('delete error', error)
            throw error
        }
    }

    async getProduct(productID) {
        try {
            if (!productID) {
                console.log('product id error')
            }
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteProductsCollectionID,
                productID
            )
        } catch (error) {
            console.log('get error', error)
            throw error
        }
    }

    // async listActiveProduct(queries = [Query.equal('status', 'active')]) {
    //     try {
    //         console.log('Fetching products with queries:', queries); // Log queries
    //         const response = await this.databases.listDocuments(
    //             conf.appwriteDatabaseID,
    //             conf.appwriteProductsCollectionID,
    //             queries
    //         );
    //         console.log('API Response:', response); // Log the response
    //         return response;
    //     } catch (error) {
    //         console.log('Error fetching active products:', error);
    //         throw error;
    //     }
    // }
    async listActiveProduct(queries = [Query.equal('status', 'active')]) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteProductsCollectionID,
                queries
            );
            return response;
        } catch (error) {
            console.log('Error fetching active products:', error);
            throw error;
        }
    }

    async ListUsersProduct(userID) {
        try {
            if (!userID) {
                console.log('login first')
            }
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteProductsCollectionID,
                [
                    Query.equal('userID', userID),
                    Query.equal('status', 'active')
                ]
            )
            return response;
        }
        catch (error) {
            console.log('userproduct shows error', error)
            throw error;
        }
    }


    async listProductByCategory(category) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteProductsCollectionID,
                [
                    Query.equal("category", category),
                    Query.equal('status', 'active'),
                    // Query.limit(10)
                ]

            )
        } catch (error) {
            console.log('category list error', error)
            throw error
        }
    }

    // async uploadProductFile(file, userID) {
    //     try {
    //         if (!userID) throw new Error("User ID is required for permission handling.");

    //         const permissions = [
    //             // Permission.create(Role.user(userID)),
    //             Permission.read(Role.any()),
    //             // Permission.update(Role.user(userID)),
    //             // Permission.delete(Role.user(userID)),
    //             Permission.write(Role.user(userID)),
    //         ];

    //         return await this.bucket.createFile(
    //             conf.appwriteBucketID,
    //             ID.unique(),
    //             file,
    //             permissions
    //         )
    //     } catch (error) {
    //         console.log('upload file error', error)
    //         throw error
    //     }
    // }
    async uploadProductFile(file, userID) {
        try {
            if (!userID) throw new Error("User ID is required for permission handling.");

            const fileID = ID.unique(); // Generate a unique ID for the file
            const permissions = [
                Permission.read(Role.any()), // Public read
                Permission.write(Role.user(userID)), // User write access
            ];

            const uploadedFile = await this.bucket.createFile(
                conf.appwriteBucketID,
                fileID,
                file,
                permissions
            );

            console.log('File uploaded with ID:', uploadedFile.$id);
            return uploadedFile;
        } catch (error) {
            console.log('upload file error', error);
            throw error;
        }
    }


    async deleteProductFile(fileID) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileID
            )
            return true;
        } catch (error) {
            console.log('delete file error', error);
            throw error;
        }
    }

    // getProductFilePreview(fileID) {
    //     if (!fileID) {
    //         console.warn("Warning: fileId is missing in getProductFilePreview");
    //         return "/default-image.png"; // Provide a placeholder image
    //     }
    //     return this.bucket.getFilePreview(
    //         conf.appwriteBucketID,
    //         fileID
    //     )
    // }
    getProductFilePreview(fileID) {
        if (!fileID) {
            console.warn("Warning: fileId is missing in getProductFilePreview");
            return "/default-image.png"; // Provide a placeholder image
        }
        console.log('Fetching preview for fileID:', fileID); // Log the file ID
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileID
        );
    }

    async addToWishlist(userID, productID, title, price, createdAt = new Date().toISOString(), productImage) {
        try {

            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteWishlistCollectionID,
                ID.unique(),
                {
                    userID,
                    productID,
                    createdAt,
                    title,
                    price,
                    productImage,
                },
                [
                    Permission.read(Role.user(userID)),
                    Permission.update(Role.user(userID)),
                    Permission.delete(Role.user(userID))
                ]
            )
        } catch (error) {
            console.log('add wish', error)
            throw error;
        }
    }

    async deleteWishlistProduct(wishlistID) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteWishlistCollectionID,
                wishlistID
            )
        } catch (error) {
            console.log('delete wish', error)
            throw error;
        }
    }

    async getWishlistProducts(userID) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteWishlistCollectionID,
                [
                    Query.equal('userID', userID)
                ]
            )
        } catch (error) {
            console.log('get wish ', error)
            throw error;
        }
    }

    async addToCart(userID, productID, title, productImage, price , createdAt) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCartCollectionID,
                ID.unique(),
                {
                    userID,
                    productID,
                    title,
                    productImage,
                    price,
                    createdAt
                },
                [
                    Permission.read(Role.user(userID)),
                    Permission.update(Role.user(userID)),
                    Permission.delete(Role.user(userID))
                ]
            )
        } catch (error) {
            console.log('add cart', error)
            throw error
        }
    }

    async removeCartProduct(cartID){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCartCollectionID,
                cartID
            )
        } catch (error) {
            console.log('remove cart' , error)
        }
    }

    async getCartProducts(userID){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCartCollectionID,
                [
                    Query.equal('userID' , userID)
                ]
            )
        } catch (error) {
            console.log('get cart', error)
            throw error
        }
    }
};


const productService = new ProductService();

export default productService;