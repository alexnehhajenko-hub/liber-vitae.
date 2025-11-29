import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  const className =
    "lv-button " + (variant === "ghost" ? "lv-button-ghost" : "lv-button-primary");
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}