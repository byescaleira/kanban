import Link from "next/link";
import { t } from "@lingui/core/macro";
import { env } from "next-runtime-env";

import Button from "~/components/Button";

const Cta = () => {
  /* The label shows this instance's own host, derived at runtime, so it
     stops advertising the upstream product's domain. */
  const baseUrl = env("NEXT_PUBLIC_BASE_URL");
  const host = baseUrl
    ? baseUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "";
  const workspaceUrl = host ? `${host}/your-team` : "/your-team";

  return (
    <div className="relative isolate overflow-hidden">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          {/* This advertised kan.bn/<slug>, cycling through eight fake
              workspace names every 3s behind an opacity fade. Two
              problems: it sold the upstream product's domain rather
              than this instance's, and a reveal that replays on a timer
              is not something a press can do — a reveal fires once and
              never repeats. It is a printed label now. */}
          <p className="pill mb-8 font-mono text-[13px]">{workspaceUrl}</p>
          <h2 className="t-section text-balance text-light-1000 dark:text-dark-1000">
            {t`Get started for free today`}
          </h2>
          <p className="t-lead mx-auto mt-6 max-w-[42ch] text-pretty text-light-950 dark:text-dark-900">
            {t`Unlimited boards, unlimited lists, unlimited cards.`}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button href="/signup" size="lg">{t`Get started`}</Button>
          </div>
        </div>
      </div>
      {/* This was a radial gradient circle behind the CTA — a glowing
          blob, which is one of the tells this system exists to avoid,
          and a gradient background besides. The printed sky replaces
          it: a press builds tone from dots, and so does a sky. */}
      <div className="sky -z-10" aria-hidden="true">
        <div className="sky-scatter" />
        <div className="sky-disc" />
      </div>
    </div>
  );
};

export default Cta;
