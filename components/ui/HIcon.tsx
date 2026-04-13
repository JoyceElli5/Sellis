import type { ComponentProps } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

type HIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, 'color'> & {
  className?: string;
};

export default function HIcon({ className, ...props }: HIconProps) {
  return <HugeiconsIcon {...props} className={className} color="currentColor" />;
}

