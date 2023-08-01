// page: home

import Link from 'next/Link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>You are home!</div>
      <Link href='/about'>go to about</Link>
    </main>
  );
}
