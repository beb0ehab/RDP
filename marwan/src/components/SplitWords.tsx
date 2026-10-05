import { Fragment } from 'react';

/**
 * Renders text as masked words so GSAP can slide each word up into view.
 * Splitting by words (never letters) keeps Arabic letters joined.
 */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="split-mask">
            <span className="split-word" data-split-word>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}
