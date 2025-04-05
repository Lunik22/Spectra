"use server";
import { Client, Account, Avatars } from "node-appwrite";
import { Client as AppwriteClient, Account as AppwriteAccount } from "appwrite";
import { cookies } from "next/headers";

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '')
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
        .setKey(process.env.NEXT_PUBLIC_APPWRITE_ADMIN_API_KEY || '');

    const account = new Account(client);
    return {
        get account() {
          return account;
        }
      };
}

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '')
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

    const session = await (await cookies()).get("my-custom-session");

    if (session?.value) {
        client.setSession(session.value);
        return {
          get account() {
            return new Account(client);
          },
          get avatar() {
            return new Avatars(client);
          }
        };    
    } else {
      return null;
    }
}

export async function createGoogleClient() {
    const client = new AppwriteClient()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '') // Ensure the endpoint is correct
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ''); // Ensure the project ID is correct

    const account = new AppwriteAccount(client);
    return {
        get googleAccount() {
            return account;
        }
    };
}