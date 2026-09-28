interface Props {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
}

export function SectionHeading({ id, eyebrow, title, lead }: Props) {
  return (
    <div className="reveal">
      <p className="eyebrow">
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        {eyebrow}
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
