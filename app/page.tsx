// page: home

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col">
        <Link href="/products">products</Link>
        <Link href="/about">go to about</Link>
      </div>
    </main>
  );
}
