// page: about

import Link from "next/link";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        visit <Link href="http://www.lbss.art">lbss.art website</Link>
      </div>
      <Link href="/">go to home</Link>
    </main>
  );
}
