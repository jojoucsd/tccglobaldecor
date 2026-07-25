'use client';
import Image from 'next/image';
import Section from '@/components/Section';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

const SUPPORT_IMAGE = `${bp}/images/capability/craftsmanship.avif`;

const UN_IMAGES = [
  { src: `${bp}/images/capability/un1.avif`, alt: 'United Nations Headquarters NYC Oman Heritage Walk - Detail 1' },
  { src: `${bp}/images/capability/un2.avif`, alt: 'United Nations Headquarters NYC Oman Heritage Walk - Detail 2' },
  { src: `${bp}/images/capability/un3.avif`, alt: 'United Nations Headquarters NYC Oman Heritage Walk - Detail 3' },
];

export default function Craftsmanship() {
  const t = useTranslations('craftsmanship');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % UN_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section className="bg-white !px-0" pad="sm" id="craftsmanship">
      <div className="px-4 sm:px-6 md:px-12 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-14 items-stretch">
          <div className="flex flex-col justify-between h-full">
            <header>
              <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-neutral-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold" />
                {t('eyebrow')}
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-brand-ink">
                {t('title')}
              </h2>
              <div className="mt-3 h-[3px] w-20 rounded-full bg-brand-gold" />
            </header>

            <div className="relative mt-6 md:mt-10 mb-6 md:mb-10 self-start w-[85%] aspect-[5/4] overflow-hidden rounded-2xl ring-1 ring-neutral-200 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
              <Image
                src={SUPPORT_IMAGE}
                alt="TCC artisans preparing yarns for custom carpet design"
                fill
                className="object-cover"
                priority
              />
            </div>

            <p className="text-[15px] sm:text-base leading-relaxed text-neutral-800">
              {t('body')}
            </p>
          </div>

          <div
            className="relative w-full h-[480px] md:h-full overflow-hidden rounded-2xl ring-1 ring-neutral-200 shadow-[0_18px_45px_rgba(0,0,0,0.12)] group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            tabIndex={0}
            role="region"
            aria-label="Craftsmanship carousel"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setCurrentSlide((p) => (p - 1 + UN_IMAGES.length) % UN_IMAGES.length);
              else if (e.key === 'ArrowRight') setCurrentSlide((p) => (p + 1) % UN_IMAGES.length);
            }}
          >
            {UN_IMAGES.map((image, index) => (
              <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <Image src={image.src} alt={image.alt} fill className="object-cover" priority={index === 0} />
              </div>
            ))}

            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + UN_IMAGES.length) % UN_IMAGES.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % UN_IMAGES.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute inset-x-0 bottom-0 bg-black/35 backdrop-blur-sm px-3 py-2">
              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-[11px] font-medium tracking-wide uppercase text-white">
                  {t('unCaption')}
                </p>
                <div className="flex gap-1.5">
                  {UN_IMAGES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
