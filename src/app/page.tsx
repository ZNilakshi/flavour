import Image from "next/image";

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home page</h1>
      <Link href="/blog">
        <span className="text-blue-500 underline cursor-pointer">Go to Blog Page</span>
      </Link>
    </main>
  );
}
