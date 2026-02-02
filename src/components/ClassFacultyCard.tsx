import { Mail, MessageCircle } from "lucide-react";

interface Props {
  name: string;
  subject: string;
  image: string;
}

export default function ClassFacultyCard({ name, subject, image }: Props) {
  return (
    <div className="min-w-[220px] bg-white border rounded-xl p-4">
      {/* PROFILE */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{subject}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1 text-xs border rounded-md py-1.5 text-gray-600 hover:bg-gray-50">
          <Mail className="w-4 h-4" />
          Email
        </button>

        <button className="flex-1 flex items-center justify-center gap-1 text-xs border rounded-md py-1.5 text-gray-600 hover:bg-gray-50">
          <MessageCircle className="w-4 h-4" />
          Chat
        </button>
      </div>
    </div>
  );
}
