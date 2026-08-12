import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import HeaderWrapper from '@/components/HeaderWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoModalProvider from '@/components/VideoModalProvider';
import PageviewTracker from '@/components/analytics/PageviewTracker';
import { getSiteSetting } from '@/lib/siteSettings';

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tradeShowLabel = await getSiteSetting('trade_show_badge');

  return (
    <VideoModalProvider>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      <div className="flex min-h-screen flex-col bg-white text-gray-900">
        <HeaderWrapper>
          <Header tradeShowLabel={tradeShowLabel} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </HeaderWrapper>
      </div>
    </VideoModalProvider>
  );
}
