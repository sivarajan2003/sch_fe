import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BestPerformerCard() {
  return (
    <div className="relative h-[340px] rounded-2xl overflow-hidden bg-green-500 text-white">
      
      {/* Decorative stars */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-10" />

      {/* Top Content */}
      <div className="relative z-10 p-4 flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-sm">Best Performer</h4>
          <p className="mt-2 text-lg font-bold">Adrian Rubell</p>
          <p className="text-sm opacity-90">Physics Teacher</p>
        </div>

        <div className="flex gap-2">
          <button className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft size={16} />
          </button>
          <button className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Image (BOTTOM INSIDE CARD) */}
      <img
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
        alt="Best Performer"
        className="absolute bottom-0 left-0 w-full h-[220px] object-cover"
      />
    </div>
  );
}
