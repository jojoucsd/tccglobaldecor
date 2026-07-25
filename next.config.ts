import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const isPages = process.env.GITHUB_PAGES === 'true';
const repoBase = '/tccglobaldecor';

const nextConfig: NextConfig = {
  output: isPages ? 'export' : undefined,
  basePath: isPages ? repoBase : '',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? repoBase : '' },
};

export default withNextIntl(nextConfig);
