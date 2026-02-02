import {
    CalendarDays,
    Bus,
    BookOpen,
    ClipboardList,
    Home,
  } from "lucide-react";
  
  export default function FeesReminderCard() {
    return (
      <div className="bg-white rounded-xl border p-5">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-sm">Fees Reminder</h3>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <CalendarDays className="w-4 h-4" />
            2024 - 2025
          </span>
        </div>
  
        {/* LIST */}
        <div className="space-y-3">
          <FeeItem
            icon={Bus}
            title="Transport Fees"
            amount="$2500"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
  
          <FeeItem
            icon={BookOpen}
            title="Book Fees"
            amount="$2500"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
  
          <FeeItem
            icon={ClipboardList}
            title="Exam Fees"
            amount="$2500"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
  
          {/* MESS FEES (DUE) */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100">
              <Home className="w-5 h-5 text-red-500" />
            </div>
  
            <div className="flex-1">
              <p className="text-sm font-medium">Mess Fees</p>
              <p className="text-xs text-red-500">$2500 + $150</p>
            </div>
  
            <button className="px-4 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-md">
              Pay now
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  /* ================= FEE ITEM ================= */
  
  function FeeItem({
    icon: Icon,
    title,
    amount,
    iconBg,
    iconColor,
  }: {
    icon: any;
    title: string;
    amount: string;
    iconBg: string;
    iconColor: string;
  }) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
        {/* ICON */}
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
  
        {/* TEXT */}
        <div className="flex-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-500">{amount}</p>
        </div>
  
        {/* DATE */}
        <div className="text-right text-xs text-gray-500">
          <p>Last Date</p>
          <p>25 May 2024</p>
        </div>
      </div>
    );
  }
  