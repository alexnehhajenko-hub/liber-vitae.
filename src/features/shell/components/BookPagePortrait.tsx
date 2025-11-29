import React from "react";

type BookPagePortraitProps = {
  imageUrl?: string;
};

export function BookPagePortrait({ imageUrl }: BookPagePortraitProps) {
  return (
    <div>
      <div className="lv-book-portrait-frame">
        {imageUrl ? (
          <img src={imageUrl} alt="Философский портрет" />
        ) : (
          <div className="lv-book-portrait-placeholder">
            Здесь появится философский портрет в стиле масляной живописи XVII века.
          </div>
        )}
      </div>
      <div className="lv-book-portrait-caption">
        Философский лик, запечатлённый в вечности.
      </div>
    </div>
  );
}
