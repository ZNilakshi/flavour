"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from 'next/image';


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
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="hidden md:block md:w-1/2">
          
          <Image
            src="/images/log.JPG" // Replace with the path to your image
            alt="Login Photo"
            width={300}
            height={180}
            className="object-cover w-full h-full"
          />
          </div>
          <div className="bg-[white] p-8 rounded shadow-md w-96">
        <div className="flex justify-center ">
    <Image src="/images/logo.png" alt="Logo" width={180} height={180} />
  </div>
            <h1 className=" font-Oldenburg text-4xl text-center font-semibold mb-8">
              Register
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center">
              <input
                type="text"
                className="w-64 border border-gray-300 text-black rounded px-2 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black text-sm"
                placeholder="Email"
                required
              />
             </div>
             <div className="flex justify-center">
              <input
                type="password"
                className="w-64 border border-gray-300 text-black rounded px-2 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black text-sm"
                placeholder="Password"
                required
              />
              </div>
               <div className="flex justify-center">
              <button
                type="submit"
                className="w-50 font-Oldenburg  bg-orange-500 text-white py-2 rounded-4 hover:bg-gray-600 text-sm"
              >
                Connect
              </button>
              </div>
              <p className=" font-Oldenburg text-red-600 text-[16px]">{error && error}</p>
            </form>
            <div className="flex justify-center">
            <div className=" text-center text-gray-500 mt-2 text-sm">--OR--</div>
            </div>
            <Link
              href="/login"
              className=" font-Oldenburg block text-center text-blue-500 hover:underline mt-3 text-sm"
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

