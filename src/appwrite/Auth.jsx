import {Client ,Account , ID} from 'appwrite'
import conf from '../conf/Conf'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client)
    }

    async createAccount({email , password , name, phoneNumber}) {
        try {
            const userAcount = await this.account.create(ID.unique() , email , password , name);
            if (userAcount) {
                await this.login({email , password})
                await this.account.updatePrefs({
                    phoneNumber: phoneNumber,
                    // role: role
                });
                return userAcount;
            }
            else{
                return userAcount;
            }
        } catch (error) {
            throw error
        }
    }

    async login({email , password}){
        try {
            return await this.account.createEmailPasswordSession(email , password);
        } catch (error) {
          throw error  
        }
    }

    async getCurrentUser () {
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }

    async logOut(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            throw error
        }
    }

}

const authService = new AuthService();

export default authService