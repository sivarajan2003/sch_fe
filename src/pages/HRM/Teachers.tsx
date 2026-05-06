import {
  Users,
  Search,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
//import hrTeacherService from "../../service/hrTeacherService";
import { getTeachers } from "../../service/hrTeacherService";
type Teacher = {
  id: string;
  name: string;
  email: string;
  department?: string;
  status: string;
};

export default function Teachers() {
  console.log("Teachers page loaded");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState("");

 useEffect(() => {
  loadTeachers();
}, []);

const loadTeachers = async () => {
  try {
    const res = await getTeachers();

    setTeachers(res?.data || []);

  } catch (err) {
    console.log("TEACHER LOAD ERROR:", err);
  }
};
  const filtered = teachers.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-2xl border p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-7 h-7 text-blue-600" />
              Teachers
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Dashboard / HR / Teachers
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border overflow-hidden">

        {/* DESKTOP */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Teacher
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Email
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
                        {item.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">
                          {item.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          Teacher
                        </p>
                      </div>

                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {item.email}
                  </td>

                  <td className="px-5 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">

                      <button className="text-gray-400 hover:text-blue-600">
                        <Eye size={18} />
                      </button>

                      <button className="text-gray-400 hover:text-yellow-600">
                        <Pencil size={18} />
                      </button>

                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* MOBILE */}
        <div className="md:hidden p-4 space-y-4">

          {filtered.map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl p-4"
            >
              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.email}
                  </p>
                </div>

              </div>

              <div className="mt-4 flex justify-between items-center">

                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  Active
                </span>

                <div className="flex gap-3">

                  <Eye className="w-5 h-5 text-blue-600" />
                  <Pencil className="w-5 h-5 text-yellow-600" />
                  <Trash2 className="w-5 h-5 text-red-600" />

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}