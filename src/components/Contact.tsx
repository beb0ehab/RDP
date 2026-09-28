import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { asset, site } from '../config';
import { usePreferences } from '../context/Preferences';
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PinIcon,
  WhatsAppIcon,
} from './Icons';
import { SectionHeading } from './SectionHeading';

type CopyState = 'idle' | 'copied' | 'failed';

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

function LinkCard({
  href,
  icon,
  title,
  text,
  external = true,
  download,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  text: string;
  external?: boolean;
  download?: string;
}) {
  const { t } = usePreferences();
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...(download ? { download } : {})}
      className="group flex min-h-[64px] items-center gap-4 rounded-2xl border border-bg/15 bg-bg/5 p-4 transition hover:-translate-y-0.5 hover:border-bg/40 hover:bg-bg/10 focus-visible:outline-bg"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bg/10">{icon}</span>
      <span className="min-w-0">
        <span className="block font-bold">{title}</span>
        <span className="block truncate text-sm text-bg/75">{text}</span>
      </span>
      {external && <span className="sr-only">{t.a11y.opensInNewTab}</span>}
    </a>
  );
}

export function Contact() {
  const { t } = usePreferences();
  const [copy, setCopy] = useState<CopyState>('idle');
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(site.email);
    setCopy(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopy('idle'), 2500);
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-5 py-12 text-bg sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -end-24 -top-24 h-80 w-80 rounded-full bg-accent/30 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="[&_.eyebrow>span]:bg-accent-inv [&_.eyebrow]:text-accent-inv [&_.section-lead]:text-bg/80">
              <SectionHeading
                id="contact-title"
                eyebrow={t.contact.eyebrow}
                title={t.contact.title}
                lead={t.contact.lead}
              />
              <p className="reveal mt-6 inline-flex items-center gap-2 text-sm text-bg/75">
                <PinIcon size={16} />
                {t.contact.location}
              </p>
            </div>

            <div className="reveal space-y-3">
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener"
                className="flex min-h-[72px] items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 text-lg font-extrabold text-[#052e16] shadow-lift transition hover:-translate-y-0.5 hover:bg-[#2ee173] focus-visible:outline-bg sm:text-xl"
              >
                <WhatsAppIcon size={26} />
                <span>
                  {t.contact.whatsapp}
                  <span className="block text-sm font-semibold opacity-80" dir="ltr">
                    {site.whatsappDisplay}
                  </span>
                </span>
                <span className="sr-only">{t.a11y.opensInNewTab}</span>
              </a>

              <div className="flex items-center gap-2 rounded-2xl border border-bg/15 bg-bg/5 p-2 ps-4">
                <MailIcon size={20} className="shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="min-h-[44px] min-w-0 flex-1 truncate py-2.5 font-semibold underline-offset-4 hover:underline focus-visible:outline-bg"
                  dir="ltr"
                >
                  <span className="sr-only">{t.contact.email}: </span>
                  {site.email}
                </a>
                <button
                  type="button"
                  onClick={onCopy}
                  className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl bg-bg px-3.5 text-sm font-bold text-ink transition hover:opacity-90 focus-visible:outline-bg"
                >
                  {copy === 'copied' ? <CheckIcon size={17} /> : <CopyIcon size={17} />}
                  <span className="hidden sm:inline">
                    {copy === 'copied' ? t.contact.copied : t.contact.copy}
                  </span>
                  <span className="sr-only sm:hidden">{t.contact.copy}</span>
                </button>
              </div>
              <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm text-bg/80">
                {copy === 'copied'
                  ? t.contact.copied
                  : copy === 'failed'
                    ? t.contact.copyFailed
                    : ''}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <LinkCard
                  href={site.linkedinUrl}
                  icon={<LinkedInIcon size={20} />}
                  title={t.contact.linkedin}
                  text={t.contact.linkedinText}
                />
                <LinkCard
                  href={asset(site.cvFile)}
                  icon={<DownloadIcon size={20} />}
                  title={t.contact.cv}
                  text={t.contact.cvText}
                  external={false}
                  download={site.cvFile}
                />
                {site.githubUrl && (
                  <LinkCard
                    href={site.githubUrl}
                    icon={<GitHubIcon size={20} />}
                    title={t.contact.github}
                    text={t.contact.githubText}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
