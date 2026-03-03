import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  showArrow?: boolean;
  external?: boolean;
  "aria-label"?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white border border-navy hover:bg-steel hover:border-steel active:bg-navy focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
  secondary:
    "bg-transparent text-navy border border-navy hover:bg-frost active:bg-frost/70 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-navy border border-transparent hover:bg-frost active:bg-frost/70 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
};

const baseClasses =
  "inline-flex items-center gap-2 font-display font-600 tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  disabled = false,
  type = "button",
  onClick,
  showArrow,
  external = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const shouldShowArrow = showArrow ?? variant === "primary";

  const combinedClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {shouldShowArrow && (
        <ArrowRight
          size={size === "sm" ? 14 : size === "lg" ? 18 : 16}
          className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${combinedClasses}`}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={`group ${combinedClasses}`}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`group ${combinedClasses}`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
