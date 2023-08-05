// page: home
'use client'

import Link from "next/link";
import { useCoreContext } from "./contexts/CoreContext";

export default function Home() {
  const { counter } = useCoreContext();

  return (
    <main>
      <div className="flex flex-col">
        <Link href="/products">products</Link>
        <Link href="/about">go to about</Link>
        <p>Counter: {counter}</p>
      </div>
    </main>
  );
}
