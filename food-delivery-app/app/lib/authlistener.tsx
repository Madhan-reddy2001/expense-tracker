"use client";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export const Auth = () => {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const authInfo = {
        userID: result.user.uid,
        name: result.user.displayName,
        profileURL: result.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      router.push("/expense-tracker");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p>Sign in to track your expenses and manage your account.</p>
        <button className="google-btn" onClick={signInWithGoogle}>
          <FcGoogle />
          Continue with Google
        </button>
      </div>
    </div>
  );
};
