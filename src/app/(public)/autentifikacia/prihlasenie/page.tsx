"use client";
import LoginPage from "@/components/loginPage";
import { useEffect } from "react";
import { getLoggedInUser } from "@/appwrite/authService";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        async function checkUser() {
            const user = await getLoggedInUser();
            if (user) {
                router.push("/"); // Redirect to homepage if user is logged in
            }
        }
        checkUser();
    }, [router]);

    return (
        <LoginPage />
    );
}
