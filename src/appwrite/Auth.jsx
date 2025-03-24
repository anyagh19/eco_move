import { Client, Account, ID } from 'appwrite'
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

    async createAccount({ email, password, name, phoneNumber }) {
        try {
            const userAcount = await this.account.create(ID.unique(), email, password, name);
            if (userAcount) {
                await this.login({ email, password })
                await this.account.updatePrefs({
                    phoneNumber: phoneNumber,
                });
                return userAcount;
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