'use server'
import { Browser, ID } from "node-appwrite";
import { createAdminClient, createSessionClient, createGoogleClient } from "./appwriteClient";
import { OAuthProvider } from "appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function signUpWithEmail(formData: FormData) {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const name = formData.get("name") as string | null;

    if (!email || !password || !name) {
        throw new Error("Invalid form data: email, password, and name are required.");
    }
  
    const { account } = await createAdminClient();
  
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);
  
    (await cookies()).set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  
    redirect("/");
}

export async function signInWithEmail(formData: { email: string; password: string }) {
    const { email, password } = formData;

    if (!email || !password) {
        throw new Error("Invalid form data: email and password are required.");
    }

    const { account } = await createAdminClient(); // Use AdminClient to create session
    const session = await account.createEmailPasswordSession(email, password);

    if (!session || !session.secret) {
        console.error("Failed to create session:", session); // Debugging log
        throw new Error("Failed to create session");
    }

    (await cookies()).set("my-custom-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    redirect("/");
}

export async function signInWithGoogle() {
    try {
        const account = await createGoogleClient();
        if (!account) {
            throw new Error("Failed to create session client.");
        }
        account.googleAccount.createOAuth2Session(
            OAuthProvider.Google,
            "http://localhost:3000/",
            "http://localhost:3000/",
            ["email", "profile"]
        )
    } catch (error) {
        console.error("Error during Google login:", error);
        throw new Error("Failed to initiate Google login.");
    }
}

export async function getLoggedInUser() {
  try {
    const sessionClient = await createSessionClient();
    if (!sessionClient) {
      return null; // No session client means user is not logged in
    }
    const { account } = sessionClient;
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function getAvatarURL() {
    const sessionClient = await createSessionClient();
    if (!sessionClient) {
        return null; // No session client means user is not logged in
    }
    const avatars = sessionClient.avatar;
    const result = avatars.getBrowser(
        Browser.AvantBrowser, 
    );
    return await result;
}

export async function signOut() {
  try {
    const sessionClient = await createSessionClient();
    if (!sessionClient) {
      throw new Error("No active session found.");
    }
    const { account } = sessionClient;
    await account.deleteSession('current'); // Delete the current session
    (await cookies()).delete("my-custom-session"); // Clear the session cookie
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}