"use client";
// page: home

import Link from "next/link";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Welcome to lbss.engineering!</div>
      <Link href="/login">login</Link>
      <Link href="/about">about</Link>
    </main>
  );
}

export default Home;
