// app/(site)/data/clients.ts
export type ClientLogo = { src: string; alt: string };

const base =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_PATH ?? ""
    : "";

// if your files are: client_img_1.avif ... client_img_63.avif
export const ALL_CLIENT_LOGOS: ClientLogo[] = Array.from({ length: 63 }, (_, i) => {
  const n = i + 1; // no leading zero
  return {
    src: `${base}/images/clients/client_img_${n}.avif`,
    alt: `Client ${n}`,
  };
});

