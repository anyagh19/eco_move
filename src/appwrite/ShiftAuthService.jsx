import { Account, Client, Databases, ID, Storage, Permission, Role, Query } from 'appwrite'
import conf from '../conf/Conf';

export class ShiftAuthService {
    client = new Client();
    account;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID)

        this.account = new Account(this.client)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createShiftingAgency({ agencyName, agencyEmail, agencyPhone, agencyPassword, agencyAddress, serviceArea, vehicleAvailable }) {
        try {
            const shiftingAgency = await this.account.create(ID.unique(), agencyEmail, agencyPassword, agencyName)
            if (!shiftingAgency) {
                throw new error('shift crate fail')
            }
            await this.account.createEmailPasswordSession(agencyEmail, agencyPassword)

            await this.account.updatePrefs({ agencyPhone })

            const shiftDoc = await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyCollectionID,
                ID.unique(),
                {
                    agencyName,
                    agencyEmail,
                    agencyPhone,
                    
                    agencyAddress,
                    serviceArea,
                    vehicleAvailable
                },

                [
                    Permission.read(Role.any()), // Anyone can read
                    Permission.update(Role.any()), // Fix: Correctly format user role
                    Permission.delete(Role.any()),
                    Permission.write(Role.any())
                ]
            );
            return shiftDoc;
        } catch (error) {
            console.error("createShiftingAgency error:", error);

            throw error;
        }
    }

    async shiftingAgencyLogin({ agencyEmail, agencyPassword }) {
        try {
            return await this.account.createEmailPasswordSession(agencyEmail, agencyPassword)
        } catch (error) {
            console.log(' r a login ', error)
        }
    }

    async shiftingAgencylogout() {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.error('Logout error:', error);
        }
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

    async listDonationProducts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteDonateCollectionID
            )
        } catch (error) {
            console.log(error)
        }
    }
    async getDonationProduct(productID){
        try {
             return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteDonateCollectionID,
                productID
            )
        } catch (error) {
            console.log(error)
        }
    }
    async deleteDonationProduct(productID){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteDonateCollectionID,
                productID
            )
        } catch (error) {
            console.log(error)
        }
    }

    async acceptedDonationProducts({productID , agencyID , title , category , description , productImage , pickupAddress}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyDonationProductsCollectionID,
                ID.unique(),
                {
                    productID , 
                    agencyID , 
                    title,
                    category,
                    description,
                    productImage,
                    pickupAddress
                },

            )
        } catch (error) {
            console.log(error)
        }
    }

    async listAcceptedDonationProducts(agencyID){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyDonationProductsCollectionID,
                [Query.equal('agencyID' , agencyID)]
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAcceptedDonationProducts(productID){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyDonationProductsCollectionID,
                productID
            )
        } catch (error) {
            console.log(error)
        }
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

    async acceptedDeliveryProducts({ agencyID ,productID , title ,  productImage  }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyDeliveryProductsCollectionID,
                ID.unique(),
                {
                    productID , 
                    agencyID , 
                    title,
                    
                    productImage,
                },
                [
                    Permission.read(Role.any()),
                    Permission.write(Role.any()),
                    Permission.update(Role.any()),
                    Permission.delete(Role.any())
                ]
                

            )
        } catch (error) {
            console.log(error)
        }
    }

    async listAcceptedDeliveryProducts(agencyID){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyDeliveryProductsCollectionID,
                [Query.equal('agencyID' , agencyID)]
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAcceptedDelivryProducts(productID){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyDeliveryProductsCollectionID,
                productID
            )
        } catch (error) {
            console.log(error)
        }
    }
    async listShiftProducts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteShiftCollectionID
            )
        } catch (error) {
            console.log(error)
        }
    }

    async getShiftProduct(productID){
        try {
             return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteShiftCollectionID,
                productID
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteShiftProduct(productID){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteShiftCollectionID,
                productID
            )
        } catch (error) {
            console.log(error)
        }
    }

    async acceptedShiftProducts({productID , agencyID , pickupAddress , dropAddress, shiftType , shiftVehicle , userPhone  }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyShiftProductsCollectionID,
                ID.unique(),
                {
                    productID , 
                    agencyID , 
                    pickupAddress,
                    dropAddress,
                    shiftType,
                    shiftVehicle,
                    userPhone
                },

            )
        } catch (error) {
            console.log(error)
        }
    }

    async listAcceptedShiftProducts(agencyID){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyShiftProductsCollectionID,
                [Query.equal('agencyID' , agencyID)]
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAcceptedShiftProducts(productID){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyShiftProductsCollectionID,
                productID
            )
        } catch (error) {
            console.log(error)
        }
    }

    async listShiftingAgency(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteShiftingAgencyCollectionID
            )
        } catch (error) {
            console.log(error)
        }
    }
}

const shiftAuthService = new ShiftAuthService();

export default shiftAuthService;