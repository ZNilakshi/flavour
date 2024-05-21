"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.]+\.[A-Z]{2,}$/i;

    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }
    if (!password || password.length < 8) {
      setError("This email is invalid");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("this email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };
  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen items-center justify-center p-24">
        <div className="container mx-auto flex">
          <div className="flex-1 flex justify-center">
            <img
              src="/images/log.JPG"
              alt="Register Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-8">
            <h1 className="text-4xl text-center font-semibold mb-8">
              Register
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black"
                placeholder="Email"
                required
              />
              <input
                type="password"
                className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Register
              </button>
              <p className="text-red-600 text-[16px]">{error && error}</p>
            </form>
            <div className="text-center text-gray-500 mt-4">-OR-</div>
            <Link
              href="/login"
              className="block text-center text-blue-500 hover:underline mt-2"
            >
              Login with existing account
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;

