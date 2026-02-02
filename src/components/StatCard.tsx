import { motion } from "framer-motion";

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  percent: string;
  percentBg: string;
  percentText: string;
  active: string;
  inactive: string;
  iconBg: string;
  delay?: number; // 👈 add delay
}

export default function StatCard({
  icon,
  title,
  value,
  percent,
  percentBg,
  percentText,
  active,
  inactive,
  iconBg,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03 }}   // 👈 nice hover effect
      className="bg-white rounded-xl border p-5"
    >
      {/* TOP ROW */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* ICON */}
          <div
            className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}
          >
<img
  src={icon}
  alt={title}
  className="w-10 h-10 object-contain mix-blend-multiply"
/>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {value}
            </h3>
            <p className="text-sm text-gray-500">
              {title}
            </p>
          </div>
        </div>

        {/* % BADGE */}
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md ${percentBg} ${percentText}`}
        >
          {percent}
        </span>
      </div>

      {/* DIVIDER */}
      <div className="my-4 h-px bg-gray-100" />

      {/* ACTIVE / INACTIVE */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          Active : <b className="text-gray-900">{active}</b>
        </span>
        <span>
          Inactive : <b className="text-gray-900">{inactive}</b>
        </span>
      </div>
    </motion.div>
  );
}
