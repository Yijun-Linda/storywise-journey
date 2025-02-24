
import { type Icon } from "@/components/icons";

export interface PreferenceItem {
  id: string;
  label: string;
  icon?: Icon;
}

export const ageRanges: PreferenceItem[] = [
  { id: "3-5", label: "3 - 5岁", icon: "number3" },
  { id: "6-8", label: "6 - 8岁", icon: "number6" },
  { id: "9-12", label: "9 - 12岁", icon: "number9" },
];

export const storyStyles: PreferenceItem[] = [
  { id: "warm", label: "温馨", icon: "heart" },
  { id: "humor", label: "幽默", icon: "smile" },
  { id: "adventure", label: "探险", icon: "compass" },
  { id: "scifi", label: "科幻", icon: "rocket" },
];

export const voiceStyles: PreferenceItem[] = [
  { id: "custom", label: "个性化声音", icon: "mic" },
  { id: "default", label: "默认声音", icon: "speaker" },
];
