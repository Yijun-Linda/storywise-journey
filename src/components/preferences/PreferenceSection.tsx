
import { type PreferenceItem } from "@/types/preferences";

interface PreferenceSectionProps {
  title: string;
  items: PreferenceItem[];
  selectedItems: string | string[];
  onSelect: (id: string) => void;
  variant: "age" | "story" | "voice";
}

export function PreferenceSection({ 
  title, 
  items, 
  selectedItems, 
  onSelect,
  variant 
}: PreferenceSectionProps) {
  const isSelected = (id: string) => 
    Array.isArray(selectedItems) 
      ? selectedItems.includes(id)
      : selectedItems === id;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-medium text-[#00008B] border-b border-[#D3D3D3] pb-2">
        {title}
      </h2>
      <div className={cn(
        "grid gap-4",
        variant === "age" ? "grid-cols-1 md:grid-cols-3 gap-6" :
        variant === "story" ? "grid-cols-2 md:grid-cols-4" :
        "grid-cols-1 md:grid-cols-2 gap-8"
      )}>
        {items.map((item) => (
          <PreferenceCard
            key={item.id}
            item={item}
            isSelected={isSelected(item.id)}
            onClick={() => onSelect(item.id)}
            variant={variant}
          />
        ))}
      </div>
    </section>
  );
}
