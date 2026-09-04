import Link from "next/link";
import { twMerge } from "tailwind-merge";

import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  href?: string;
  fullWidth?: boolean;
  openInNewTab?: boolean;
  iconOnly?: boolean;
}

const Button = ({
  children,
  size = "md",
  iconLeft,
  iconRight,
  isLoading,
  variant = "primary",
  href,
  fullWidth,
  openInNewTab,
  iconOnly,
  ...props
}: ButtonProps) => {
  /* Every control is a capsule. A pill button reads as a printed
     badge, not as an OS control — which is why the radius is safe
     here even in a print language.

     Primary is an --accent-solid FILL with near-black ink over it:
     white on #ff6b00 measures 2.86:1 and fails AA, and darkening the
     orange until it carries white takes it to ~#c75200, which is
     brown and no longer the brand.

     No shadow on any variant. Print has no depth of field, and the
     2px ink border does the separating that the shadow used to. */
  const classes = twMerge(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-transparent px-5 text-base font-medium transition-colors duration-200 ease-colour focus-visible:outline-none",
    size === "xs" && "px-3 text-xs",
    size === "sm" && "px-4 text-sm",
    size === "md" && "min-h-[40px]",
    size === "lg" && "min-h-[46px] px-6",
    fullWidth && "w-full",
    iconOnly && "px-0",
    iconOnly &&
      (size === "xs"
        ? "h-7 w-7"
        : size === "sm"
          ? "h-9 w-9"
          : size === "lg"
            ? "h-[46px] w-[46px]"
            : "h-10 w-10"),
    variant === "primary" && "border-accent bg-accent text-on-accent",
    variant === "secondary" &&
      "border-hairline bg-transparent text-light-1000 dark:text-dark-1000",
    variant === "danger" && "border-danger bg-danger text-on-danger",
    variant === "ghost" &&
      "text-light-1000 hover:bg-light-300 dark:text-dark-1000 dark:hover:bg-dark-300",
    props.disabled && "opacity-60",
  );

  const content = (
    <span className="relative flex items-center justify-center">
      {isLoading && (
        <span className="absolute">
          <LoadingSpinner size={size === "xs" ? "sm" : size} />
        </span>
      )}
      {iconOnly ? (
        <div
          className={twMerge(
            "flex items-center",
            isLoading ? "invisible" : "visible",
          )}
        >
          {iconLeft ?? iconRight}
        </div>
      ) : (
        <div
          className={twMerge(
            fullWidth
              ? "grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-2"
              : "flex items-center",
            isLoading ? "invisible" : "visible",
          )}
        >
          {fullWidth && !iconLeft && iconRight && (
            <span className="col-start-1 opacity-0">{iconRight}</span>
          )}
          {iconLeft && (
            <span
              className={twMerge(
                fullWidth ? "col-start-1 justify-self-start" : "mr-2",
              )}
            >
              {iconLeft}
            </span>
          )}
          <span
            className={twMerge(
              fullWidth ? "col-start-2 justify-self-center text-center" : "",
            )}
          >
            {children}
          </span>
          {iconRight && (
            <span
              className={twMerge(
                fullWidth ? "col-start-3 justify-self-end" : "ml-1",
              )}
            >
              {iconRight}
            </span>
          )}
          {fullWidth && !iconRight && iconLeft && (
            <span className="col-start-3 opacity-0">{iconLeft}</span>
          )}
        </div>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      // `??` here would silently ignore `disabled` whenever `isLoading` is
      // explicitly `false`
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      disabled={isLoading || props.disabled}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
