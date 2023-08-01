// page: about
import Link from "next/Link";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>About lbss.engineering!</div>
      <Link href="/">go home</Link>
    </main>
  );
}
