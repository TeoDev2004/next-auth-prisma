"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegsiterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("passwords dont match");
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  });
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form action="" onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          User Name
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="your user"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="your email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="your password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm your Password
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="confirm your password"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegsiterPage;
