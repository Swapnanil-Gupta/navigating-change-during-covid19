import { buttonVariants } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <main className="flex justify-center items-center h-screen">
      <img
        src="https://i.imgur.com/r0VFFep.png"
        alt=""
        className="-z-50 absolute h-full w-full opacity-40"
      />
      <div className="max-w-4xl mx-auto flex flex-col gap-y-8 text-center">
        <h1 className="font-extrabold tracking-tight text-5xl">
          Welcome to
          <br />
          Navigating Change During COVID-19
        </h1>
        <h2 className="text-3xl font-semibold tracking-tight">
          US Economy, Healthcare and Environmental Analysis
        </h2>
        <div className="flex justify-center gap-x-4">
          <SignInButton afterSignInUrl="/app" className={buttonVariants()} />
          <SignUpButton afterSignUpUrl="/app" className={buttonVariants()} />
        </div>
      </div>
    </main>
  );
}
