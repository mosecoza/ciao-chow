"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../components/AppLayout";
import PublicHeader from "../components/PublicHeader";
import { AuthHeaderContent } from "../components/auth/AuthHeaderContent";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuthStore } from "src/stores/auth";
import { authPages } from "src/types/auth";

const Auth = () => {
  const { push } = useRouter();
  const { user } = useAuthStore();
  const [page, setPage] = useState<authPages>("register");

  useEffect(() => {
    if (user) {
      push("/products");
    }
  }, [user, push]);

  return (
    <AppLayout>
      <PublicHeader auth>
        <AuthHeaderContent page={page} />
      </PublicHeader>

      {page === "register" ? (
        <section className="px-4">
          <RegisterForm />
          <p className="text-primary text-[12px] mt-5 mb-10 text-center">
            Don&apos;t have an account?{" "}
            <button className="font-bold" onClick={() => setPage("login")}>
              Login
            </button>
          </p>
        </section>
      ) : (
        <section className="px-4 flex-half">
          <LoginForm />
          <p className="text-primary text-[12px] mt-5 mb-10 text-center">
            Have an account?{" "}
            <button className="font-bold" onClick={() => setPage("register")}>
              Register
            </button>
          </p>
        </section>
      )}
    </AppLayout>
  );
};

export default Auth;
