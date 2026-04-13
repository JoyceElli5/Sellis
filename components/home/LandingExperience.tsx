'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const REVEAL_MS = 1000;

type LandingExperienceProps = {
  children: ReactNode;
};

export default function LandingExperience({ children }: LandingExperienceProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    router.prefetch('/booking');
    const t = window.setTimeout(() => setReady(true), REVEAL_MS);
    return () => window.clearTimeout(t);
  }, [router]);

  return (
    <>
      <div
        aria-hidden={ready}
        className={`fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-off-white transition-opacity duration-500 ease-out ${
          ready ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className={`flex flex-col items-center gap-5 ${ready ? '' : 'landing-logo-pulse'}`}>
          <Image
            src="/logo.png"
            alt="Sellis Beauty Spa"
            width={120}
            height={120}
            className="h-[100px] w-auto object-contain drop-shadow-[0_8px_24px_rgba(168,134,90,0.25)] max-md:h-[80px]"
            priority
          />
          <span className="font-serif text-[0.65rem] font-bold uppercase tracking-[4px] text-gold-dark">
            Beauty Spa
          </span>
        </div>
      </div>

      <div
        className={`transition-opacity duration-500 ease-out ${ready ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: ready ? '80ms' : '0ms' }}
      >
        {children}
      </div>
    </>
  );
}
