"use client";
import RegistrationPage from "@/components/registrationPage";
import { useEffect } from "react";
import { getLoggedInUser } from "@/appwrite/authService";
import { useRouter } from "next/navigation";

export default function Registration() {
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
        <RegistrationPage />
    );
}
