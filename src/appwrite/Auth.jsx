import { Client, Account, ID , Databases } from 'appwrite'
import conf from '../conf/Conf'

export class AuthService {
    client = new Client();
    databases
    account;


    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client)
       this.databases = new Databases(this.client)
    }

    async listAllUsers() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteUsersCollectionID
            )
        } catch (error) {
            console.error("Error listing users:", error);
            return [];
        }
    }
    async createAccount({ email, password, name, phone , userID= ID.unique() }) {
        try {
            const userAcount = await this.account.create(ID.unique(), email, password, name);
            if (userAcount) {
                await this.login({ email, password })
                await this.account.updatePrefs({
                    phone: phone,
                });
                const document = await this.databases.createDocument(
                    conf.appwriteDatabaseID,
                    conf.appwriteUsersCollectionID,
                    ID.unique(),
                    {
                        email,
                        name,
                        phone,
                        password,
                        userID,
                    }
                );

                return { userAcount, document };
            }
            else {
                return userAcount;
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            if (!session) throw new Error("Login failed. No session created.");
            console.log("Login successful:", session);
            return session;
            
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            const sessions = await this.account.listSessions();
            if (!sessions.sessions.length) {
                console.warn("No active session found. Redirecting to login.");
                return null;
            }
            return await this.account.get();
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async logOut() {
        try {
            const sessions = await this.account.listSessions(); // List active sessions
            if (!sessions.sessions.length) {
                console.warn("No active session found. Skipping logout.");
                return false;
            }

            await this.account.deleteSession("current");

            localStorage.removeItem("status");
            localStorage.removeItem("userData");
            localStorage.removeItem("role");

            console.log("Logout successful!");
            return true;
        } catch (error) {
            throw error
        }
    }

}

const authService = new AuthService();

export default authService