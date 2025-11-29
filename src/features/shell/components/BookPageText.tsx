import React from "react";

type BookPageTextProps = {
  name: string;
  text: string;
};

export function BookPageText({ name, text }: BookPageTextProps) {
  return (
    <div>
      <div className="lv-book-heading">LIBER VITAE</div>
      <div className="lv-book-subheading">{name.toUpperCase()}</div>
      <div className="lv-book-body">
        <span className="lv-dropcap">{text.charAt(0)}</span>
        {text.slice(1)}
      </div>
    </div>
  );
}