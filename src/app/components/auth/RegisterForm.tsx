"use client";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { signUpAction } from "src/actions";
import { useAuthStore } from "src/stores/auth";
import { Data, AuthSuccessResponse, defaultData } from "src/types/api";
import { SignUpData } from "src/types/auth";
const RegisterForm = () => {
  const { setAuth } = useAuthStore();
  const { register } = useForm<SignUpData>();

  const { pending } = useFormStatus();

  const [state, formAction] = useFormState<
    Data<AuthSuccessResponse | null>,
    FormData
  >(signUpAction, defaultData);

  useEffect(() => {
    if (state.data) {
      setAuth(state.data);
    }
  }, [state, setAuth]);

  return (
    <form className="flex flex-col gap-5 " action={formAction}>
      <div className="-mb-3">
        <label className="font-medium text-sm">username</label>
        <input
          type="text"
          className="bg-gray-100 w-full p-2 rounded-[10px] min-h-12"
          placeholder="muncher"
          {...register("username")}
        />
      </div>
      <div className="-mb-3">
        <label className="font-medium text-sm">email</label>
        <input
          type="email"
          className="bg-gray-100 w-full p-2 rounded-[10px] min-h-12"
          placeholder="your email"
          {...register("email")}
        />
      </div>
      <div className="mb-1">
        <label className="font-medium text-sm">password</label>
        <input
          type="password"
          className="bg-gray-100 w-full p-2 rounded-[10px] min-h-12"
          placeholder="Your password"
          {...register("password")}
        />
      </div>
      {pending && <span>Loading...</span>}
      <button
        disabled={pending}
        type="submit"
        className="bg-primary text-white font-semibold text-lg w-full rounded-[10px] mt-2 p-3 disabled:bg-slate-50"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
