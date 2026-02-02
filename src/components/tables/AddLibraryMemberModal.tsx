import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  onClose: () => void;
  onAdd: (member: any) => void;
};

export default function AddLibraryMemberModal({
  onClose,
  onAdd,
}: Props) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    cardNo: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.name || !form.cardNo) return;

    onAdd({
      ...form,
      avatar: "https://i.pravatar.cc/40",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[420px] p-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Add Library Member
          </h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">
          <input
            name="id"
            placeholder="Member ID"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
          />
          <input
            name="name"
            placeholder="Member Name"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
          />
          <input
            name="cardNo"
            placeholder="Card No"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
          />
          <input
            name="mobile"
            placeholder="Phone Number"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
