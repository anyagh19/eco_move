import { Client, Account, Storage, Databases , ID , Permission , Role } from "appwrite";
import conf from "../conf/Conf";

export class ShiftDeliveryAuthService {
    client = new Client();
    account;
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID)

        this.account = new Account(this.client);
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async getCurrentShiftingAgency() {
        try {
            const sessions = await this.account.listSessions(); // Get all active sessions
            if (!sessions.sessions.length) {
                throw new Error('No active session found. User is not logged in.');
            }

            return await this.account.get()
        }
        catch (error) {
            console.log('User not logged in:', error);
            return null;
        }
    }

    getProductFilePreview(fileID) {
        if (!fileID) {
            console.warn("Warning: fileId is missing in getProductFilePreview");
            return "/default-image.png"; // Provide a placeholder image
        }
        console.log('Fetching preview for fileID:', fileID); // Log the file ID
        return this.storage.getFileView(
            conf.appwriteBucketID,
            fileID
        );
    }

    async listDeliveryProducts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteOrdersCollectionID
            )
        } catch (error) {
            console.log(error)
        }
    }

    async getDeliveryProduct(productID){
        try {
             return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteOrdersCollectionID,
                productID
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteDeliveryProduct(productID){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteOrdersCollectionID,
                productID
            )
        } catch (error) {
            console.log(error)
        }
    }

    async acceptedDeliveryProducts({productID , agencyID , title , productImage  }){
        try {
            console.log("Creating document with:", {
                productID,
                agencyID,
                title,
                productImage,
            });
    
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyDeliveryProductsCollectionID,
                ID.unique(),
                {
                    productID , 
                    agencyID , 
                    title,
                    // price,
                    productImage,
                },
                [
                    Permission.read(Role.any()), // Anyone can read
                    Permission.update(Role.any()), // Fix: Correctly format user role
                    Permission.delete(Role.any()),
                    Permission.write(Role.any())
                ]
            )
        } catch (error) {
            console.log(error)
        }
    }
}

const shiftDeliveryAuthService = new ShiftDeliveryAuthService();

export default shiftDeliveryAuthService;