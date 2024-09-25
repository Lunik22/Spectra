import appwriteConfig from "@/config/appwrite-config";
import { Client, Account, ID, Databases } from 'appwrite';

const appwriteClient = new Client()
appwriteClient
    .setEndpoint(appwriteConfig.appwriteUrl)
    .setProject(appwriteConfig.appwriteProjectID)
    
export const account = new Account(appwriteClient);
export const database = new Databases(appwriteClient);


//Account Service

type CreateUserAccount = {
    email: string,
    password: string,
    name: string
}

type LoginUserAccount = {
    email: string,
    password: string
}

export class AppwriteService {
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create( ID.unique(), email, password, name)
            if (userAccount) {
                return this.loginUserAccount({ email, password })
            }
        } catch (error) {
            throw error
        }
    }

    async loginUserAccount({ email, password }: LoginUserAccount) {
        try{
            return await account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getUserAccount() {
        try {
            return await account.get()
        } catch (error) {
            throw error
        }
    }

    async logoutUserAccount() {
        try {
            return await account.deleteSession('current')
        } catch (error) {
            throw error
        }
    }
}

const appwriteService = new AppwriteService()

export default appwriteService;