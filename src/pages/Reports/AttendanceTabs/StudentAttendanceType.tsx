import {
    CalendarDays,
    Filter,
    ArrowUpDown,
    Search,
  } from "lucide-react";
  import { useState, useMemo } from "react";
  
  /* ================= MOCK DATA ================= */
  
  const DATA = [
    {
      admissionNo: "AD9892434",
      admissionDate: "25 Mar 2024",
      student: "Janet",
      studentImg: "https://i.pravatar.cc/40?img=1",
      class: "III",
      dob: "10 Jan 2015",
      parent: "Mary",
      parentImg: "https://i.pravatar.cc/40?img=11",
      count: 22,
    },
    {
      admissionNo: "AD9892433",
      admissionDate: "18 Mar 2024",
      student: "Joann",
      studentImg: "https://i.pravatar.cc/40?img=4",
      class: "IV",
      dob: "19 Aug 2014",
      parent: "Michael",
      parentImg: "https://i.pravatar.cc/40?img=12",
      count: 15,
    },
    {
      admissionNo: "AD9892432",
      admissionDate: "14 Mar 2024",
      student: "Kathleen",
      studentImg: "https://i.pravatar.cc/40?img=3",
      class: "II",
      dob: "05 Dec 2017",
      parent: "Jessie",
      parentImg: "https://i.pravatar.cc/40?img=13",
      count: 24,
    },
    {
      admissionNo: "AD9892431",
      admissionDate: "27 Feb 2024",
      student: "Gifford",
      studentImg: "https://i.pravatar.cc/40?img=5",
      class: "I",
      dob: "22 Mar 2018",
      parent: "Robert",
      parentImg: "https://i.pravatar.cc/40?img=14",
      count: 22,
    },
    {
      admissionNo: "AD9892430",
      admissionDate: "13 Feb 2024",
      student: "Lisa",
      studentImg: "https://i.pravatar.cc/40?img=6",
      class: "II",
      dob: "13 May 2017",
      parent: "Colleen",
      parentImg: "https://i.pravatar.cc/40?img=15",
      count: 22,
    },
    {
      admissionNo: "AD9892429",
      admissionDate: "11 Feb 2024",
      student: "Ralph",
      studentImg: "https://i.pravatar.cc/40?img=7",
      class: "III",
      dob: "20 Jun 2015",
      parent: "Arthur",
      parentImg: "https://i.pravatar.cc/40?img=16",
      count: 24,
    },
    {
      admissionNo: "AD9892428",
      admissionDate: "24 Jan 2024",
      student: "Julie",
      studentImg: "https://i.pravatar.cc/40?img=8",
      class: "V",
      dob: "18 Sep 2013",
      parent: "Claudia",
      parentImg: "https://i.pravatar.cc/40?img=17",
      count: 24,
    },
    {
      admissionNo: "AD9892427",
      admissionDate: "19 Jan 2024",
      student: "Ryan",
      studentImg: "https://i.pravatar.cc/40?img=9",
      class: "VI",
      dob: "26 Nov 2012",
      parent: "Johnson",
      parentImg: "https://i.pravatar.cc/40?img=18",
      count: 24,
    },
    {
      admissionNo: "AD9892426",
      admissionDate: "08 Jan 2024",
      student: "Susan",
      studentImg: "https://i.pravatar.cc/40?img=10",
      class: "VIII",
      dob: "26 May 2010",
      parent: "Marquita",
      parentImg: "https://i.pravatar.cc/40?img=19",
      count: 24,
    },
  ];
  
  /* ================= COMPONENT ================= */
  
  export default function StudentAttendanceType() {
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const [dateLabel, setDateLabel] = useState("15 May 2024 - 24 May 2024");
    
    const classList = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

const rows = useMemo(() => {
    let list = DATA.filter((r) =>
      r.student.toLowerCase().includes(search.toLowerCase())
    );
  
    if (selectedClasses.length > 0) {
      list = list.filter((r) =>
        selectedClasses.includes(r.class)
      );
    }
  
    list.sort((a, b) =>
      sortAsc
        ? a.student.localeCompare(b.student)
        : b.student.localeCompare(a.student)
    );
  
    return list;
  }, [search, sortAsc, selectedClasses]);
  
  
    return (
      <div className="bg-white border rounded-xl overflow-hidden">
  
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-5 py-4 border-b">
          <h3 className="font-semibold">
            Students Attendance Type List
          </h3>
  
          <div className="relative flex flex-wrap gap-2 w-full lg:w-auto">
  {/* 📅 CALENDAR */}
  <button
    onClick={() => {
      setShowCalendar(!showCalendar);
      setShowFilter(false);
    }}
className="btn-outline text-sm flex items-center gap-1 w-full sm:w-auto justify-center"
  >
    <CalendarDays size={14} />
    {dateLabel}
  </button>

  {showCalendar && (
  <div className="absolute right-0 top-12 bg-white border rounded-xl p-4 w-72 shadow z-50">
    <label className="text-sm font-medium">Start Date</label>
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="w-full border rounded px-3 py-2 mt-1 mb-3"
    />

    <label className="text-sm font-medium">End Date</label>
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="w-full border rounded px-3 py-2 mt-1 mb-4"
    />

    <button
      onClick={() => setShowCalendar(false)}
      className="w-full bg-blue-600 text-white py-2 rounded-lg"
    >
      Apply
    </button>
    <button
  onClick={() => {
    setStartDate("");
    setEndDate("");
    setShowCalendar(false);
  }}
  className="text-xs text-red-500 mt-2"
>
  Clear Date
</button>

  </div>
)}


  {/* FILTER */}
<button
  onClick={() => {
    setShowFilter(!showFilter);
    setShowCalendar(false);
  }}
  className="btn-outline text-sm flex items-center gap-1 w-full sm:w-auto justify-center">
  <Filter size={14} /> Filter
</button>

{showFilter && (
  <div className="absolute right-28 top-12 bg-white border rounded-xl p-4 w-52 shadow z-50">
    <p className="text-sm font-semibold mb-2">Class</p>

    {classList.map((cls) => (
      <label
        key={cls}
        className="flex items-center gap-2 text-sm mb-2"
      >
        <input
          type="checkbox"
          checked={selectedClasses.includes(cls)}
          onChange={() =>
            setSelectedClasses((prev) =>
              prev.includes(cls)
                ? prev.filter((c) => c !== cls)
                : [...prev, cls]
            )
          }
        />
        Class {cls}
      </label>
    ))}

    <button
      onClick={() => {
        setSelectedClasses([]);
        setShowFilter(false);
      }}
      className="text-xs text-blue-600 mt-2"
    >
      Clear
    </button>
  </div>
)}

  {/* 🔀 SORT */}
  <button
    onClick={() => setSortAsc(!sortAsc)}
    className="btn-outline text-sm flex items-center gap-1 w-full sm:w-auto justify-center">
    <ArrowUpDown size={14} />
    Sort {sortAsc ? "A-Z" : "Z-A"}
  </button>

</div>
</div>
        {/* ================= CONTROLS ================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-5 py-4 border-b text-sm">
          <div className="flex items-center gap-2">
            Row Per Page
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>20</option>
            </select>
            Entries
          </div>
  
          <div className="relative">
            <Search
              size={14}
              className="absolute left-2 top-2.5 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-3 py-1.5 border rounded text-sm w-full sm:w-52"
              placeholder="Search"
            />
          </div>
        </div>
  
        {/* ================= TABLE ================= */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Admission No</th>
                <th className="px-4 py-3">Date of Admission</th>
                <th className="px-4 py-3 text-left">Student Name</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Date of Birth</th>
                <th className="px-4 py-3 text-left">Parent Name</th>
                <th className="px-4 py-3 text-center">Count</th>
              </tr>
            </thead>
  
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
  
                  <td className="px-4 py-3 text-blue-600 font-medium">
                    {r.admissionNo}
                  </td>
  
                  <td className="px-4 py-3 text-gray-600">
                    {r.admissionDate}
                  </td>
  
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={r.studentImg}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{r.student}</span>
                    </div>
                  </td>
  
                  <td className="px-4 py-3 text-center">{r.class}</td>
  
                  <td className="px-4 py-3 text-gray-600">{r.dob}</td>
  
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={r.parentImg}
                        className="w-7 h-7 rounded-full"
                      />
                      <span>{r.parent}</span>
                    </div>
                  </td>
  
                  <td className="px-4 py-3 text-center font-medium">
                    {r.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  {/* ===== MOBILE & TABLET VIEW ===== */}
<div className="lg:hidden space-y-4 px-4 pb-4">
  {rows.map((r, i) => (
    <div
      key={i}
      className="border rounded-xl p-4 bg-white space-y-3"
    >
      {/* STUDENT */}
      <div className="flex items-center gap-3">
        <img src={r.studentImg} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{r.student}</p>
          <p className="text-xs text-gray-500">
            Admission No: {r.admissionNo}
          </p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Class</p>
          <p className="font-medium">{r.class}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Count</p>
          <p className="font-medium">{r.count}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">DOB</p>
          <p>{r.dob}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Admission Date</p>
          <p>{r.admissionDate}</p>
        </div>
      </div>

      {/* PARENT */}
      <div className="flex items-center gap-2 pt-2">
        <img src={r.parentImg} className="w-8 h-8 rounded-full" />
        <span className="text-sm">{r.parent}</span>
      </div>
    </div>
  ))}
</div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-end items-center gap-2 px-5 py-4 text-sm">
          <button className="px-3 py-1 border rounded">Prev</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
        
          
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    );
  }
  