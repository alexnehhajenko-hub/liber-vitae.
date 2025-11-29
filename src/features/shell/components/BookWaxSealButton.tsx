import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function BookWaxSealButton({ children, ...rest }: Props) {
  return (
    <button className="lv-wax-button" {...rest}>
      {children}
    </button>
  );
}