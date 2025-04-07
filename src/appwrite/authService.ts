'use server'
import { Databases, ID, Storage } from "node-appwrite";
import { createAdminClient, createSessionClient, createGoogleClient } from "./appwriteClient";
import { OAuthProvider } from "appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function signUpWithEmail(formData: FormData) {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const name = formData.get("name") as string | null;
    const profilePicture = formData.get("profilePicture") as File | null;

    if (!email || !password || !name) {
        throw new Error("Invalid form data: email, password, and name are required.");
    }
  
    const { account } = await createAdminClient();
  
    const userId = ID.unique(); // Generate a unique user ID
    await account.create(userId, email, password, name);
    if (profilePicture) {
        const storage = new Storage(account.client);
        await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_USERS_BUCKET_ID || '', // Ensure this is set in your environment variables
            userId,
            profilePicture,
        );
    }
    const session = await account.createEmailPasswordSession(email, password);
  
    (await cookies()).set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const databases = new Databases((await createAdminClient()).client);
    databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
        process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
        userId,
        {
          UserSavedArticles: [],
          UserFollowedTopics: [],
          UserFollowedSources: [],
        }
    )
  
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
    const user = await account.get();
    return {
      $id: user.$id,
      name: user.name,
      email: user.email,
    }; // Return only plain object
  } catch (error) {
    return null;
  }
}

export async function getAvatarURL() {
  try {
    const sessionClient = await createAdminClient();
    const userId = (await getLoggedInUser())?.$id;
    if (!sessionClient || !userId) {
      return null; // No session client or user ID means no avatar
    }
    const storage = new Storage(sessionClient.client);
    const avatar = await storage.getFileView(
      process.env.NEXT_PUBLIC_APPWRITE_USERS_BUCKET_ID || '',
      userId
    );
    return avatar; // Return only the URL as a string
  } catch (error) {
    console.error("Error fetching avatar URL:", error);
    return null;
  }
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