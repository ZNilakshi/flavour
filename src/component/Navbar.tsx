"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session }: any = useSession();
 
  return (
    <div className="w-full text-oldenburg border-b-[1px] border-gray-500 text-gray-500 bg-white">
      <div className="max-w-screen-1xl mx-auto px-4 flex items-center justify-between">
        <div className="logo">
          <Link href="/">
            <img src="/images/menu.png" alt="Logo" style={{ width: '30px', height: 'auto' }} className=" mr-4 mt-1" />
          </Link>
        </div>
        <img src="/images/logo.png" alt="Logo 2" style={{ width: '70px', height: 'auto' }} className="w-12 mr-4 ml-2" />

        <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  }}>
    <input
      type="text"
      placeholder="Search for recipes..."
      style={{
        padding: '4px 10px',
        fontSize: '18px',
        border: '1px solid #d1d5db',
        borderRadius: '9999px 0 0 9999px',
        outline: 'none',
      }}
    />
    <button
      type="submit"
      style={{
        backgroundColor: '#e5e7eb',
        padding: '4px 10px',
        border: 'none',
        borderRadius: '0 9999px 9999px 0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src="/images/magnifying-glass.png"
        alt="Search icon"
        style={{ width: '30px', height: 'auto' }}
      />
    </button>
  </div>
         {/* Login Button */}
         {!session ? (
            <>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center' }}>
    <Link href="/login" passHref>
      <li style={{
        display: 'flex',
        alignItems: 'center',
        padding: '5px 5px 5px 5px ',
        backgroundColor: '#FF6347',
        borderRadius: '28px',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'white',
        transition: 'background-color 0.3s',
        fontSize: '18px',
        fontFamily:'oldenburg',
      }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF6347'}
      >Log in 
        <img
          src="/images/enter.png" // Replace with the path to your login icon
          alt="Login icon"
          style={{ width: '30px', height: '30px', marginRight: '10px' }}
        />
        
      </li>
    </Link>
  </ul>
              
              
            </>
          ) : (
            <>
              
              <ul className="flex items-center space-x-4">
              <li>
                 <Link href="/profile"
              className="hover:underline">{session.user?.email}
                </Link>
              
              </li>
              <li>
                <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px 15px 5px 5px ',
                  backgroundColor: '#FF6347',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'white',
                  transition: 'background-color 0.3s',
                  fontSize: '18px',
                  fontFamily:'oldenburg',
                }}
                  onClick = {() => {
                    signOut();
                  }}
                   >
                  Log out 
                </button>
              </li>
              </ul>
            </>
          )}

      </div>
    </div>
  );
};

export default Navbar;