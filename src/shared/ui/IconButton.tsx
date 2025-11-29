import React from "react";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({ children, ...rest }: IconButtonProps) {
  return (
    <button className="lv-icon-button" {...rest}>
      {children}
    </button>
  );
}