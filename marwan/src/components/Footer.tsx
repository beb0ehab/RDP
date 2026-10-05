import { site } from '../config';
import { usePreferences } from '../context/Preferences';
import { ArrowUpIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export function Footer() {
  const { t } = usePreferences();
  const year = new Date().getFullYear();

  const links = [
    { href: `mailto:${site.email}`, label: t.contact.email, Icon: MailIcon, external: false },
    { href: site.linkedinUrl, label: 'LinkedIn', Icon: LinkedInIcon, external: true },
    ...(site.githubUrl
      ? [{ href: site.githubUrl, label: 'GitHub', Icon: GitHubIcon, external: true }]
      : []),
  ];

  return (
    <footer className="border-t border-line">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {year} {t.hero.name}. {t.footer.rights}
        </p>
        <ul className="flex items-center gap-1">
          {links.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                className="grid h-11 w-11 place-items-center rounded-lg transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#top"
              aria-label={t.footer.backToTop}
              title={t.footer.backToTop}
              className="grid h-11 w-11 place-items-center rounded-lg transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <ArrowUpIcon size={18} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
