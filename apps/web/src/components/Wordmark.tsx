import { twMerge } from "tailwind-merge";

/* THE WORDMARK.

   One place for the brand, so the mark lands in a single file rather
   than in the eight headers that used to hardcode the name.

   The name is set in ink, never in orange. No orange bright enough to
   feel vibrant clears 4.5:1 as type on bone paper — #ff6b00 measures
   2.49:1 — so the accent goes where a screenprint actually floods it:
   into a fill. Here that fill is the mark itself.

   The mark is a card: a filled plate, which is the one object this
   product is actually about. It is a placeholder for the drawn SVG,
   and it is deliberately a single closed shape — the Tier-2 rule is
   that the mark survives 32px, one colour and a circular crop, and a
   shape this simple survives all three. */
export const Wordmark = ({
  className,
  showMark = true,
}: {
  className?: string;
  showMark?: boolean;
}) => (
  <span className={twMerge("inline-flex items-center gap-2", className)}>
    {showMark && (
      <svg
        viewBox="0 0 24 24"
        className="h-[0.85em] w-[0.85em] shrink-0"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="22"
          height="22"
          rx="7"
          fill="var(--accent-solid)"
        />
        <rect
          x="6"
          y="6"
          width="5"
          height="12"
          rx="2"
          fill="var(--on-accent)"
        />
        <rect
          x="13"
          y="6"
          width="5"
          height="7"
          rx="2"
          fill="var(--on-accent)"
        />
      </svg>
    )}
    <span className="tracking-tight">Kanban</span>
  </span>
);

export default Wordmark;
