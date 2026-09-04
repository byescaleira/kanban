import Link from "next/link";
import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { FaDiscord, FaGithub } from "react-icons/fa";

import { LanguageSelector } from "~/components/LanguageSelector";

/* The status pill: --accent-soft with --accent-ink when live, neutral
   when dormant. The old marker used a fourth colour (green) and a 1s
   ping — a pulse is not something a press can do, and no orbital runs
   under 5s. The dot is simply printed. */
const StatusMarker = () => (
  <Link
    href="https://kan.openstatus.dev"
    target="_blank"
    rel="noopener noreferrer"
    className="pill pill-status w-fit gap-2 py-2 pl-3 pr-4"
  >
    <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
    {t`All systems operational`}
  </Link>
);

const Footer = () => {
  /* A colophon is a strip at the foot of a sheet: label/value pairs
     running edge to edge, divided by rules. Not a card, never boxed —
     which is why this is a flat list of rows rather than the four
     stacked link columns it used to be. */
  const colophon = [
    {
      label: t`Documentation`,
      items: [
        { name: t`Getting started`, href: "https://docs.kan.bn/introduction" },
        {
          name: t`Importing from Trello`,
          href: "https://docs.kan.bn/imports/trello",
        },
        {
          name: t`API Reference`,
          href: "https://docs.kan.bn/api-reference/introduction",
        },
      ],
    },
    {
      label: t`Company`,
      items: [
        { name: t`Roadmap`, href: "/kan/roadmap" },
        { name: t`GitHub`, href: "https://github.com/kanbn/kan" },
        { name: t`Contact`, href: "mailto:support@kan.bn" },
        { name: t`OSS Friends`, href: "/oss-friends" },
      ],
    },
    {
      label: t`Resources`,
      items: [
        { name: t`Features`, href: "/#features" },
        { name: t`FAQs`, href: "/#faq" },
      ],
    },
    {
      label: t`Legal`,
      items: [
        { name: t`Terms of service`, href: "/terms" },
        { name: t`Privacy policy`, href: "/privacy" },
        {
          name: t`License`,
          href: "https://github.com/kanbn/kan?tab=AGPL-3.0-1-ov-file#readme",
        },
      ],
    },
  ];

  return (
    <footer className="z-10 w-full bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-8">
        <div className="colophon">
          {colophon.map((row) => (
            <div
              key={row.label}
              className="colophon-row flex-col gap-y-2 sm:flex-row"
            >
              <p className="label-mono shrink-0">{row.label}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 sm:justify-end">
                {row.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm text-light-900 hover:text-light-1000 dark:text-dark-900 dark:hover:text-dark-1000"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* THE CREDIT.

            A colophon is where a printed sheet records who made it, so
            this is the correct place for it rather than a courtesy line
            in fine print. The application is not ours: it is kan, by
            Henry Ball and its contributors. What is ours is the design
            system printed on top of it.

            AGPL-3.0 is why this fork may exist, and it is an obligation
            as much as a permission. Saying so plainly costs nothing and
            is the whole point of the licence. */}
        <div className="colophon-row mt-8 flex-col items-start gap-y-2 border-b-0 sm:flex-row sm:items-baseline">
          <p className="label-mono shrink-0">{t`Built on`}</p>
          <p className="t-small max-w-[62ch] text-light-900 dark:text-dark-900 sm:text-right">
            <Trans>
              This is a fork of{" "}
              <a
                href="https://github.com/kanbn/kan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink underline"
              >
                kan
              </a>
              , written by{" "}
              <a
                href="https://github.com/hjball"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink underline"
              >
                Henry Ball
              </a>{" "}
              and its{" "}
              <a
                href="https://github.com/kanbn/kan/graphs/contributors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink underline"
              >
                contributors
              </a>
              . They wrote the application; we printed a design system on it.
              Licensed{" "}
              <a
                href="https://github.com/kanbn/kan?tab=AGPL-3.0-1-ov-file#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink underline"
              >
                AGPL-3.0
              </a>
              , which is what makes this fork legitimate — and which obliges us
              to publish{" "}
              <a
                href="https://github.com/byescaleira/kanban"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink underline"
              >
                our source
              </a>{" "}
              in turn.
            </Trans>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/kanbn/kan"
              target="_blank"
              aria-label="GitHub"
            >
              <FaGithub className="icon-tile h-[34px] w-[34px] p-2 text-light-1000 dark:text-dark-1000" />
            </Link>
            <Link
              href="https://discord.gg/e6ejRb6CmT"
              target="_blank"
              aria-label="Discord"
            >
              <FaDiscord className="icon-tile h-[34px] w-[34px] p-2 text-light-1000 dark:text-dark-1000" />
            </Link>
          </div>
          <StatusMarker />
          <LanguageSelector />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
