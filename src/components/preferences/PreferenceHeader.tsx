
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface PreferenceHeaderProps {
  progress: number;
}

export function PreferenceHeader({ progress }: PreferenceHeaderProps) {
  return (
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
          value={progress} 
          className="h-2 bg-gray-200"
          style={{
            '--progress-background': progress > 0 ? '#007BFF' : '#808080'
          } as React.CSSProperties}
        />
      </div>
    </motion.div>
  );
}
