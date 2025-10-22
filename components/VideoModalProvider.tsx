// app/(site)/components/VideoModalProvider.tsx
"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Ctx = {
  open: (src: string) => void;
  close: () => void;
};

const VideoCtx = createContext<Ctx | null>(null);

export function useVideoModal() {
  const ctx = useContext(VideoCtx);
  if (!ctx) throw new Error("useVideoModal must be used within <VideoModalProvider>");
  return ctx;
}

export default function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);

  const open = useCallback((s: string) => setSrc(s), []);
  const close = useCallback(() => setSrc(null), []);

  return (
    <VideoCtx.Provider value={{ open, close }}>
      {children}
      {/* Modal lives at layout level so it persists across route changes */}
      {src ? (
        <div
          className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm flex items-center justify-center p-3"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div
            className="relative w-[min(96vw,1280px)] aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* No visible title; make the video larger and full-bleed */}
            <iframe
              title="Video"
              src={`${src}?autoplay=1&muted=0&disable_title=1`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
              loading="eager"
            />
            <button
              onClick={close}
              className="absolute top-2 right-2 rounded-full bg-white/90 hover:bg-white px-3 py-1 text-xs font-semibold text-black"
              aria-label="Close video"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </VideoCtx.Provider>
  );
}
