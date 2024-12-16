"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  //const session = useSession();
  const { data: session,status: sessionStatus} = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated"){
      router.replace ("/");
    }
  },[session, router]);  
  

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
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
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };
  if(sessionStatus ==="loading"){
    return <h1>loading...</h1>
  }
  return (
    sessionStatus !== "authenticated" && (
      
   
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/images/log.JPG" // Replace with the path to your image
            alt="Login Photo"
            width={580}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="bg-[white] p-8 rounded shadow-md w-96">
        <div className="flex justify-center ">
    <Image src="/images/logo.png" alt="Logo" width={180} height={180} />
  </div>
          <h1 className="text-4xl text-center font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-2 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black text-sm"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-2 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black text-sm"
              placeholder="Password"
              required
            />
            <div className="flex justify-center">
            <button
              type="submit"
              className="w-64 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
            >
              {" "}
              Sign In
            </button>
            </div>
           <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="flex justify-center">
          <button
            className="w-64 bg-white-800 text-gray-800 py-1 px-2 border-2 border-gray-500 rounded-3xl hover:bg-gray-300 mt-4 flex items-center justify-center"
            onClick={() => {
              signIn("github");
            }}
          > <Image
              src="/images/facebook.png" // Replace with the path to your GitHub icon
              alt="GitHub Icon"
              width={24}
              height={24}
              className="mr-2"
            />
            <span className="text-sm">Sign In with Github</span>
            
          </button>
          </div>
          <div className="flex justify-center">
          <button
            className="w-64 bg-white-800 text-gray-800 py-1 px-2 border-2 border-gray-500 rounded-3xl hover:bg-gray-300 mt-4 flex items-center justify-center"
            onClick={() => {
              signIn("google");
            }}
          >
             <Image
              src="/images/search.png" // Replace with the path to your GitHub icon
              alt="GitHub Icon"
              width={24}
              height={24}
              className="mr-2"
            />
            <span className="text-sm">Sign In with Google</span>
           
           
          </button>
          </div>
          <div className="flex justify-center"> 
          <button
   className="w-64 bg-white-800 text-gray-800 py-1 px-2 border-2 border-gray-500 rounded-3xl hover:bg-gray-300 mt-4 flex items-center justify-center"
   onClick={() => {
    signIn("facebook");
  }}
  
>
  <Image
    src="/images/facebook.png" // Replace with the path to your Facebook icon
    alt="Facebook Icon"
    width={24}
    height={24}
    className="mr-2"
  />
  <span className="text-sm">Sign In with Facebook</span>
</button>

          </div>
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/register"
          >
            Register Here
          </Link>
        </div>
      </div>
       </div>
    )
  )
  
};

export default Login;