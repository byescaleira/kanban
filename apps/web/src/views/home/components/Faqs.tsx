import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { HiMiniMinusSmall, HiMiniPlusSmall } from "react-icons/hi2";

const Text = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-[14px] leading-[1.7rem] text-light-800 dark:text-dark-800">
      {children}
    </p>
  );
};

const Faqs = () => {
  const faqs = [
    {
      question: t`Why make an open source Trello?`,
      answer: (
        <Text>
          {t`When Trello launched in 2011, it blew everyone away with its carefully designed simplicity, but over the years it lost its magic and grew into something closer to "Jira Lite". This project is our attempt to recapture the original magic of Trello's simplicity, in open source.`}
        </Text>
      ),
    },
    {
      question: t`What's the difference between Kanban and Trello?`,
      answer: (
        <Text>
          {t`The main difference between Kanban and Trello is that Kanban is open source, allowing anyone to view, modify, and contribute to our code. Our cloud offering also offers no restrictions on features for individual use, whereas Trello locks basic features such as the number of boards you can create behind a paywall.`}
        </Text>
      ),
    },
    {
      question: t`How is the project funded?`,
      answer: (
        <Text>
          {t`For long-term sustainability, we recognise all good open source projects need a source of revenue. Ours comes from the paid cloud offering for workspaces with multiple users and for custom workspace slugs. There's no obligation to use it, and you can self-host the software on your own infrastructure free of charge.`}
        </Text>
      ),
    },
    {
      question: t`How do I import my Trello boards?`,
      answer: (
        <Text>
          <Trans>
            Importing your Trello boards into Kanban is easy. You can follow our
            step-by-step guide{""}
            <Link
              href="https://docs.kan.bn/imports/trello"
              className="underline"
            >
              here
            </Link>
            .
          </Trans>
        </Text>
      ),
    },
    {
      question: t`How do I get a custom URL?`,
      answer: (
        <Text>
          <Trans>
            Set it in your{""}
            <Link href="/settings/workspace" className="underline">
              workspace settings
            </Link>
            {""}. Your workspace URL is whatever slug you choose, on this
            instance's own domain.
          </Trans>
        </Text>
      ),
    },
    {
      question: t`Do you offer a free plan?`,
      answer: (
        <Text>
          {t`Yes, we offer an forever free plan for individual use. No restrictions, no paywalls, no limits.`}
        </Text>
      ),
    },
    {
      question: t`What license are you using?`,
      answer: (
        <Text>
          <Trans>
            We are using the{""}
            <Link
              href="https://github.com/kanbn/kan/blob/main/LICENSE"
              className="underline"
            >
              AGPL-3.0 license
            </Link>
            .
          </Trans>
        </Text>
      ),
    },
    {
      question: t`How do I invite team members?`,
      answer: (
        <Text>
          <Trans>
            You can invite team members by clicking the "Invite" button in the
            top right corner of the{""}
            <Link href="/members" className="underline">
              members page
            </Link>
            {""}
            and entering their email address. They will receive an email with a
            link to join the workspace.
          </Trans>
        </Text>
      ),
    },
    {
      question: t`How do I self-host?`,
      answer: (
        <Text>
          <Trans>
            You can self-host by following the instructions in our{""}
            <Link href="https://github.com/kanbn/kan" className="underline">
              repo
            </Link>
            .
          </Trans>
        </Text>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-[900px] px-4">
      <div className="flex flex-col pb-12">
        <div className="running-head">
          <p className="running-head-label">{t`FAQs`}</p>
          <p className="running-head-folio">04</p>
        </div>

        <h2 className="t-section mt-5 max-w-[20ch] text-balance text-light-1000 dark:text-dark-1000">
          {t`Questions?`}
        </h2>
        <p className="t-lead mt-4 max-w-[58ch] text-light-950 dark:text-dark-900">
          <Trans>
            Find answers to common questions about Kanban. Can't find what
            you're looking for? Feel free to{""}
            <Link href="mailto:support@kan.bn" className="underline">
              contact us
            </Link>
            .
          </Trans>
        </p>
      </div>
      <div className="rounded-2xl bg-panel ring-1 ring-hairline dark:ring-hairline">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <dl className="divide-y divide-light-300 dark:divide-dark-200">
              {faqs.map((faq) => (
                <Disclosure
                  key={faq.question}
                  as="div"
                  className="py-5 first:pt-0 last:pb-0"
                >
                  <dt>
                    <DisclosureButton className="group flex w-full items-center justify-between text-left text-light-1000 dark:text-dark-1000">
                      <span className="text-[14px] font-semibold">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center text-light-800 dark:text-dark-800">
                        <HiMiniPlusSmall
                          aria-hidden="true"
                          className="size-6 group-data-[open]:hidden"
                        />
                        <HiMiniMinusSmall
                          aria-hidden="true"
                          className="size-6 group-[&:not([data-open])]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    {faq.answer}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
