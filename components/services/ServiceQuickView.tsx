"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { ApiService } from "@/lib/api/types";
import { formatPrice } from "@/lib/api/types";
import type { CategoryMeta } from "@/lib/categoryMeta";
import HIcon from '@/components/ui/HIcon';
import { ArrowRight01Icon, Cancel01Icon, SparklesIcon } from '@hugeicons/core-free-icons';

export interface QuickViewCategory {
  id: string;
  name: string;
  description: string | null;
  meta: CategoryMeta;
}

interface ServiceQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  category: QuickViewCategory | null;
  services: ApiService[];
}

export default function ServiceQuickView({
  isOpen,
  onClose,
  category,
  services,
}: ServiceQuickViewProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!category) return null;

  const bookHref = `/booking?service=${encodeURIComponent(category.name)}`;
  const primaryService = services[0];
  const emotionalLine =
    primaryService?.description ??
    `A signature ${category.name.toLowerCase()} ritual designed to reset stress, restore glow, and leave you lighter than you walked in.`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={onClose}
            className="fixed inset-0 z-400 bg-black/52 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          />

          <motion.aside
            className="fixed inset-y-0 right-0 z-401 flex w-full max-w-[470px] flex-col overflow-hidden border-l border-cream-dark bg-[#fffdf9] font-sans shadow-2xl"
            initial={{ x: 520 }}
            animate={{ x: 0 }}
            exit={{ x: 520 }}
            transition={{ type: 'spring', stiffness: 310, damping: 34, mass: 0.82 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${category.name} quick view`}
          >
            <div className="relative shrink-0 border-b border-cream-dark bg-[#fffdf9]/95 px-5 pb-4 pt-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[0.64rem] font-extrabold uppercase tracking-[1.5px] text-gold-dark">
                  <HIcon icon={SparklesIcon} size={14} strokeWidth={1.8} />
                  Treatment Preview
                </div>
                <motion.button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-dark bg-white text-text-secondary transition-colors hover:bg-cream"
                  whileTap={{ scale: 0.94 }}
                >
                  <HIcon icon={Cancel01Icon} size={18} strokeWidth={1.8} />
                </motion.button>
              </div>
              <h2 className="text-[1.4rem] font-extrabold text-text-primary">
                {category.name}
              </h2>
              <p className="mt-1 text-[0.84rem] font-semibold text-text-secondary">
                Come in heavy. Leave weightless.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="px-4 pt-4">
                <div className="relative h-[248px] shrink-0 overflow-hidden rounded-spa-lg" style={{ background: category.meta.gradient }}>
                  <Image
                    src={category.meta.coverImage}
                    alt={category.name}
                    fill
                    style={{ objectFit: 'cover', opacity: 0.8 }}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />
                </div>
              </div>

              <motion.div
                className="border-b border-cream-dark px-5 py-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.25 }}
              >
                <p className="text-[0.92rem] font-medium leading-relaxed text-text-secondary">{emotionalLine}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-cream-dark bg-cream px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[1px] text-text-secondary">
                    45 - 90 min options
                  </span>
                  <span className="rounded-full border border-cream-dark bg-cream px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[1px] text-text-secondary">
                    therapist-led
                  </span>
                  <span className="rounded-full border border-cream-dark bg-cream px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[1px] text-text-secondary">
                    premium products
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="px-4 py-4"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } } }}
              >
                <h3 className="mb-3 text-[0.72rem] font-extrabold uppercase tracking-[1.7px] text-text-light">Available Treatments</h3>
                {services.length === 0 ? (
                  <p className="mt-8 text-center text-[0.9rem] text-text-light">No services found.</p>
                ) : (
                  services.map((svc) => (
                    <ServiceRow key={svc.id} svc={svc} categoryName={category.name} onClose={onClose} />
                  ))
                )}
              </motion.div>
            </div>

            <motion.div
              className="shrink-0 border-t border-cream-dark bg-white px-5 py-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.25 }}
            >
              <div className="mb-3 flex items-center justify-between gap-2 text-[0.8rem]">
                <span className="font-bold text-text-light">From</span>
                <span className="text-[1.1rem] font-extrabold text-gold-dark">
                  {primaryService ? formatPrice(primaryService) : 'GHs --'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={bookHref}
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-gold-dark py-3 text-[0.82rem] font-extrabold tracking-wide text-gold-dark transition-colors hover:bg-gold-dark hover:text-white"
                >
                  Book now
                </Link>
                <Link
                  href="/services"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-linear-to-br from-gold-dark to-gold py-3 text-[0.82rem] font-extrabold tracking-wide text-white"
                >
                  Full menu
                  <HIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.8} />
                </Link>
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ServiceRow({
  svc,
  categoryName,
  onClose,
}: {
  svc: ApiService;
  categoryName: string;
  onClose: () => void;
}) {
  const bookHref = `/booking?service=${encodeURIComponent(`${categoryName} › ${svc.name}`)}`;

  return (
    <motion.div
      className="mb-2 rounded-spa-md border border-cream-dark bg-white px-3.5 py-3 transition-colors hover:border-gold/45"
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
      }}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-[0.9rem] font-extrabold text-text-primary">{svc.name}</div>
          {svc.description && (
            <div className="mt-1 line-clamp-2 text-[0.74rem] font-medium leading-relaxed text-text-secondary">{svc.description}</div>
          )}
          {svc.hasVariants && svc.variants.length > 0 && (
            <div className="mt-1 text-[0.72rem] font-semibold text-text-light">
              {svc.variants.map((v) => `${v.name}: GH₵ ${v.price}`).join(" · ")}
            </div>
          )}
        </div>
        <div className="shrink-0 whitespace-nowrap text-[0.9rem] font-extrabold text-gold-dark">{formatPrice(svc)}</div>
      </div>
      <Link
        href={bookHref}
        onClick={onClose}
        className="inline-flex items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.6px] text-gold-dark transition-colors hover:text-brown-dark"
      >
        Book service
        <HIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.8} />
      </Link>
    </motion.div>
  );
}
