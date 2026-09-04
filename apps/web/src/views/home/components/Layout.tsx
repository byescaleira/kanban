import { authClient } from "@kan/auth/client";

import PatternedBackground from "~/components/PatternedBackground";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();

  const isLoggedIn = !!session?.user;

  /* The html background used to be two hardcoded hex values switched
     in JS off resolvedTheme. That is a colour defined outside the
     tokens, so it could never follow them — and it painted the wrong
     stock for a whole frame on every load, before next-themes had
     resolved. It is now just the paper. */
  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          overflow: auto;
          background-color: var(--background);
        }
      `}</style>
      <div className="mx-auto flex h-full min-h-screen min-w-[375px] flex-col items-center bg-background">
        <PatternedBackground />
        <Header isLoggedIn={isLoggedIn} />
        <div className="z-10 mx-auto h-full w-full max-w-[1100px]">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
