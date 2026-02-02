import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function StarStudentCard() {
  return (
    <div className="relative h-[340px] rounded-2xl overflow-hidden bg-blue-600 text-white">

      {/* Decorative star */}
      <Star className="absolute top-4 left-4 opacity-20 w-16 h-16" />

      {/* Top Content */}
      <div className="relative z-10 p-4 flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-sm">Star Students</h4>
          <p className="mt-2 text-lg font-bold">Tenesa</p>
          <p className="text-sm opacity-90">XII, A</p>
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
        src="https://images.unsplash.com/photo-1545996124-0501ebae84d0"
        alt="Star Student"
        className="absolute bottom-0 left-0 w-full h-[220px] object-cover"
      />
    </div>
  );
}
