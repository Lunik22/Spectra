"use server";
import { Client, Account, Avatars } from "node-appwrite";
import { cookies } from "next/headers";

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '')
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
        .setKey(process.env.NEXT_PUBLIC_APPWRITE_ADMIN_API_KEY || '');

    return {
        get account() {
          return new Account(client);
        },
      };
}

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '')
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

    const session = await cookies().get("my-custom-session");

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