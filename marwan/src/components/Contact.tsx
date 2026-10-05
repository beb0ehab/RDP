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
} from './Icons';
import { getScreenshot } from '../lib/screenshots';
import { SplitWords } from './SplitWords';

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

/** One row of the contact list: red icon circle + label + value. */
function ContactRow({
  href,
  icon,
  label,
  value,
  external = true,
  download,
  ltr = false,
}: {
  href?: string;
  icon: ReactNode;
  label: string;
  value: string;
  external?: boolean;
  download?: string;
  ltr?: boolean;
}) {
  const { t } = usePreferences();
  const content = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-accent text-accent">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        <span className="block truncate text-sm font-semibold" dir={ltr ? 'ltr' : undefined}>
          {value}
        </span>
      </span>
    </>
  );
  if (!href) return <div className="flex min-h-[52px] items-center gap-4">{content}</div>;
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...(download ? { download } : {})}
      className="group flex min-h-[52px] items-center gap-4 rounded-lg transition-colors hover:text-accent"
    >
      {content}
      {external && <span className="sr-only">{t.a11y.opensInNewTab}</span>}
    </a>
  );
}

/** Laptop + phone frames showing real project screenshots (only when they exist). */
function DeviceMockup() {
  const { t } = usePreferences();
  const laptop = getScreenshot('volume4t');
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
    <section
      id="contact"
      className="force-dark relative overflow-hidden bg-bg py-16 sm:py-20"
      aria-labelledby="contact-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-32 top-10 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-3xl"
      />
      <div className="container relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <h2
            id="contact-title"
            data-split
            className="reveal max-w-md font-display text-5xl leading-[0.95] sm:text-6xl"
          >
            <SplitWords text={t.contact.title} />
          </h2>
          <p className="reveal mt-4 max-w-md text-pretty text-muted" data-anim="fade">
            {t.contact.intro}
          </p>

          <a
            href={`mailto:${site.email}`}
            data-anim="fade"
            data-magnetic
            className="reveal mt-7 inline-flex min-h-[60px] w-full items-center justify-center gap-3 rounded-md bg-accent-strong px-6 text-lg font-extrabold text-white shadow-lift transition-colors hover:bg-accent sm:w-auto"
          >
            <MailIcon size={24} />
            {t.contact.whatsapp}
          </a>

          <div className="reveal mt-8 space-y-2" data-anim="fade">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <ContactRow
                  href={`mailto:${site.email}`}
                  icon={<MailIcon size={18} />}
                  label={t.contact.email}
                  value={site.email}
                  external={false}
                  ltr
                />
              </div>
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-md border border-line px-3 text-xs font-bold uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
              >
                {copy === 'copied' ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                <span className="hidden sm:inline">
                  {copy === 'copied' ? t.contact.copied : t.contact.copy}
                </span>
                <span className="sr-only sm:hidden">{t.contact.copy}</span>
              </button>
            </div>
            <p role="status" aria-live="polite" className="sr-only">
              {copy === 'copied' ? t.contact.copied : copy === 'failed' ? t.contact.copyFailed : ''}
            </p>
            <ContactRow
              href={site.linkedinUrl}
              icon={<LinkedInIcon size={17} />}
              label={t.contact.linkedin}
              value={site.linkedinDisplay}
              ltr
            />
            {site.githubUrl && (
              <ContactRow
                href={site.githubUrl}
                icon={<GitHubIcon size={17} />}
                label={t.contact.github}
                value={site.githubUrl.replace(/^https?:\/\//, '')}
                ltr
              />
            )}
            <ContactRow
              href={asset(site.cvFile)}
              icon={<DownloadIcon size={18} />}
              label={t.contact.cvText}
              value={t.contact.cv}
              external={false}
              download={site.cvDownloadName}
            />
            <ContactRow
              icon={<PinIcon size={18} />}
              label={t.hero.basedLabel}
              value={t.contact.location}
            />
          </div>

          <div
            className="reveal mt-10 flex items-center gap-4 border-t border-line pt-6"
            data-anim="fade"
          >
            <span
              aria-hidden="true"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-accent-strong font-display text-xl text-white"
              dir="ltr"
            >
              {site.initials}
            </span>
            <p className="font-display text-xl leading-tight">{t.contact.tagline}</p>
          </div>
        </div>

        <div className="reveal pb-8" data-parallax="float">
          <div className="float-y">
            <DeviceMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
