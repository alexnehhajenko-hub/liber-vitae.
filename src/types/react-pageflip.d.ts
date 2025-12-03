// src/types/react-pageflip.d.ts

declare module 'react-pageflip' {
  import * as React from 'react';

  export interface FlipEvent {
    data: number;
  }

  export interface HTMLFlipBookProps {
    width?: number;
    height?: number;
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    usePortrait?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onFlip?: (e: FlipEvent) => void;
    children?: React.ReactNode;
  }

  export interface HTMLFlipBookInstance {
    pageFlip(): {
      flipPrev(): void;
      flipNext(): void;
      getCurrentPageIndex(): number;
    };
  }

  const HTMLFlipBook: React.ForwardRefExoticComponent<
    HTMLFlipBookProps & React.RefAttributes<HTMLFlipBookInstance>
  >;

  export default HTMLFlipBook;
}