import Link from "next/link";
import { t } from "@lingui/core/macro";

/* A PLATE per feature.

   This section was doing three things a printed sheet cannot. The
   title faded OUT on hover while the description faded IN over it, so
   at rest every card showed a bare label and the actual content was
   reachable only by hovering — content hidden by default, and
   unreachable on touch. The grid then faded its own bottom row to
   transparent with a mask, and four decorative dots sat in each
   corner.

   The plate answers all three: the band carries the title the hover
   used to hide, the body carries the description permanently, and the
   status becomes the plate index, which is a true one. */
const FeatureItem = ({
  feature,
}: {
  feature: {
    title: string;
    description: string;
    comingSoon?: boolean;
    new?: boolean;
  };
}) => {
  const index = feature.new
    ? t`New`
    : feature.comingSoon
      ? t`Coming soon`
      : null;

  return (
    <article className="misreg flex flex-col overflow-hidden rounded-lg border-2 border-hairline bg-panel shadow-plate">
      <div className="plate-band">
        <h3 className="plate-band-title">{feature.title}</h3>
        {index && <span className="plate-index">{index}</span>}
      </div>
      <p className="t-small p-5 text-light-900 dark:text-dark-900">
        {feature.description}
      </p>
    </article>
  );
};

const Features = () => {
  const features = [
    {
      title: t`Board visibility`,
      description: t`Control who can view and edit your boards.`,
    },
    {
      title: t`Workspace members`,
      description: t`Collaborate seamlessly with your team.`,
    },
    {
      title: t`Trello imports`,
      description: t`Import your Trello boards and hit the ground running.`,
    },
    {
      title: t`Labels & Filters`,
      description: t`Organize and find cards quickly with powerful filtering tools.`,
    },
    {
      title: t`Comments`,
      description: t`Discuss and collaborate on cards.`,
    },
    {
      title: t`Activity logs`,
      description: t`Track all card changes with detailed activity history.`,
    },
    {
      title: t`Templates`,
      description: t`Save time with reusable board templates.`,
      new: true,
    },
    {
      title: t`Integrations`,
      description: t`Connect your favorite tools to streamline your workflow.`,
      comingSoon: true,
    },
  ];

  return (
    <>
      <div className="flex flex-col px-4 pb-24">
        <div className="running-head">
          <p className="running-head-label">{t`Features`}</p>
          <p className="running-head-folio">02</p>
        </div>

        <h2 className="t-section mt-5 max-w-[20ch] text-balance text-light-1000 dark:text-dark-1000">
          {t`Kanban reimagined`}
        </h2>
        <p className="t-lead mt-4 max-w-[58ch] text-light-950 dark:text-dark-900">
          {t`Simple, visual task management that just works. Drag and drop cards, collaborate with your team, and get more done.`}
        </p>
        <div className="mx-auto mt-16 w-full max-w-7xl">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureItem key={`feature-${index}`} feature={feature} />
            ))}
          </div>
        </div>

        <p className="t-small mt-8 text-light-900 dark:text-dark-900">
          {t`We're just getting started. `}
          <Link href="/kan/roadmap" className="text-accent-ink underline">
            {t`View our roadmap.`}
          </Link>
        </p>
      </div>
    </>
  );
};

export default Features;
