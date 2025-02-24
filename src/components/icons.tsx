
import {
  Heart,
  Smile,
  Compass,
  Rocket,
  Mic,
  Speaker,
  type Icon as LucideIcon,
} from "lucide-react";

export const Icons = {
  number3: ({ className, ...props }: { className?: string }) => (
    <div className={className} {...props}>3</div>
  ),
  number6: ({ className, ...props }: { className?: string }) => (
    <div className={className} {...props}>6</div>
  ),
  number9: ({ className, ...props }: { className?: string }) => (
    <div className={className} {...props}>9</div>
  ),
  heart: Heart,
  smile: Smile,
  compass: Compass,
  rocket: Rocket,
  mic: Mic,
  speaker: Speaker,
} as const;

export type Icon = keyof typeof Icons;
