// component: footer

import Link from "next/link";

const Footer = () => {
  return (
    <main className="flex flex-col bg-blue-200">
      <Link href='/'>home</Link>
      <Link href='/betatest'>betatest</Link>
    </main>
  );
};

export default Footer;
