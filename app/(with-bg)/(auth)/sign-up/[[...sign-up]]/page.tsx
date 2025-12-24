"use client";

import { SignUp, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="px-4 py-28 flex justify-center">
        <SignUp />
      </div>
    );
  }

  return <div>Welcome!</div>;
}
