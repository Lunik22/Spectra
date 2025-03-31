'use server'
import { Browser, ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./appwriteClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


async function signUpWithEmail(formData: FormData) {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const name = formData.get("name") as string | null;

    if (!email || !password || !name) {
        throw new Error("Invalid form data: email, password, and name are required.");
    }
  
    const { account } = await createAdminClient();
  
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);
  
    cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  
    redirect("/");
}

export async function signInWithEmail(formData: FormData) {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
        throw new Error("Invalid form data: email and password are required.");
    }

    const { account } = await createAdminClient(); // Use AdminClient to create session
    const session = await account.createEmailPasswordSession(email, password);

    if (!session || !session.secret) {
        console.error("Failed to create session:", session); // Debugging log
        throw new Error("Failed to create session");
    }

    cookies().set("my-custom-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    redirect("/");
}

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      return null;
    }
}

export async function getAvatarURL() {
    const avatars = (await createSessionClient()).avatar;
    const result = avatars.getBrowser(
        Browser.AvantBrowser, 
    );
    return await result;
}