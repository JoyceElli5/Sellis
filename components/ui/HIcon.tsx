'use client';

import { HugeiconsIcon } from '@hugeicons/react';

type HIconProps = {
  icon: React.ComponentProps<typeof HugeiconsIcon>['icon'];
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export default function HIcon({ icon, size = 20, strokeWidth = 1.8, className }: HIconProps) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} className={className} />;
}
