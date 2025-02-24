
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
    // 模拟提交延迟
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <h1 className="text-3xl font-medium text-[#00008B] tracking-[0.1em] mb-2">
            为了更好的了解您的偏好，请完成下面的步骤
          </h1>
          <div className="w-2/3 mx-auto">
            <Progress 
              value={progress()} 
              className="h-2 bg-gray-200"
              style={{
                '--progress-background': progress() > 0 ? '#007BFF' : '#808080'
              } as React.CSSProperties}
            />
          </div>
        </motion.div>

        <section className="space-y-6">
          <h2 className="text-2xl font-medium text-[#00008B] border-b border-[#D3D3D3] pb-2">
            年龄段
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ageRanges.map((range) => (
              <motion.div
                key={range.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-200 border-[#87CEEB] hover:border-[#00008B]",
                    selectedAge === range.id
                      ? "border-[#00008B] bg-[#87CEEB]/10"
                      : "hover:bg-[#87CEEB]/5"
                  )}
                  onClick={() => setSelectedAge(range.id)}
                >
                  <CardHeader className="space-y-2">
                    {range.icon && (
                      <div className="w-10 h-10 mx-auto">
                        {Icons[range.icon]({ 
                          className: cn(
                            "w-full h-full transition-colors",
                            selectedAge === range.id ? "text-[#00008B]" : "text-gray-600"
                          )
                        })}
                      </div>
                    )}
                    <CardTitle className={cn(
                      "text-xl transition-colors",
                      selectedAge === range.id ? "text-[#00008B]" : "text-gray-700"
                    )}>
                      {range.label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-medium text-[#00008B] border-b border-[#D3D3D3] pb-2">
            喜欢的故事风格
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {storyStyles.map((style) => (
              <motion.div
                key={style.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-200 border-[#FFB6C1] hover:border-[#FF69B4]",
                    selectedStyles.includes(style.id)
                      ? "border-[#FF69B4] bg-[#FFB6C1]/10"
                      : "hover:bg-[#FFB6C1]/5"
                  )}
                  onClick={() => handleStyleSelection(style.id)}
                >
                  <CardHeader className="space-y-2">
                    {style.icon && (
                      <div className="w-10 h-10 mx-auto">
                        {Icons[style.icon]({ 
                          className: cn(
                            "w-full h-full transition-colors",
                            selectedStyles.includes(style.id) ? "text-[#FF69B4]" : "text-gray-600"
                          )
                        })}
                      </div>
                    )}
                    <CardTitle className={cn(
                      "text-xl transition-colors",
                      selectedStyles.includes(style.id) ? "text-[#FF69B4]" : "text-gray-700"
                    )}>
                      {style.label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-medium text-[#00008B] border-b border-[#D3D3D3] pb-2">
            朗读声音
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {voiceStyles.map((voice) => (
              <motion.div
                key={voice.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-200 border-[#87CEEB] hover:border-[#00008B] rounded-2xl overflow-hidden",
                    selectedVoice === voice.id
                      ? "border-[#00008B] bg-[#87CEEB]/10"
                      : "hover:bg-[#87CEEB]/5"
                  )}
                  onClick={() => setSelectedVoice(voice.id)}
                >
                  <CardHeader className="space-y-3 text-center">
                    {voice.icon && (
                      <div className="w-16 h-16 mx-auto">
                        {Icons[voice.icon]({ 
                          className: cn(
                            "w-full h-full transition-colors",
                            selectedVoice === voice.id ? "text-[#00008B]" : "text-gray-600"
                          )
                        })}
                      </div>
                    )}
                    <CardTitle className={cn(
                      "text-xl transition-colors",
                      selectedVoice === voice.id ? "text-[#00008B]" : "text-gray-700"
                    )}>
                      {voice.label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

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
