
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PreferenceItem {
  id: string;
  label: string;
  icon?: keyof typeof Icons;
}

const ageRanges: PreferenceItem[] = [
  { id: "3-5", label: "3 - 5岁", icon: "number3" },
  { id: "6-8", label: "6 - 8岁", icon: "number6" },
  { id: "9-12", label: "9 - 12岁", icon: "number9" },
];

const storyStyles: PreferenceItem[] = [
  { id: "warm", label: "温馨", icon: "heart" },
  { id: "humor", label: "幽默", icon: "smile" },
  { id: "adventure", label: "探险", icon: "compass" },
  { id: "scifi", label: "科幻", icon: "rocket" },
];

const voiceStyles: PreferenceItem[] = [
  { id: "custom", label: "个性化声音", icon: "mic" },
  { id: "default", label: "默认声音", icon: "speaker" },
];

const Preferences = () => {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");

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

  const handleNext = () => {
    navigate("/story");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-8"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            为了更好的了解您的偏好，请完成下面的步骤
          </h1>
          <Progress value={progress()} className="w-1/2 mx-auto" />
        </motion.div>

        <section className="space-y-4">
          <h2 className="text-xl font-medium text-gray-800">年龄段</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ageRanges.map((range) => (
              <motion.div
                key={range.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    selectedAge === range.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  )}
                  onClick={() => setSelectedAge(range.id)}
                >
                  <CardHeader className="space-y-1">
                    {range.icon && (
                      <div className="w-8 h-8">
                        {Icons[range.icon]({ className: "w-full h-full" })}
                      </div>
                    )}
                    <CardTitle className="text-lg">{range.label}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium text-gray-800">喜欢的故事风格</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {storyStyles.map((style) => (
              <motion.div
                key={style.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    selectedStyles.includes(style.id)
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  )}
                  onClick={() => handleStyleSelection(style.id)}
                >
                  <CardHeader className="space-y-1">
                    {style.icon && (
                      <div className="w-8 h-8">
                        {Icons[style.icon]({ className: "w-full h-full" })}
                      </div>
                    )}
                    <CardTitle className="text-lg">{style.label}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-medium text-gray-800">朗读声音</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {voiceStyles.map((voice) => (
              <motion.div
                key={voice.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    selectedVoice === voice.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  )}
                  onClick={() => setSelectedVoice(voice.id)}
                >
                  <CardHeader className="space-y-1">
                    {voice.icon && (
                      <div className="w-12 h-12">
                        {Icons[voice.icon]({ className: "w-full h-full" })}
                      </div>
                    )}
                    <CardTitle className="text-lg">{voice.label}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div
          className="flex justify-center pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            size="lg"
            onClick={handleNext}
            className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
            disabled={!selectedAge || selectedStyles.length === 0 || !selectedVoice}
          >
            下一步
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preferences;
