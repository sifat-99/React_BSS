import Link from "next/link";
import Header from "@/component/header";

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        <Link href="/about">About Page</Link>
      </p>
      <p>
        <Link href="/meals">Meals Page</Link>
      </p>
      <p>
        <Link href="/community">Community Page</Link>
      </p>
    </main>
  );
}
