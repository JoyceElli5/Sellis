'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgObject } from '@hugeicons/core-free-icons';

type HIconProps = {
  icon: IconSvgObject;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export default function HIcon({ icon, size = 20, strokeWidth = 1.8, className }: HIconProps) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} className={className} />;
}
