
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PreferenceHeader } from "@/components/preferences/PreferenceHeader";
import { PreferenceSection } from "@/components/preferences/PreferenceSection";
import { ageRanges, storyStyles, voiceStyles } from "@/types/preferences";
import { cn } from "@/lib/utils";

const Preferences = () => {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = () => {
    let total = 0;
    if (selectedAge) total += 33.33;
    if (selectedStyles.length > 0) total += 33.33;
    if (selectedVoice) total += 33.33;
    return Math.min(total, 100);
  };

  const handleStyleSelection = (id: string) => {
    setSelectedStyles((prev) =>
      prev.includes(id)
        ? prev.filter((style) => style !== id)
        : [...prev, id]
    );
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/story");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <PreferenceHeader progress={progress()} />

        <PreferenceSection
          title="年龄段"
          items={ageRanges}
          selectedItems={selectedAge}
          onSelect={setSelectedAge}
          variant="age"
        />

        <PreferenceSection
          title="喜欢的故事风格"
          items={storyStyles}
          selectedItems={selectedStyles}
          onSelect={handleStyleSelection}
          variant="story"
        />

        <PreferenceSection
          title="朗读声音"
          items={voiceStyles}
          selectedItems={selectedVoice}
          onSelect={setSelectedVoice}
          variant="voice"
        />

        <motion.div
          className="flex justify-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!selectedAge || selectedStyles.length === 0 || !selectedVoice || isSubmitting}
            className={cn(
              "px-12 py-8 text-xl font-medium rounded-full",
              "bg-[#FFA500] hover:bg-[#FF8C00] transition-all duration-300",
              "transform hover:scale-105 disabled:hover:scale-100",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-lg hover:shadow-xl",
              "text-white hover:text-[#FFFFE0]"
            )}
          >
            下一步
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preferences;
