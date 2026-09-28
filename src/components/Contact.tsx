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
import { getScreenshot } from '../lib/screenshots';
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
      className="group flex min-h-[64px] items-center gap-4 rounded-2xl border border-line bg-surface/60 p-4 transition hover:-translate-y-0.5 hover:border-accent/60"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-accent/70 text-accent">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-bold">{title}</span>
        <span className="block truncate text-sm text-muted">{text}</span>
      </span>
      {external && <span className="sr-only">{t.a11y.opensInNewTab}</span>}
    </a>
  );
}

/** Laptop + phone frames showing real project screenshots (only when they exist). */
function DeviceMockup() {
  const { t } = usePreferences();
  const laptop = getScreenshot('kero-tours');
  const phone = getScreenshot('leadora');
  if (!laptop) return null;

  return (
    <div className="relative mx-auto w-full max-w-xl" role="img" aria-label={t.contact.mockupAlt}>
      <div
        aria-hidden="true"
        className="absolute inset-x-10 bottom-0 top-1/4 rounded-full bg-accent/35 blur-3xl"
      />
      <div className="relative">
        <div className="rounded-t-2xl border-[10px] border-b-0 border-[#1c1c1f] bg-[#1c1c1f] shadow-lift">
          <img
            src={asset(laptop.desktopSmall)}
            width={720}
            height={450}
            alt=""
            loading="lazy"
            decoding="async"
            className="block aspect-[16/10] w-full rounded-md object-cover object-top"
          />
        </div>
        <div className="relative mx-[-6%] h-4 rounded-b-xl bg-gradient-to-b from-[#3a3a3f] to-[#1c1c1f]">
          <div className="absolute inset-x-[42%] top-0 h-1.5 rounded-b-md bg-[#141416]" />
        </div>
      </div>
      {phone?.mobile && (
        <div className="absolute -bottom-6 end-[-4%] w-[26%] overflow-hidden rounded-[1.4rem] border-[5px] border-[#1c1c1f] bg-[#1c1c1f] shadow-lift">
          <img
            src={asset(phone.mobileSmall ?? phone.mobile)}
            width={phone.mobileWidth}
            height={phone.mobileHeight}
            alt=""
            loading="lazy"
            decoding="async"
            className="block aspect-[390/844] w-full rounded-[1rem] object-cover object-top"
          />
        </div>
      )}
    </div>
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
        <div className="force-dark relative overflow-hidden rounded-[2rem] border border-line bg-bg px-5 py-12 sm:px-10 sm:py-16 lg:px-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -end-24 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -start-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                id="contact-title"
                eyebrow={t.contact.eyebrow}
                title={t.contact.title}
                lead={t.contact.lead}
              />

              <div className="reveal mt-8 space-y-3">
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex min-h-[72px] items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 text-lg font-extrabold text-[#052e16] shadow-lift transition hover:-translate-y-0.5 hover:bg-[#2ee173] sm:text-xl"
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

                <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface/60 p-2 ps-4">
                  <MailIcon size={20} className="shrink-0 text-accent" />
                  <a
                    href={`mailto:${site.email}`}
                    className="min-h-[44px] min-w-0 flex-1 truncate py-2.5 font-semibold underline-offset-4 hover:underline"
                    dir="ltr"
                  >
                    <span className="sr-only">{t.contact.email}: </span>
                    {site.email}
                  </a>
                  <button
                    type="button"
                    onClick={onCopy}
                    className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl bg-accent-strong px-3.5 text-sm font-bold text-accent-ink transition hover:opacity-90"
                  >
                    {copy === 'copied' ? <CheckIcon size={17} /> : <CopyIcon size={17} />}
                    <span className="hidden sm:inline">
                      {copy === 'copied' ? t.contact.copied : t.contact.copy}
                    </span>
                    <span className="sr-only sm:hidden">{t.contact.copy}</span>
                  </button>
                </div>
                <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm text-muted">
                  {copy === 'copied'
                    ? t.contact.copied
                    : copy === 'failed'
                      ? t.contact.copyFailed
                      : ''}
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <LinkCard
                    href={site.linkedinUrl}
                    icon={<LinkedInIcon size={18} />}
                    title={t.contact.linkedin}
                    text={t.contact.linkedinText}
                  />
                  <LinkCard
                    href={asset(site.cvFile)}
                    icon={<DownloadIcon size={18} />}
                    title={t.contact.cv}
                    text={t.contact.cvText}
                    external={false}
                    download={site.cvFile}
                  />
                  {site.githubUrl && (
                    <LinkCard
                      href={site.githubUrl}
                      icon={<GitHubIcon size={18} />}
                      title={t.contact.github}
                      text={t.contact.githubText}
                    />
                  )}
                </div>
                <p className="inline-flex items-center gap-2 pt-2 text-sm text-muted">
                  <PinIcon size={16} className="text-accent" />
                  {t.contact.location}
                </p>
              </div>
            </div>

            <div className="reveal pb-8">
              <DeviceMockup />
              <p className="mt-14 text-center font-display text-3xl leading-tight sm:text-4xl">
                {t.contact.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
