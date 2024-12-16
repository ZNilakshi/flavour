"use client";

import { useState } from 'react';
import Link from 'next/link';
import chat from '../component/chat'; // Adjust the path if needed
import ChatBox from '../component/chat';

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  const toggleChatBox = () => {
    setShowChat(!showChat);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home page</h1>
      <Link href="/blog">
        <span className="text-blue-500 underline cursor-pointer">Go to Blog Page</span>
      </Link>
      
      <button onClick={toggleChatBox} className="p-2 bg-blue-500 text-white rounded mb-4 mt-4">
        {showChat ? 'Hide ChatBox' : 'Show ChatBox'}
      </button>
      {showChat && <ChatBox />}
    </main>
  );
}
