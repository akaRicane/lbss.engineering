// page: home

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div>Welcome to lbss.engineering!</div>
      <div>work in progress</div>
      <Link href="/about">go to about</Link>
    </main>
  );
}
