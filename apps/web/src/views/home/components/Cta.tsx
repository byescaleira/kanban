import Link from "next/link";
import { t } from "@lingui/core/macro";
import { useEffect, useState } from "react";

import Button from "~/components/Button";

const Cta = () => {
  const [currentWorkspaceSlug, setCurrentWorkspaceSlug] = useState("acme");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const workspaceSlugs = [
      "acme",
      "henry",
      "cal",
      "documenso",
      "jack",
      "openstatus",
      "florrie",
      "supabase",
    ];

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWorkspaceSlug((prev) => {
          const currentIndex = workspaceSlugs.indexOf(prev);
          const nextIndex = (currentIndex + 1) % workspaceSlugs.length;
          const nextSlug = workspaceSlugs[nextIndex];
          if (!nextSlug) return prev;
          return nextSlug;
        });
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative isolate overflow-hidden">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div
            className={`mb-8 flex items-center gap-2 rounded-2xl border bg-light-50 px-4 py-2 text-center text-sm font-bold text-light-1000 transition-all duration-500 dark:border-hairline dark:bg-dark-50 dark:text-dark-950 lg:text-[16px] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
          >
            <p>kan.bn/{currentWorkspaceSlug}</p>
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-light-1000 dark:text-dark-1000 sm:text-4xl">
            {t`Get started for free today`}
          </h2>
          <p className="text-md/8 mx-auto mt-6 max-w-[375px] text-pretty text-light-950 dark:text-dark-900">
            {t`Unlimited boards, unlimited lists, unlimited cards. No credit card required.`}
          </p>
          <Link href="/signup">
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg">{t`Get started`}</Button>
            </div>
          </Link>
        </div>
      </div>
      {/* This was a radial gradient circle behind the CTA — a glowing
          blob, which is one of the tells this system exists to avoid,
          and a gradient background besides. The printed sky replaces
          it: the halftone dot is the one mark that is both space and
          print, because a press builds tone from dots. Same atmosphere,
          nothing that glows. */}
      <div className="sky -z-10" aria-hidden="true">
        <div className="sky-scatter" />
        <div className="sky-disc" />
      </div>
    </div>
  );
};

export default Cta;
