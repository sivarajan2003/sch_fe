import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { 
  Search, User, MapPin, Calendar, Award, Shield, 
  Heart, Info, FileText, Printer, RotateCw, X, Filter, 
  Users, CheckCircle, Copy, Check, Hash, Activity, GraduationCap
} from "lucide-react";

const cardFlipStyles = `
  .id-card-perspective {
    perspective: 1200px;
  }
  .id-card-inner {
    position: relative;
    width: 290px;
    height: 440px;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  }
  .id-card-inner.flipped {
    transform: rotateY(180deg);
  }
  .id-card-front, .id-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 1.25rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    border: 1px solid rgba(226, 232, 240, 0.8);
    display: flex;
    flex-direction: column;
  }
  .id-card-back {
    transform: rotateY(180deg);
  }
`;

export default function StudentsPage() {
  const isLocked = false;
  const [studentList, setStudentList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Detail Modal States
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "idcard">("profile");
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const getStudentImageUrl = (rawImage: string | null | undefined, name = "", id = "") => {
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=dbeafe&color=1e40af&bold=true&size=128`;
    const image = rawImage?.toString().trim();
    if (!image || image.toLowerCase() === "null" || image.toLowerCase() === "undefined") return fallback;
    return /^https?:\/\//i.test(image) ? image : fallback;
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const svc = (await import("../../service/studentService")).default;
      const res = await svc.getStudents({ limit: 200, includeAcademicConfig: true });
      const rows = res.rows ?? res.data ?? [];
      const mapped = rows.map((r: any) => {
        const configClass = r.AcademicConfig?.class;
        const studentClass = configClass
          ? `${configClass.name}${configClass.section ? ` ${configClass.section}` : ''}`
          : r.academic_year || "—";

        return {
          ...r,
          id: r.id,
          admissionNumber: r.admission_number || r.admissionNumber || "—",
          _id: r.id,
          name: r.name,
          class: studentClass,
          image: getStudentImageUrl(r.profile_image, r.name, r.id),
        };
      });
      setStudentList(mapped);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch students");
    }
  };

  const handleSortByName = () => {
    const next = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(next);
    setStudentList((prev) =>
      [...prev].sort((a, b) =>
        next === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    );
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    toast.success("Parent ID copied to clipboard!");
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrintIdCard = (student: any) => {
    if (!student) return;
    const printWindow = window.open("", "_blank", "width=850,height=700");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>ID Card - ${student.name}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                margin: 0;
                background: white;
              }
              .no-print {
                display: none;
              }
              .page-break {
                page-break-before: always;
              }
            }
            body {
              font-family: 'Inter', sans-serif;
              background: #f8fafc;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 40px 20px;
            }
            .no-print {
              margin-bottom: 30px;
            }
            .print-btn {
              padding: 12px 24px;
              background: #4f46e5;
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
              transition: all 0.2s;
              font-family: 'Inter', sans-serif;
            }
            .print-btn:hover {
              background: #4338ca;
            }
            .cards-wrapper {
              display: flex;
              gap: 30px;
              justify-content: center;
              flex-wrap: wrap;
            }
            .id-card {
              width: 290px;
              height: 440px;
              border-radius: 20px;
              overflow: hidden;
              background: white;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
              border: 1px solid #e2e8f0;
              position: relative;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
            }
            .header-gradient {
              background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
              color: white;
              padding: 18px 12px;
              text-align: center;
              border-bottom: 4px solid #f59e0b;
              position: relative;
            }
            .school-logo {
              position: absolute;
              left: 12px;
              top: 18px;
              width: 24px;
              height: 24px;
              background: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: bold;
              color: #1e3a8a;
              border: 1px solid #f59e0b;
            }
            .school-title {
              font-family: 'Outfit', sans-serif;
              font-size: 14px;
              font-weight: 700;
              letter-spacing: 0.5px;
              margin: 0 0 2px 0;
              text-transform: uppercase;
            }
            .card-subtitle {
              font-size: 9px;
              font-weight: 600;
              letter-spacing: 2px;
              color: #f59e0b;
              margin: 0;
              text-transform: uppercase;
            }
            .card-body {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px;
              background: linear-gradient(to bottom, #f8fafc, #ffffff);
              flex-grow: 1;
              justify-content: space-between;
              box-sizing: border-box;
            }
            .photo-container {
              position: relative;
              margin-bottom: 8px;
            }
            .photo-frame {
              width: 110px;
              height: 110px;
              border-radius: 16px;
              border: 4px solid white;
              box-shadow: 0 10px 20px rgba(0,0,0,0.1);
              object-fit: cover;
            }
            .chip-icon {
              width: 30px;
              height: 22px;
              background: linear-gradient(135deg, #fde047 0%, #eab308 100%);
              border-radius: 4px;
              border: 1px solid #ca8a04;
              margin-bottom: 10px;
            }
            .student-name {
              font-family: 'Outfit', sans-serif;
              font-size: 18px;
              font-weight: 700;
              color: #1e293b;
              text-align: center;
              margin: 0 0 8px 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .info-grid {
              width: 100%;
              background: #f1f5f9;
              border-radius: 12px;
              padding: 10px 14px;
              box-sizing: border-box;
              margin-bottom: 12px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              font-size: 11px;
              margin-bottom: 4px;
            }
            .info-row:last-child {
              margin-bottom: 0;
            }
            .info-label {
              font-weight: 600;
              color: #64748b;
            }
            .info-val {
              color: #0f172a;
              font-weight: 500;
            }
            .barcode-svg {
              display: flex;
              gap: 2px;
              align-items: center;
              height: 22px;
            }
            .barcode-line {
              height: 100%;
              background: black;
            }
            .session-txt {
              font-size: 9px;
              color: #94a3b8;
              font-weight: 600;
              letter-spacing: 1.5px;
              margin-top: 4px;
              text-transform: uppercase;
            }
            /* Back card styling */
            .back-body {
              padding: 20px;
              height: 100%;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              background: #ffffff;
            }
            .back-header {
              text-align: center;
              border-bottom: 2px solid #f1f5f9;
              padding-bottom: 10px;
            }
            .back-logo {
              font-size: 24px;
              margin-bottom: 4px;
            }
            .back-school-name {
              font-family: 'Outfit', sans-serif;
              font-size: 13px;
              font-weight: 700;
              color: #1e3a8a;
              text-transform: uppercase;
              margin: 0;
            }
            .details-list {
              display: flex;
              flex-direction: column;
              gap: 8px;
              margin: 16px 0;
            }
            .detail-item {
              font-size: 11px;
              display: flex;
              border-bottom: 1px solid #f8fafc;
              padding-bottom: 4px;
            }
            .detail-label {
              font-weight: 600;
              color: #64748b;
              width: 100px;
            }
            .detail-val {
              color: #334155;
              flex: 1;
            }
            .instructions-box {
              background: #f8fafc;
              border: 1px dashed #cbd5e1;
              border-radius: 10px;
              padding: 10px;
              font-size: 9px;
              color: #64748b;
              line-height: 1.4;
            }
            .instructions-title {
              font-weight: 700;
              color: #475569;
              margin-bottom: 4px;
              text-transform: uppercase;
            }
            .instructions-list {
              margin: 0;
              padding-left: 14px;
            }
            .back-footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              border-top: 2px solid #f1f5f9;
              padding-top: 10px;
            }
            .school-info {
              font-size: 8px;
              color: #94a3b8;
              line-height: 1.4;
            }
            .signature-area {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .sig-cursive {
              font-family: 'Brush Script MT', cursive, sans-serif;
              font-size: 20px;
              color: #1e3a8a;
              height: 24px;
              line-height: 24px;
            }
            .sig-divider {
              width: 70px;
              height: 1px;
              background: #cbd5e1;
              margin: 3px 0;
            }
            .sig-title {
              font-size: 8px;
              color: #64748b;
              text-transform: uppercase;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="no-print">
            <button class="print-btn" onclick="window.print()">Print This ID Card</button>
          </div>
          <div class="cards-wrapper">
            <!-- Front Card -->
            <div class="id-card">
              <div class="header-gradient">
                <div class="school-logo">S</div>
                <h3 class="school-title">Seed Academy</h3>
                <p class="card-subtitle">Student Identity</p>
              </div>
              <div class="card-body">
                <div class="photo-container">
                  <img class="photo-frame" src="${student.image}" />
                </div>
                <h4 class="student-name">${student.name}</h4>
                <div class="info-grid">
                  <div class="info-row">
                    <span class="info-label">Class</span>
                    <span class="info-val">${student.class || '—'}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Roll Number</span>
                    <span class="info-val">#${student.roll_number || '—'}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Blood Group</span>
                    <span class="info-val">${student.blood_group || '—'}</span>
                  </div>
                </div>
                
                <div class="barcode-svg">
                  <span class="barcode-line" style="width: 2px;"></span>
                  <span class="barcode-line" style="width: 1px;"></span>
                  <span class="barcode-line" style="width: 3px;"></span>
                  <span class="barcode-line" style="width: 1px;"></span>
                  <span class="barcode-line" style="width: 2px;"></span>
                  <span class="barcode-line" style="width: 4px;"></span>
                  <span class="barcode-line" style="width: 1px;"></span>
                  <span class="barcode-line" style="width: 2px;"></span>
                  <span class="barcode-line" style="width: 3px;"></span>
                  <span class="barcode-line" style="width: 1.5px;"></span>
                </div>
                <span class="session-txt">Academic Year: ${student.academic_year || '2024-2025'}</span>
              </div>
            </div>
            
            <!-- Back Card -->
            <div class="id-card">
              <div class="back-body">
                <div>
                  <div class="back-header">
                    <div class="back-logo">🎓</div>
                    <h4 class="back-school-name">Seed International Academy</h4>
                  </div>
                  
                  <div class="details-list">
                    <div class="detail-item">
                      <span class="detail-label">Admission ID:</span>
                      <span class="detail-val">${student.admissionNumber || '—'}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Date of Birth:</span>
                      <span class="detail-val">${student.date_of_birth || '—'}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Joining Year:</span>
                      <span class="detail-val">${student.yearofjoining || '—'}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Address:</span>
                      <span class="detail-val">${student.address || '—'}</span>
                    </div>
                  </div>
                </div>
                
                <div class="instructions-box">
                  <div class="instructions-title">Terms & Instructions:</div>
                  <ul class="instructions-list">
                    <li>This card is property of Seed Academy.</li>
                    <li>The cardholder must present it upon request.</li>
                    <li>If found, return to the address stated below.</li>
                  </ul>
                </div>
                
                <div class="back-footer">
                  <div class="school-info">
                    <strong>Seed Academy</strong><br/>
                    88 Adyar, Chennai - 600020<br/>
                    Ph: +91 44 2440 0000<br/>
                    info@seedacademy.edu
                  </div>
                  <div class="signature-area">
                    <span class="sig-cursive">R. Kumar</span>
                    <div class="sig-divider"></div>
                    <span class="sig-title">Principal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <script>
            // Wait for window to layout then trigger print
            window.addEventListener('load', () => {
              setTimeout(() => {
                window.print();
              }, 400);
            });
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleOpenDetails = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
    setActiveTab("profile");
    setIsFlipped(false);
  };

  // Get statistics
  const totalStudents = studentList.length;
  const activeStudents = studentList.filter(s => s.is_active).length;
  const femaleCount = studentList.filter(s => s.gender?.toLowerCase() === 'female').length;
  const maleCount = studentList.filter(s => s.gender?.toLowerCase() === 'male').length;

  // Search & Filter students list
  const filteredStudents = studentList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.roll_number && s.roll_number.toString().includes(searchQuery));
    const matchesGender = selectedGender ? s.gender?.toLowerCase() === selectedGender.toLowerCase() : true;
    const matchesClass = selectedClass ? s.class?.toLowerCase().includes(selectedClass.toLowerCase()) : true;
    return matchesSearch && matchesGender && matchesClass;
  });

  const uniqueClasses = Array.from(
    new Set(studentList.map((s) => s.class))
  ).filter((c) => c && c !== "—");

  return (
    <div className="relative p-6 bg-slate-50 min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: cardFlipStyles }} />

      <div className={`space-y-6 ${isLocked ? "pointer-events-none select-none" : ""}`}>
        
        {/* HEADER BAR */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Users className="w-7 h-7 text-indigo-600" />
              Student Directory
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              View student profiles, detailed records, and design/print security ID cards.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSortByName}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
            >
              Sort Name: <span className="text-indigo-600 uppercase font-bold">{sortOrder}</span>
            </button>
          </div>
        </div>

        {/* STATISTICS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Enrolled</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalStudents}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Status</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">{activeStudents}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Female Students</p>
              <h3 className="text-2xl font-bold text-pink-600 mt-1">{femaleCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
              <User className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Male Students</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">{maleCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row gap-3 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by student name, roll number, admission ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-transparent text-sm focus:outline-none text-slate-600 font-semibold cursor-pointer"
              >
                <option value="">All Classes</option>
                {uniqueClasses.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
              <User className="w-4 h-4 text-slate-400" />
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="bg-transparent text-sm focus:outline-none text-slate-600 font-semibold cursor-pointer"
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            
            {(searchQuery || selectedClass || selectedGender) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedClass("");
                  setSelectedGender("");
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-bold px-3 py-2 transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* STUDENTS LIST GRID */}
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStudents.slice(0, visibleCount).map((s) => (
              <div
                key={s.id}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group"
              >
                {/* Visual Accent Top Bar */}
                <div className="h-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600" />
                
                <div className="p-5 flex-grow flex flex-col items-center">
                  <div className="relative mt-2">
                    <img
                      src={s.image}
                      alt={s.name}
                      onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=dbeafe&color=1e40af&bold=true`;
                      }}
                      className="w-20 h-20 rounded-2xl object-cover border-4 border-slate-50 shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full border-2 border-white ${s.is_active ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  </div>

                  <h3 className="font-bold text-slate-800 text-lg mt-4 text-center leading-snug group-hover:text-indigo-600 transition-colors">
                    {s.name}
                  </h3>
                  
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mt-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {s.class || "—"}
                  </span>

                  <div className="w-full mt-4 pt-3 border-t border-slate-50 flex flex-col gap-1.5 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-400">Roll Number</span>
                      <span className="font-bold text-slate-700">#{s.roll_number || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-400">Admission No</span>
                      <span className="font-bold text-slate-700">{s.admissionNumber}</span>
                    </div>
                  </div>
                </div>

                {/* CARD ACTIONS */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => handleOpenDetails(s)}
                    className="flex-1 py-2 px-3 bg-white hover:bg-indigo-600 border border-slate-200 hover:border-indigo-600 text-slate-700 hover:text-white text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Info className="w-3.5 h-3.5" />
                    View Details
                  </button>
                  <button
                    onClick={() => handlePrintIdCard(s)}
                    title="Print ID Card"
                    className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 transition-all duration-200 active:scale-95 flex items-center justify-center shadow-sm"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm max-w-md mx-auto mt-8">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Students Found</h3>
            <p className="text-sm text-slate-500 mt-1">
              We couldn't find any student matching your search filters. Try adjusting your settings.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedClass("");
                setSelectedGender("");
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all active:scale-95"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* LOAD MORE BUTTON */}
        {filteredStudents.length > visibleCount && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-6 py-3 bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-indigo-600 font-bold text-sm rounded-2xl shadow-sm transition-all hover:shadow duration-200"
            >
              Load More Students
            </button>
          </div>
        )}
      </div>

      {/* DETAIL MODAL (FULL DETAILS & ADVANCED ID CARD VIEW) */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10">
            <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row animate-scale max-h-[90vh] md:max-h-[85vh]">
              
              {/* LEFT SIDE PANEL: ID CARD INTERACTIVE PREVIEW */}
              <div className="w-full md:w-[360px] bg-slate-100 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 overflow-y-auto">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Interactive ID Card</h4>
                
                {/* 3D CARD WRAPPER */}
                <div className="id-card-perspective my-2">
                  <div className={`id-card-inner ${isFlipped ? "flipped" : ""}`}>
                    
                    {/* FRONT SIDE */}
                    <div className="id-card-front bg-white flex flex-col">
                      <div className="bg-gradient-to-r from-indigo-800 to-blue-700 text-white py-4 px-3 text-center border-b-4 border-amber-500 relative">
                        <div className="absolute left-3 top-3.5 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-indigo-800 border border-amber-400">S</div>
                        <h4 className="font-extrabold text-[12px] uppercase tracking-wider leading-none">Seed Academy</h4>
                        <span className="text-[8px] font-bold tracking-widest text-amber-300 block mt-1 uppercase">Student Identity</span>
                      </div>
                      
                      <div className="p-5 flex-grow flex flex-col items-center justify-between bg-gradient-to-b from-slate-50 to-white">
                        <div className="w-7 h-5 bg-gradient-to-br from-yellow-300 to-amber-500 rounded border border-amber-600 self-start opacity-90 shadow-sm relative overflow-hidden flex flex-wrap p-0.5 mb-1">
                          <div className="w-1/2 h-1/2 border-[0.5px] border-amber-700/20"></div>
                          <div className="w-1/2 h-1/2 border-[0.5px] border-amber-700/20"></div>
                          <div className="w-1/2 h-1/2 border-[0.5px] border-amber-700/20"></div>
                          <div className="w-1/2 h-1/2 border-[0.5px] border-amber-700/20"></div>
                        </div>

                        <img
                          src={selectedStudent.image}
                          alt="ID Photo"
                          className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md mb-2"
                        />
                        
                        <div className="text-center w-full">
                          <h5 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide truncate max-w-[220px] mx-auto">
                            {selectedStudent.name}
                          </h5>
                          
                          <div className="bg-slate-100 rounded-lg p-2 mt-2 text-left space-y-1">
                            <div className="flex justify-between text-[10px]">
                              <span className="text-slate-400 font-semibold">Class:</span>
                              <span className="text-slate-800 font-bold">{selectedStudent.class || "—"}</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                              <span className="text-slate-400 font-semibold">Roll No:</span>
                              <span className="text-slate-800 font-bold">#{selectedStudent.roll_number || "—"}</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                              <span className="text-slate-400 font-semibold">Blood Grp:</span>
                              <span className="text-slate-800 font-bold text-rose-600">{selectedStudent.blood_group || "—"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center mt-3 w-full">
                          <div className="flex gap-[1.5px] items-center h-5 bg-white px-2 rounded border border-slate-100">
                            <span className="w-[1.5px] h-4 bg-black" />
                            <span className="w-[1px] h-4 bg-black" />
                            <span className="w-[2.5px] h-4 bg-black" />
                            <span className="w-[1px] h-4 bg-black" />
                            <span className="w-[1.5px] h-4 bg-black" />
                            <span className="w-[3px] h-4 bg-black" />
                            <span className="w-[1px] h-4 bg-black" />
                            <span className="w-[2px] h-4 bg-black" />
                            <span className="w-[1.5px] h-4 bg-black" />
                            <span className="w-[1px] h-4 bg-black" />
                          </div>
                          <span className="text-[7.5px] text-slate-400 font-bold tracking-widest mt-1">SESSION: {selectedStudent.academic_year || "2024-2025"}</span>
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="id-card-back bg-white p-5 flex flex-col justify-between">
                      <div>
                        <div className="text-center border-b pb-3 mb-4">
                          <span className="text-lg">📚</span>
                          <h4 className="font-extrabold text-[12px] uppercase text-indigo-900 tracking-wider">Seed Academy</h4>
                          <span className="text-[7.5px] text-slate-400 uppercase tracking-widest block">Rules & Information</span>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex text-[10px]">
                            <span className="w-20 text-slate-400 font-semibold">Admission ID:</span>
                            <span className="flex-1 text-slate-700 font-medium truncate">{selectedStudent.admissionNumber}</span>
                          </div>
                          <div className="flex text-[10px]">
                            <span className="w-20 text-slate-400 font-semibold">DOB:</span>
                            <span className="flex-1 text-slate-700 font-medium">{selectedStudent.date_of_birth || "—"}</span>
                          </div>
                          <div className="flex text-[10px]">
                            <span className="w-20 text-slate-400 font-semibold">Date of Join:</span>
                            <span className="flex-1 text-slate-700 font-medium">{selectedStudent.admission_date || selectedStudent.yearofjoining || "—"}</span>
                          </div>
                          <div className="flex text-[10px]">
                            <span className="w-20 text-slate-400 font-semibold">Address:</span>
                            <span className="flex-1 text-slate-700 font-medium line-clamp-2 leading-tight">{selectedStudent.address || "—"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-2.5 text-[8px] text-slate-400 leading-normal">
                        <strong>INSTRUCTIONS:</strong>
                        <ul className="list-disc pl-3 mt-1 space-y-0.5">
                          <li>Card must be visible on campus at all times.</li>
                          <li>If lost, report immediately to office.</li>
                          <li>Return card upon school withdrawal.</li>
                        </ul>
                      </div>

                      <div className="flex justify-between items-end border-t pt-3 mt-4">
                        <div className="text-[7px] text-slate-400 leading-tight">
                          <strong>Contact Info:</strong><br />
                          88 Adyar, Chennai<br />
                          seedacademy.edu.in
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <span className="font-serif italic text-blue-900 text-sm select-none" style={{ fontFamily: "'Brush Script MT', cursive, sans-serif" }}>
                            R. Kumar
                          </span>
                          <div className="w-16 h-[0.5px] bg-slate-300 mt-1"></div>
                          <span className="text-[7px] text-slate-400 font-bold uppercase mt-0.5">Principal</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ID CARD BUTTONS */}
                <div className="w-full flex flex-col gap-2 mt-6">
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    Flip to {isFlipped ? "Front" : "Back"}
                  </button>
                  <button
                    onClick={() => handlePrintIdCard(selectedStudent)}
                    className="w-full py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print ID Card
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE PANEL: DETAILS FORM/TABS */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
                {/* MODAL HEADER */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedStudent.image}
                      alt={selectedStudent.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{selectedStudent.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          Class: {selectedStudent.class || "—"}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${selectedStudent.is_active ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className="text-xs text-slate-400 font-semibold">
                          {selectedStudent.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* MODAL TABS */}
                <div className="flex border-b border-slate-100 mt-4">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
                      activeTab === "profile"
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    Detailed Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("idcard")}
                    className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
                      activeTab === "idcard"
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    Full ID Card Info
                  </button>
                </div>

                {/* TAB 1: PROFILE DETAILS */}
                {activeTab === "profile" && (
                  <div className="space-y-6 mt-6 flex-grow">
                    
                    {/* ACADEMIC PROFILE */}
                    <div>
                      <h4 className="text-xs font-bold text-indigo-600 bg-indigo-50/50 py-1.5 px-3 rounded-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Award className="w-4 h-4" /> Academic Profile
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 font-semibold">Admission Number</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5">{selectedStudent.admissionNumber}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 font-semibold">Roll Number</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5">#{selectedStudent.roll_number || "—"}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 font-semibold">Academic Year</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5">{selectedStudent.academic_year || "—"}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 font-semibold">Year of Joining</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5">{selectedStudent.yearofjoining || "—"}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 font-semibold">Admission Date</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5">{selectedStudent.admission_date || "—"}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="text-xs text-slate-400 font-semibold">Parent ID</p>
                            <p className="text-sm font-bold text-slate-700 mt-0.5 truncate max-w-[150px]">{selectedStudent.parent_id || "—"}</p>
                          </div>
                          {selectedStudent.parent_id && (
                            <button
                              onClick={() => handleCopyId(selectedStudent.parent_id)}
                              className="p-1.5 bg-white border rounded-lg text-slate-400 hover:text-indigo-600 transition-all active:scale-95"
                              title="Copy Parent ID"
                            >
                              {copiedId ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* PERSONAL INFORMATION */}
                    <div>
                      <h4 className="text-xs font-bold text-indigo-600 bg-indigo-50/50 py-1.5 px-3 rounded-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                        <User className="w-4 h-4" /> Personal Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 font-semibold">Full Name</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5">{selectedStudent.name}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 font-semibold">Age</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5">{selectedStudent.age || "—"}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 font-semibold">Gender</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5">{selectedStudent.gender || "—"}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 font-semibold">Date of Birth</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5">{selectedStudent.date_of_birth || "—"}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-xs text-slate-400 font-semibold">Blood Group</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5 text-rose-600">{selectedStudent.blood_group || "—"}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl sm:col-span-2 flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-slate-400 font-semibold">Residential Address</p>
                            <p className="text-sm font-bold text-slate-700 mt-0.5 leading-snug">{selectedStudent.address || "—"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 2: FULL ID CARD INFO */}
                {activeTab === "idcard" && (
                  <div className="space-y-6 mt-6 flex-grow">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-indigo-900 font-semibold text-sm">
                        <Info className="w-4.5 h-4.5" />
                        Card Metadata Summary
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        This digital identification card contains a valid barcode tied to the student's primary records. It is designed to be printed on standard CR80 PVC card stock.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-slate-100 p-4 rounded-xl space-y-3 shadow-sm">
                        <h5 className="text-xs font-bold text-indigo-700 uppercase tracking-wider border-b pb-1.5">Card Front Details</h5>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span className="text-slate-400 font-medium">Header Title:</span> <span className="text-slate-800 font-bold">Seed Academy</span></div>
                          <div className="flex justify-between"><span className="text-slate-400 font-medium">Header Color:</span> <span className="text-indigo-600 font-bold">Blue (#1E3A8A)</span></div>
                          <div className="flex justify-between"><span className="text-slate-400 font-medium">Accent Border:</span> <span className="text-amber-500 font-bold">Gold (#F59E0B)</span></div>
                          <div className="flex justify-between"><span className="text-slate-400 font-medium">Avatar Aspect Ratio:</span> <span className="text-slate-600 font-semibold">1:1 (Square)</span></div>
                          <div className="flex justify-between"><span className="text-slate-400 font-medium">Security Details:</span> <span className="text-slate-600 font-semibold">Gold Chip (Simulated)</span></div>
                        </div>
                      </div>

                      <div className="border border-slate-100 p-4 rounded-xl space-y-3 shadow-sm">
                        <h5 className="text-xs font-bold text-indigo-700 uppercase tracking-wider border-b pb-1.5">Card Back Details</h5>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between"><span className="text-slate-400 font-medium">Footer Info:</span> <span className="text-slate-600 font-semibold">School Address & Ph</span></div>
                          <div className="flex justify-between"><span className="text-slate-400 font-medium">Authorized Signatory:</span> <span className="text-slate-800 font-bold">R. Kumar (Principal)</span></div>
                          <div className="flex justify-between"><span className="text-slate-400 font-medium">Card Layout Type:</span> <span className="text-slate-600 font-semibold">Vertical (CR80 spec)</span></div>
                          <div className="flex justify-between"><span className="text-slate-400 font-medium">Safety Info:</span> <span className="text-slate-800 font-bold">Blood Group, DOB</span></div>
                          <div className="flex justify-between"><span className="text-slate-400 font-medium">T&C Block:</span> <span className="text-slate-600 font-semibold">3-point instructions</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🖨️</span>
                        <div>
                          <p className="text-xs font-bold text-indigo-900">Need a physical copy?</p>
                          <p className="text-[10px] text-indigo-600">Prints both front and back cards aligned on a single sheet.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePrintIdCard(selectedStudent)}
                        className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Print Now
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
