'use client';

import { useMessages, useTranslations } from 'next-intl';
import Section from '@/components/Section';
import AlternatingCard from '@/components/AlternatingCard';
import { useRouter } from 'next/navigation';
import { useVideoModal } from '@/components/VideoModalProvider';
import { AWARDS } from '@/app/(site)/data/awards';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Repeating vertical stagger for the "trophy case" look — cycles by index so
// any number of awards gets varied placement without hand-tuning each one.
const STAGGER = ['md:top-3', 'md:-top-4', 'md:top-5', 'md:-top-1'];

export default function AwardsTeasersRow() {
  const t = useTranslations('awards');
  const messages = useMessages();
  const awardTitleMap = (messages?.awardTitles as Record<string, string>) ?? {};
  const router = useRouter();
  const video = useVideoModal();

  const handlePlay = (videoUrl: string, href: string) => {
    video.open(videoUrl);
    router.push(href, { scroll: true });
  };

  return (
    <Section id="awards" className="bg-neutral-50 text-brand-ink pt-10 pb-14 sm:pt-12 sm:pb-16">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold inline-flex items-center gap-3">
          <span className="inline-block h-[3px] w-8 bg-brand-gold rounded-full" />
          {t('title')}
        </h2>
        <p className="mt-2 text-sm text-neutral-600">{t('subtitle')}</p>
      </div>

      <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-[50px] justify-items-center [&_h3]:text-center [&_h3]:line-clamp-2">
        {AWARDS.map((award, i) => {
          const title = awardTitleMap[award.slug] ?? award.slug;
          const href = `/gallery/${award.slug}`;
          const imageSrc = `${bp}/images/awards/${award.imageSrc}`;
          const offset = STAGGER[i % STAGGER.length];

          return (
            <li key={award.slug} className={`relative w-full max-w-[240px] sm:max-w-[230px] md:max-w-[250px] ${offset}`}>
              {award.video ? (
                <button
                  onClick={() => handlePlay(award.video!, href)}
                  className="group block w-full text-left"
                  aria-label={`${t('playButton')} — ${title}`}
                >
                  <div className="relative">
                    <AlternatingCard title={title} imageSrc={imageSrc} variant="imageTop" className="w-full" />
                    <span className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-black/55 group-hover:bg-black/70 px-3 py-1.5 text-xs font-semibold text-white transition">
                        ▶ {t('playButton')}
                      </span>
                    </span>
                  </div>
                </button>
              ) : (
                <AlternatingCard title={title} imageSrc={imageSrc} href={href} variant="imageTop" className="w-full" />
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
