import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function HighlightCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* BEST PERFORMER */}
      <div className="relative rounded-xl overflow-hidden bg-[#51C441] text-white p-5 h-[320px] flex flex-col justify-between">
        
        {/* Top */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Best Performer</h4>
            <div className="flex gap-2">
              <button className="bg-white/20 p-1.5 rounded-full">
                <ChevronLeft size={16} />
              </button>
              <button className="bg-white/20 p-1.5 rounded-full">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <p className="text-lg font-bold">Adrian Rubell</p>
          <p className="text-sm opacity-90">Physics Teacher</p>
        </div>

        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
          alt="Best Performer"
          className="absolute bottom-0 right-0 h-[230px] object-cover"
        />
      </div>

      {/* STAR STUDENTS */}
      <div className="relative rounded-xl overflow-hidden bg-[#1E73E8] text-white p-5 h-[320px] flex flex-col justify-between">
        
        {/* Top */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star size={18} />
              <h4 className="font-semibold">Star Students</h4>
            </div>
            <div className="flex gap-2">
              <button className="bg-white/20 p-1.5 rounded-full">
                <ChevronLeft size={16} />
              </button>
              <button className="bg-white/20 p-1.5 rounded-full">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <p className="text-lg font-bold">Tenesa</p>
          <p className="text-sm opacity-90">XII, A</p>
        </div>

        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
          alt="Star Student"
          className="absolute bottom-0 right-0 h-[230px] object-cover"
        />
      </div>

    </div>
  );
}
