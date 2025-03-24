import { Client, ID, Databases, Account, Role, Permission, Storage, Query } from "appwrite";
import conf from "../conf/Conf";

export class RecycleAuthService {
    client = new Client;
    account;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID)
        this.account = new Account(this.client)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createRecycleAgency({ agencyName, agencyEmail, agencyPassword, agencyPhone, agencyAddress, agencyCity, serviceArea, acceptedMaterials }) {
        try {
            // Step 1: Create a new account
            const recycleAccount = await this.account.create(ID.unique(), agencyEmail, agencyPassword, agencyName);
            if (!recycleAccount) throw new Error("Account creation failed");

            // Step 2: Wait for authentication by creating a session
            const session = await this.account.createEmailPasswordSession(agencyEmail, agencyPassword);
            if (!session) throw new Error("Session creation failed");

            // Step 3: Update user preferences
            await this.account.updatePrefs({ agencyPhone });

            // Step 4: Ensure proper permissions for the user before adding to the database
            

            // Step 5: Create the document in Appwrite database
            const recycleAgencyData = await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteRecycleAgencyCollectionID,
                ID.unique(),
                {
                    agencyName,
                    agencyEmail,
                    agencyPassword,
                    agencyPhone,
                    agencyAddress,
                    agencyCity,
                    serviceArea,
                    acceptedMaterials
                },
                [
                    Permission.read(Role.any()), // Anyone can read
                    Permission.update(Role.any()), // Fix: Correctly format user role
                    Permission.delete(Role.any()),
                    Permission.write(Role.any())
                ]
            );

            return recycleAgencyData;

        } catch (error) {
            console.error("Error creating recycling agency:", error);
            throw error;
        }
    }


    async recycleAgencyLogin({ agencyEmail, agencyPassword }) {
        try {
            return await this.account.createEmailPasswordSession(agencyEmail, agencyPassword)
        } catch (error) {
            console.log(' r a login ', error)
        }
    }

    async getCurrentRecycleAgency() {
        try {
            const session = await this.account.getSession('current'); // Check session first
            if (!session) {
                throw new Error('User is not logged in.');
            }
            return await this.account.get();
        } catch (error) {
            console.log('get a', error)
            throw error;
        }
    }

    async recycleAgencyLogout() {
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log('out r a', error)
            throw error;
        }
    }

    async listRecycleProducts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteRecycleCollectionID
            )
        } catch (error) {
            console.log('list r pro' , error)
            throw error
        }
    }

    async deleteRecycleProduct(recycleProductID){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteRecycleCollectionID,
                recycleProductID
            )
        } catch (error) {
            console.log('delete re pro', error)
            throw error;
        }
    }

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

    async acceptedRecycleProducts({agencyID , productID , title , category , weight , pickupAddress , productImage}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteRecycleAgencyProductsCollectionID,
                ID.unique(),
                {
                    agencyID,
                    productID,
                    title,
                    category,
                    weight,
                    pickupAddress,
                    productImage
                }
            )
        } catch (error) {
            console.log("accept re pro " , error)
            throw error;
        }
    }

    async listAcceptedRecycleRequets(agencyID){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteRecycleAgencyProductsCollectionID,
                [
                    Query.equal('agencyID' , agencyID)
                ]
            )
        } catch (error) {
            console.log('list r pro' , error)
            throw error
        }
    }
    getRecycleProduct(productID) {
        return this.databases.getDocument(
            conf.appwriteDatabaseID
            ,
            conf.appwriteRecycleCollectionID, 
            productID);
    }
    
}

const recycleAuthService = new RecycleAuthService();

export default recycleAuthService;