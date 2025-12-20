// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="mt-23.5 flex justify-center h-150">
//       <SignUp />
//     </div>
//   );
// }

"use client";

import { SignUp, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="mt-23.5 h-screen flex justify-center">
        <SignUp />
      </div>
    );
  }

  return <div>Welcome!</div>;
}
