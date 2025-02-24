
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { PreferenceItem } from "@/types/preferences";

interface PreferenceCardProps {
  item: PreferenceItem;
  isSelected: boolean;
  onClick: () => void;
  variant: "age" | "story" | "voice";
}

export function PreferenceCard({ item, isSelected, onClick, variant }: PreferenceCardProps) {
  const variants = {
    age: {
      border: "border-[#87CEEB] hover:border-[#00008B]",
      bg: "border-[#00008B] bg-[#87CEEB]/10",
      hover: "hover:bg-[#87CEEB]/5",
      text: "text-[#00008B]",
    },
    story: {
      border: "border-[#FFB6C1] hover:border-[#FF69B4]",
      bg: "border-[#FF69B4] bg-[#FFB6C1]/10",
      hover: "hover:bg-[#FFB6C1]/5",
      text: "text-[#FF69B4]",
    },
    voice: {
      border: "border-[#87CEEB] hover:border-[#00008B]",
      bg: "border-[#00008B] bg-[#87CEEB]/10",
      hover: "hover:bg-[#87CEEB]/5",
      text: "text-[#00008B]",
    },
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200",
          variants[variant].border,
          isSelected ? variants[variant].bg : variants[variant].hover,
          variant === "voice" && "rounded-2xl overflow-hidden"
        )}
        onClick={onClick}
      >
        <CardHeader className={cn("space-y-2", variant === "voice" && "space-y-3 text-center")}>
          {item.icon && (
            <div className={cn("mx-auto", 
              variant === "voice" ? "w-16 h-16" : "w-10 h-10"
            )}>
              {Icons[item.icon]({ 
                className: cn(
                  "w-full h-full transition-colors",
                  isSelected ? variants[variant].text : "text-gray-600"
                )
              })}
            </div>
          )}
          <CardTitle className={cn(
            "text-xl transition-colors",
            isSelected ? variants[variant].text : "text-gray-700"
          )}>
            {item.label}
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
