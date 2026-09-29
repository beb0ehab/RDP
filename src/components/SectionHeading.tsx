import type { ReactNode } from 'react';
import { SplitWords } from './SplitWords';

interface Props {
  id: string;
  title: string;
  eyebrow?: string;
  lead?: string;
  /** Optional element shown at the end of the heading row (e.g. "View all projects"). */
  action?: ReactNode;
  small?: boolean;
}

export function SectionHeading({ id, title, eyebrow, lead, action, small = false }: Props) {
  return (
    <div className="reveal">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          {eyebrow && (
            <p className="eyebrow">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h2
            id={id}
            data-split
            className={
              small ? 'mt-1 font-display text-2xl leading-tight sm:text-3xl' : 'section-title'
            }
          >
            <SplitWords text={title} />
          </h2>
        </div>
        {action}
      </div>
      {lead && (
        <p className="section-lead" data-anim="fade">
          {lead}
        </p>
      )}
    </div>
  );
}
