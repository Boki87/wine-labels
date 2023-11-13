import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  return (
    <main>
      Landing Page{" "}
      {!user ? (
        <Link href="/sign-in">Sign in</Link>
      ) : (
        <Link href="/profile">Dashboard</Link>
      )}
    </main>
  );
}
