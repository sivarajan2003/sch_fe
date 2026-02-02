import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  bg: string;
  text: string;
  border: string; // ✅ NEW
}

export default function StudentActionCard({
  icon: Icon,
  title,
  bg,
  text,
  border,
}: Props) {
  return (
    <div
      className={`
        bg-white border border-gray-200 
        border-b-4 ${border}
        rounded-xl px-4 py-3
        flex items-center gap-3
        hover:shadow-sm transition cursor-pointer
      `}
    >
      <div className={`w-3 h-3 rounded-lg flex items-center justify-center ${bg}`}>
        <Icon className={`w-3 h-3 ${text}`} />
      </div>

      <p className="text-sm font-medium text-gray-900">
        {title}
      </p>
    </div>
  );
}
