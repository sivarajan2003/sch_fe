import { useState } from "react";

interface Props {
  onClose: () => void;
  onAdd: (hostel: any) => void;
}

export default function AddHostelModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    type: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.name || !form.type || !form.address) {
      alert("All fields are required");
      return;
    }

    onAdd({
      ...form,
      intake: 0,
      description: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[420px] p-6 space-y-4">

        {/* HEADER */}
        <h3 className="text-lg font-semibold">Add Hostel</h3>

        {/* FORM */}
        <div className="space-y-3">

          <input
            name="id"
            placeholder="Hostel ID"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
          />

          <input
            name="name"
            placeholder="Hostel Name"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
          />

          <select
            name="type"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
          >
            <option value="">Select Hostel Type</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>

          <input
            name="address"
            placeholder="Address"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
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
