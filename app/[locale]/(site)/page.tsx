import { setRequestLocale, getTranslations } from 'next-intl/server';
import HeroCarousel from '@/components/HeroCarousel';
import About from '@/components/about/About';
import CapabilitySection from '@/components/capability/CapabilitySection';
import AwardsTeaser from '@/components/awards/AwardsTeaser';
import ClientsBelt from '@/components/clients/ClientsBelt';
import ConnectCTA from '@/components/connect/ConnectSection';
import CollabTeaser from '@/components/collab/CollabTeaser';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('clients');

  return (
    <>
      <HeroCarousel />
      <About />
      <ClientsBelt seed={1} />
      <CapabilitySection />
      <ClientsBelt seed={3} title={t('globalPartners')} />
      <AwardsTeaser />
      <CollabTeaser />
      <ConnectCTA />
    </>
  );
}
