const words = [
  'Stocks',
  'Forex',
  'Technical Analysis',
  'Risk Management',
  'Sales',
  'Business Development',
  'CRM',
  'AI Agents',
  'Automation',
];

function Row({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  // The list is rendered twice so the -50% loop is seamless.
  const items = [...words, ...words];
  return (
    <div className="flex overflow-hidden">
      <ul
        className={`marquee-track flex shrink-0 items-center gap-8 pe-8 ${reverse ? 'marquee-track--reverse' : ''}`}
        style={{ ['--speed' as string]: reverse ? '55s' : '45s' }}
      >
        {items.map((w, i) => (
          <li key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span
              className={`font-display text-4xl uppercase leading-none sm:text-5xl ${
                outline ? 'text-transparent' : 'text-white'
              }`}
              style={outline ? { WebkitTextStroke: '1.5px rgb(var(--ink) / 0.5)' } : undefined}
            >
              {w}
            </span>
            <span className="text-2xl text-[#bfdcff]">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two skewed ribbons of services/tech scrolling in opposite directions. Decorative. */
export function Marquee() {
  return (
    <div aria-hidden="true" dir="ltr" className="relative overflow-hidden py-10 sm:py-14">
      <div className="-mx-8 -rotate-2 bg-accent-strong py-4 shadow-[0_20px_60px_-20px_rgb(var(--accent)/0.6)]">
        <Row />
      </div>
      <div className="-mx-8 -mt-2 rotate-1 border-y border-line bg-surface py-3">
        <Row reverse outline />
      </div>
    </div>
  );
}
