import Image from "next/image";
import Link from "next/link";
import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { IoLogoGithub } from "react-icons/io";

import Button from "~/components/Button";
import { PageHead } from "~/components/PageHead";
import Cta from "./components/Cta";
import FAQs from "./components/Faqs";
import Features from "./components/Features";
import Layout from "./components/Layout";
import Logos from "./components/Logos";
import Testimonials from "./components/Testimonials";

export default function HomeView() {
  return (
    <Layout>
      <PageHead title="byescaleira Kanban | The open source alternative to Trello" />
      <div className="flex h-full w-full flex-col lg:pt-[5rem]">
        {/* THE MASTHEAD. Not a hero: the type IS the structure, rather
            than a headline centred on top of one. Left-aligned, ranged
            against the same edge as everything below it, so the page
            reads as a printed sheet and not as a landing template. */}
        <header className="w-full px-4 pb-10 pt-28 lg:pb-14 lg:pt-32">
          <div className="o-stagger">
            <div className="running-head">
              <p className="running-head-label">{t`Open source kanban`}</p>
              <p className="running-head-folio">01</p>
            </div>

            <h1 className="t-display mt-6 max-w-[16ch] text-balance text-light-1000 dark:text-dark-1000">
              <Trans>The open source alternative to Trello</Trans>
            </h1>

            <p className="t-lead mt-5 max-w-[58ch] text-light-950 dark:text-dark-900">
              {t`A powerful, flexible kanban app that helps you organise work, track progress, and deliver results—all in one place.`}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/signup" size="lg">{t`Get started`}</Button>
              <Button
                variant="secondary"
                size="lg"
                href="https://github.com/kanbn/kan"
                openInNewTab
              >
                {t`Self host with Github`}
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              {/* The spinning ring is the accent plate turning: one
                  colour, one orbit, retimed from 4s to 46s. An orbital
                  under 5s reads as a spinner, not as atmosphere. */}
              <div className="relative overflow-hidden rounded-full border-2 border-hairline p-[2px]">
                <div className="gradient-border absolute inset-0 animate-border-spin" />
                <div className="relative z-10 rounded-full bg-panel">
                  <Link
                    href="https://github.com/kanbn/kan"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-1 text-center text-xs text-light-1000 dark:text-dark-1000"
                  >
                    {t`Star on Github`}
                    <IoLogoGithub size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* THE HEAVY RULE. One per page, and it prints rather than
            appears. A second one would halve the weight of both. */}
        <div className="px-4">
          <hr className="rule-heavy o-squeegee" />
        </div>

        {/* The screenshot is a pulled print pasted onto the sheet:
            2px ink border, no shadow, no lift. */}
        <div className="px-4 pb-10 pt-8">
          <div className="overflow-hidden rounded-lg border-2 border-hairline bg-panel p-1 lg:p-2">
            <div className="relative overflow-hidden rounded-md border-2 border-hairline">
              <Image
                src={`/hero-light.png`}
                alt="kanban"
                width={1100}
                height={1000}
                className="block dark:hidden"
              />
              <Image
                src={`/hero-dark.png`}
                alt="kanban"
                width={1100}
                height={1000}
                className="hidden dark:block"
              />
            </div>
          </div>
        </div>
        <Logos />
        <div className="relative pt-10">
          <div id="features" className="absolute -top-20" />
          <Features />
        </div>
        <div className="relative pt-10">
          <div id="testimonials" className="absolute -top-20" />
          <Testimonials />
        </div>
        <div className="relative pt-10">
          <div id="faq" className="absolute -top-20" />
          <FAQs />
        </div>
        <div className="relative">
          <Cta />
        </div>
      </div>
    </Layout>
  );
}
