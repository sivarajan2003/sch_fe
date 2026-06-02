//transport.tsx
import { useEffect, useState } from "react";
import {
  RefreshCcw,
  Printer,
  ArrowUpDown,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Bus,
  MapPin,
  User,
  Phone,
  Users,
  CheckCircle,
  Navigation,
  Map,
  Search,
  Filter,
  Check,
  X,
  Shield,
  Clock,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import studentService from "../../service/studentService";
import toast from "react-hot-toast";

// Misspelled filename is transprotService.js
import transportService from "../../service/transportService";

/* ================= INITIAL FALLBACK DATA ================= */
const INITIAL_BUSES = [
  { id: "B001", busNumber: "BUS-101", plateNumber: "TN-07-AL-4567", capacity: 40, driverName: "Ramesh Kumar", driverPhone: "+91 98401 23456", status: "Active" },
  { id: "B002", busNumber: "BUS-102", plateNumber: "TN-07-BM-7890", capacity: 32, driverName: "Suresh Cooper", driverPhone: "+91 98401 98765", status: "Active" },
  { id: "B003", busNumber: "BUS-103", plateNumber: "TN-07-CZ-1234", capacity: 50, driverName: "Anand Singh", driverPhone: "+91 97890 54321", status: "Maintenance" }
];

const INITIAL_ROUTES = [
  { id: "R001", name: "Adyar - Velachery - Tambaram", busId: "B001", stops: ["Adyar Gate", "IIT Madras", "Velachery Bypass", "Medavakkam", "Tambaram East"], currentStopIndex: 1, status: "Active", date: "15 May 2024" },
  { id: "R002", name: "T. Nagar - Anna Nagar - Koyambedu", busId: "B002", stops: ["T. Nagar Bus Terminus", "Nungambakkam", "Anna Nagar West", "Koyambedu Roundtana"], currentStopIndex: 0, status: "Active", date: "14 May 2024" },
  { id: "R003", name: "Mylapore - Marina - Central", busId: "B003", stops: ["Mylapore Tank", "Marina Light House", "Central Railway Station"], currentStopIndex: -1, status: "Inactive", date: "13 May 2024" }
];

const INITIAL_STUDENTS = [
  { id: "A001", studentId: "d1a19e51-e69a-4fd4-bd51-82209a92926a", studentName: "Ayesha Babu", rollNo: "105", class: "Class VI", busId: "B001", stopName: "IIT Madras" },
  { id: "A002", studentId: "1145db99-4672-4561-a7b0-b66176cb21a3", studentName: "Mohammed Arif", rollNo: "102", class: "Class V", busId: "B001", stopName: "Velachery Bypass" },
  { id: "A003", studentId: "98ddc461-cbd1-4efe-b2b8-2df777f0949c", studentName: "Kavya Mathew", rollNo: "103", class: "Class IV", busId: "B002", stopName: "Anna Nagar West" }
];

export default function Transport() {
  const isLocked = false;

  // Active Tab: buses, routes, students, tracking
  const [activeTab, setActiveTab] = useState<"buses" | "routes" | "students" | "tracking">("buses");

  // Core Data Lists (Hydrated from backend)
  const [buses, setBuses] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  // Db Students list for assignment dropdown
  const [dbStudents, setDbStudents] = useState<any[]>([]);

  // Search & Pagination States
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortAsc, setSortAsc] = useState(true);

  // Selected Trip for Tracking Tab
  const [selectedTripId, setSelectedTripId] = useState<string>("");

  // Pickup events per route: { [stopIndex]: { pickupTime, pickedCount } }
  const [pickupEvents, setPickupEvents] = useState<Record<string, any[]>>({});
  const [pickupModal, setPickupModal] = useState<{ stopName: string; stopIndex: number } | null>(null);
  const [pickupCount, setPickupCount] = useState<number>(0);
  const [pickupLoading, setPickupLoading] = useState(false);

  // Modals States
  const [openBusModal, setOpenBusModal] = useState(false);
  const [editingBus, setEditingBus] = useState<any>(null);
  const [busForm, setBusForm] = useState({ busNumber: "", plateNumber: "", capacity: 40, driverName: "", driverPhone: "", status: "Active" });

  const [openRouteModal, setOpenRouteModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<any>(null);
  const [routeForm, setRouteForm] = useState({ name: "", busId: "", stops: ["", ""], status: "Active", shift: "Morning" });

  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [assignForm, setAssignForm] = useState({ studentId: "", busId: "", stopName: "" });

  const [confirmDelete, setConfirmDelete] = useState<{ type: "bus" | "route" | "student", id: string } | null>(null);

  // Hydration on mount
  useEffect(() => {
    fetchBuses();
    fetchRoutes();
    fetchAssignments();
    fetchDbStudents();
  }, []);

  // Fetch pickup events when selected route changes
  useEffect(() => {
    if (selectedTripId) {
      fetchPickupEvents(selectedTripId);
    }
  }, [selectedTripId]);

  // Recompute assignable students when dependencies change
  useEffect(() => {
    // This will trigger recomputation of assignableStudents via the variable defined above
  }, [dbStudents, students, assignForm.busId]);
  const fetchBuses = async () => {
    try {
      const data = await transportService.getBuses();
      setBuses(data.length > 0 ? data : INITIAL_BUSES);
    } catch (e) {
      console.error("Failed to load buses from db, using fallback", e);
      setBuses(INITIAL_BUSES);
    }
  };

  const fetchRoutes = async () => {
    try {
      const data = await transportService.getTransport();
      setRoutes(data.length > 0 ? data : INITIAL_ROUTES);
      if (data.length > 0 && !selectedTripId) {
        const activeRoute = data.find((r: any) => r.status === "Active");
        if (activeRoute) setSelectedTripId(activeRoute.id);
      }
    } catch (e) {
      console.error("Failed to load routes from db, using fallback", e);
      setRoutes(INITIAL_ROUTES);
      if (!selectedTripId) setSelectedTripId("R001");
    }
  };

  const fetchAssignments = async () => {
    try {
      const data = await transportService.getAssignments();
      setStudents(data.length > 0 ? data : INITIAL_STUDENTS);
    } catch (e) {
      console.error("Failed to load assignments from db, using fallback", e);
      setStudents(INITIAL_STUDENTS);
    }
  };

  const fetchDbStudents = async () => {
    try {
      const res = await studentService.getStudents({ limit: 200 });
      const rows = res.rows ?? res.data ?? [];
      setDbStudents(rows);
    } catch (err) {
      console.error("Failed to fetch student catalog for dropdown:", err);
    }
  };

  const fetchPickupEvents = async (routeId: string) => {
    try {
      const data = await transportService.getPickupEvents(routeId);
      // Index by stopIndex for O(1) lookup
      const indexed: Record<string, any> = {};
      (data || []).forEach((e: any) => {
        indexed[e.stopIndex] = e;
      });
      setPickupEvents(prev => ({ ...prev, [routeId]: indexed }));
    } catch (e) {
      // silently ignore
    }
  };

  const handleRefresh = async () => {
    try {
      await fetchBuses();
      await fetchRoutes();
      await fetchAssignments();
      if (selectedTripId) fetchPickupEvents(selectedTripId);
      toast.success("Logistics refreshed from database");
    } catch (e) {
      toast.error("Failed to refresh database records");
    }
  };

  /* 🔄 DYNAMIC SVG GEOMETRY FOR WAVY ROUTE MAP */
  const getStopCoords = (index: number, total: number) => {
    const startX = 50;
    const endX = 450;
    const width = endX - startX;
    const step = total > 1 ? width / (total - 1) : 0;
    const x = startX + index * step;
    // Dynamic wave shape: sine curve height
    const y = 90 + Math.sin(index * 1.5) * 35;
    return { x, y };
  };

  const generateSvgCurvePath = (total: number) => {
    if (total <= 0) return "";
    let d = "";
    for (let i = 0; i < total; i++) {
      const { x, y } = getStopCoords(i, total);
      if (i === 0) {
        d += `M ${x},${y}`;
      } else {
        const prev = getStopCoords(i - 1, total);
        const cpX = (prev.x + x) / 2;
        d += ` C ${cpX},${prev.y} ${cpX},${y} ${x},${y}`;
      }
    }
    return d;
  };

  /* 🚌 BUS FORM HANDLING */
  const handleSaveBus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!busForm.busNumber || !busForm.plateNumber || !busForm.driverName) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingBus) {
        await transportService.updateBus(editingBus.id, busForm);
        toast.success("Bus fleet details updated");
      } else {
        const newBus = {
          id: `B${Date.now().toString().slice(-3)}`,
          ...busForm
        };
        await transportService.createBus(newBus);
        toast.success("New bus registered");
      }
      setOpenBusModal(false);
      setEditingBus(null);
      setBusForm({ busNumber: "", plateNumber: "", capacity: 40, driverName: "", driverPhone: "", status: "Active" });
      fetchBuses();
    } catch (err) {
      toast.error("Failed to save bus logistics");
    }
  };

  const handleEditBusClick = (bus: any) => {
    setEditingBus(bus);
    setBusForm({
      busNumber: bus.busNumber,
      plateNumber: bus.plateNumber,
      capacity: bus.capacity,
      driverName: bus.driverName,
      driverPhone: bus.driverPhone,
      status: bus.status
    });
    setOpenBusModal(true);
  };

  /* 🛣️ ROUTE FORM HANDLING */
  const handleSaveRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredStops = routeForm.stops.filter(s => s.trim() !== "");
    if (!routeForm.name || filteredStops.length < 2) {
      toast.error("Route name and at least 2 stops are required");
      return;
    }

    try {
      if (editingRoute) {
        await transportService.updateTransport(editingRoute.id, {
          name: routeForm.name,
          busId: routeForm.busId,
          stops: filteredStops,
          status: routeForm.status,
          shift: routeForm.shift
        });
        toast.success("Route path configuration updated");
      } else {
        const newRoute = {
          id: `R${Date.now().toString().slice(-3)}`,
          name: routeForm.name,
          busId: routeForm.busId,
          stops: filteredStops,
          currentStopIndex: -1,
          status: routeForm.status,
          shift: routeForm.shift,
          date: new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
        };
        await transportService.createTransport(newRoute);
        toast.success("New route path published");
      }
      setOpenRouteModal(false);
      setEditingRoute(null);
      setRouteForm({ name: "", busId: "", stops: ["", ""], status: "Active", shift: "Morning" });
      fetchRoutes();
    } catch (err) {
      toast.error("Failed to save route logistics");
    }
  };

  const handleEditRouteClick = (route: any) => {
    setEditingRoute(route);
    setRouteForm({
      name: route.name,
      busId: route.busId,
      stops: [...route.stops],
      status: route.status,
      shift: route.shift || 'Morning'
    });
    setOpenRouteModal(true);
  };

  const handleAddStopField = () => {
    setRouteForm(prev => ({ ...prev, stops: [...prev.stops, ""] }));
  };

  const handleRemoveStopField = (index: number) => {
    if (routeForm.stops.length <= 2) {
      toast.error("A route requires at least 2 stops");
      return;
    }
    setRouteForm(prev => ({
      ...prev,
      stops: prev.stops.filter((_, idx) => idx !== index)
    }));
  };

  const handleStopFieldChange = (index: number, val: string) => {
    const updated = [...routeForm.stops];
    updated[index] = val;
    setRouteForm(prev => ({ ...prev, stops: updated }));
  };

  /* 🎓 STUDENT ASSIGNMENT */
  // Compute students eligible for assignment (not already assigned to selected bus)
  const assignableStudents = dbStudents.filter(dbStu =>
    !students.some(asg => asg.studentId === dbStu.id)
  );

  const handleAssignStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignForm.studentId || !assignForm.busId || !assignForm.stopName) {
      toast.error("Please fill in all assignment fields");
      return;
    }

    const matchedStudent = dbStudents.find(s => s.id === assignForm.studentId) ||
      { name: "Assigned Student", roll_number: "—", academic_year: "—" };

    const newAssignment = {
      id: `A${Date.now().toString().slice(-3)}`,
      studentId: assignForm.studentId,
      studentName: matchedStudent.name || "Assigned Student",
      rollNo: matchedStudent.roll_number?.toString() || "—",
      class: matchedStudent.class || matchedStudent.academic_year || "Class VI",
      busId: assignForm.busId,
      stopName: assignForm.stopName
    };

    // Check capacity limit
    const selectedBus = buses.find(b => b.id === assignForm.busId);
    const alreadyAssignedCount = students.filter(s => s.busId === assignForm.busId).length;
    if (selectedBus && alreadyAssignedCount >= selectedBus.capacity) {
      toast.error(`Cannot assign! Bus ${selectedBus.busNumber} capacity limit (${selectedBus.capacity}) reached.`);
      return;
    }

    try {
      await transportService.createAssignment(newAssignment);
      setOpenAssignModal(false);
      setAssignForm({ studentId: "", busId: "", stopName: "" });
      toast.success("Student assigned to transport pass");
      fetchAssignments();
    } catch (err) {
      toast.error("Failed to assign student to transport");
    }
  };

  /* 🗑️ DELETE DATA SYSTEM */
  const handleDeleteItem = async () => {
    if (!confirmDelete) return;
    const { type, id } = confirmDelete;

    try {
      if (type === "bus") {
        await transportService.deleteBus(id);
        toast.success("Bus deleted successfully");
        fetchBuses();
        fetchRoutes(); // sync bus id removal in route
        fetchAssignments(); // sync bus assignments removal
      } else if (type === "route") {
        await transportService.deleteTransport(id);
        toast.success("Route path deleted");
        fetchRoutes();
      } else if (type === "student") {
        await transportService.deleteAssignment(id);
        toast.success("Assignment card removed");
        fetchAssignments();
      }
    } catch (err) {
      toast.error("Failed to delete database record");
    }
    setConfirmDelete(null);
  };

  /* 📍 LIVE TRIP TRACKING PERSISTENT UPDATE */
  const activeTrackingTrip = routes.find(r => r.id === selectedTripId) || routes[0];
  const assignedBusForTrip = activeTrackingTrip ? buses.find(b => b.id === activeTrackingTrip.busId) : null;
  const stopsForTrip = activeTrackingTrip ? activeTrackingTrip.stops : [];
  const activeTripStudents = activeTrackingTrip ? students.filter(s => s.busId === activeTrackingTrip.busId) : [];

  const handleAdvanceTripStop = async () => {
    if (!activeTrackingTrip) return;
    const maxIdx = activeTrackingTrip.stops.length - 1;
    const currentIdx = activeTrackingTrip.currentStopIndex;

    if (currentIdx >= maxIdx) {
      toast.error("Trip already completed.");
      return;
    }

    const nextIdx = currentIdx + 1;
    try {
      await transportService.updateTransport(activeTrackingTrip.id, {
        currentStopIndex: nextIdx
      });
      fetchRoutes();
      setSelectedTripId(activeTrackingTrip.id);
      if (nextIdx === maxIdx) {
        toast.success(`Arrived at destination terminal: ${activeTrackingTrip.stops[maxIdx]}`);
      } else {
        toast.success(`Reached: ${activeTrackingTrip.stops[nextIdx]}`);
      }
    } catch (err) {
      toast.error("Failed to update trip progress");
    }
  };

  // Determine if current trip is Morning (Pickup) or Evening (Drop)
  const isMorningShift = activeTrackingTrip?.shift?.toLowerCase() !== "evening";
  const actionLabel = isMorningShift ? "Pickup" : "Drop";
  const actionLabelLower = isMorningShift ? "pickup" : "drop";
  const actionEmoji = isMorningShift ? "🚌" : "🏠";
  const pastActionLabel = isMorningShift ? "Picked" : "Dropped";

  const handlePickupConfirm = async () => {
    if (!pickupModal || !activeTrackingTrip) return;
    setPickupLoading(true);
    try {
      await transportService.createPickupEvent(activeTrackingTrip.id, {
        stopName: pickupModal.stopName,
        stopIndex: pickupModal.stopIndex,
        pickedCount: pickupCount
      });
      await fetchPickupEvents(activeTrackingTrip.id);
      toast.success(`✅ ${actionLabel} recorded at ${pickupModal.stopName}: ${pickupCount} students`);
      setPickupModal(null);
      setPickupCount(0);
    } catch (err) {
      toast.error(`Failed to record ${actionLabelLower}`);
    }
    setPickupLoading(false);
  };

  const handleResetTrip = async () => {
    if (!activeTrackingTrip) return;
    try {
      await transportService.updateTransport(activeTrackingTrip.id, {
        currentStopIndex: -1
      });
      fetchRoutes();
      toast.success("Trip coordinates reset");
    } catch (err) {
      toast.error("Failed to reset trip coordinates");
    }
  };

  const handleSetStopIndex = async (idx: number) => {
    if (!activeTrackingTrip) return;
    try {
      await transportService.updateTransport(activeTrackingTrip.id, {
        currentStopIndex: idx
      });
      fetchRoutes();
      toast.success(idx === -1 ? "Status: Out of service" : `Departed toward Stop: ${activeTrackingTrip.stops[idx]}`);
    } catch (err) {
      toast.error("Failed to update checkpoint status");
    }
  };

  /* 🔍 DATA FILTERS */
  const getFilteredData = () => {
    if (activeTab === "buses") {
      return buses.filter(b =>
        b.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.plateNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (activeTab === "routes") {
      return routes.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return students.filter(s =>
        s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.stopName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="relative p-6 bg-slate-50 min-h-screen">
      
      {/* 🔒 FULL PAGE BLUR LOCK */}
      {isLocked && (
        <div className="absolute inset-0 z-50 bg-white/20 backdrop-blur-sm flex items-center justify-center rounded-2xl">
          <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center border border-slate-100">
            <p className="text-sm font-semibold text-slate-800">
              Subscription Upgrade Required — Contact Atelier Creation
            </p>
            <button
              onClick={() => (window.location.href = "tel:+919999999999")}
              className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition"
            >
              📞 Call Atelier
            </button>
          </div>
        </div>
      )}

      <div className={`space-y-6 ${isLocked ? "pointer-events-none select-none" : ""}`}>
        
        {/* HEADER */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Bus className="w-7 h-7 text-indigo-600 animate-bounce" />
              Transport Management
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Manage school transport fleet, driver logistics, stops, route planning, and live tracking checkpoints.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              title="Refresh database records"
              className="p-2.5 border border-slate-200 bg-white rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
            >
              <RefreshCcw size={16} />
            </button>
            <button
              onClick={() => window.print()}
              title="Print page"
              className="p-2.5 border border-slate-200 bg-white rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
            >
              <Printer size={16} />
            </button>
            
            {activeTab === "buses" && (
              <button
                onClick={() => { setEditingBus(null); setOpenBusModal(true); }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-indigo-100 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Bus
              </button>
            )}

            {activeTab === "routes" && (
              <button
                onClick={() => { setEditingRoute(null); setOpenRouteModal(true); }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-indigo-100 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Create Route
              </button>
            )}

            {activeTab === "students" && (
              <button
                onClick={() => setOpenAssignModal(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-indigo-100 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Assign Student
              </button>
            )}
          </div>
        </div>

        {/* TABS CONTROLLER */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm">
          {[
            { id: "buses", label: "Buses & Drivers", icon: Bus },
            { id: "routes", label: "Routes & Stops", icon: MapPin },
            { id: "students", label: "Student Assignments", icon: Users },
            { id: "tracking", label: "Live Admin Tracking", icon: Navigation }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <tab.icon className="w-4.5 h-4.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= TAB 4: LIVE TRACKING (PERSISTENT VISUAL) ================= */}
        {activeTab === "tracking" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            
            {/* TRIP SELECTION & STATS */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              <div>
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Map className="w-5 h-5 text-indigo-600" />
                  Select Trip to Track
                </h3>
                <p className="text-xs text-slate-500 mt-1">Choose an active bus route to monitor or update progress.</p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Route</label>
                <select
                  value={selectedTripId}
                  onChange={(e) => setSelectedTripId(e.target.value)}
                  className="w-full mt-1.5 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 font-semibold cursor-pointer"
                >
                  <option value="">Choose Active Route</option>
                  {routes.filter(r => r.status === "Active").map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({buses.find(b => b.id === r.busId)?.busNumber || 'No Bus'}) ({r.shift ?? 'Morning'})
                    </option>
                  ))}
                </select>
              </div>

              {activeTrackingTrip && (
                <div className="border-t pt-5 space-y-4 text-xs">
                  <h4 className="font-bold text-slate-700 uppercase tracking-wider">Trip Details</h4>
                  
                  <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-slate-400 font-medium">Assigned Bus:</span>
                    <span className="text-slate-800 font-bold">{assignedBusForTrip?.busNumber || "—"}</span>
                  </div>
                  <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-slate-400 font-medium">Driver:</span>
                    <span className="text-slate-800 font-bold">{assignedBusForTrip?.driverName || "—"}</span>
                  </div>
                  <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-slate-400 font-medium">Contact:</span>
                    <span className="text-slate-800 font-bold">{assignedBusForTrip?.driverPhone || "—"}</span>
                  </div>
                  <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-slate-400 font-medium">Bus Capacity:</span>
                    <span className="text-slate-800 font-bold">{assignedBusForTrip ? `${activeTripStudents.length} / ${assignedBusForTrip.capacity} Assigned` : "—"}</span>
                  </div>
                  {activeTrackingTrip.shift && (
                    <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-slate-400 font-medium">Shift:</span>
                      <span className="text-slate-800 font-bold capitalize">{activeTrackingTrip.shift}</span>
                    </div>
                  )}
                  <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-slate-400 font-medium">Trip Progress:</span>
                    <span className="text-indigo-600 font-bold">
                      {activeTrackingTrip.currentStopIndex === -1
                        ? "Not Started"
                        : activeTrackingTrip.currentStopIndex === stopsForTrip.length - 1
                        ? "Finished"
                        : `Stop ${activeTrackingTrip.currentStopIndex + 1} of ${stopsForTrip.length}`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* LIVE STEPPER CONTROLLER & VISUAL MAP */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* ANIMATED SVG PATH TRAVEL MAP */}
              {activeTrackingTrip && stopsForTrip.length > 0 && (
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
                  <div className="w-full flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-600 animate-pulse" /> Live Trip Track
                    </h3>
                    <span className="px-2 py-0.5 bg-emerald-55 text-emerald-800 text-[10px] font-bold rounded">DB Synced</span>
                  </div>
                  
                  <div className="w-full overflow-x-auto p-4 flex justify-center bg-slate-50 rounded-xl relative">
                    <svg viewBox="0 0 500 180" className="w-full max-w-[500px] h-[180px] overflow-visible">
                      <path
                        d={generateSvgCurvePath(stopsForTrip.length)}
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="6"
                        strokeLinecap="round"
                        className="opacity-40"
                      />
                      
                      {activeTrackingTrip.currentStopIndex >= 0 && (
                        <path
                          d={generateSvgCurvePath(activeTrackingTrip.currentStopIndex + 1)}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                      )}

                      {stopsForTrip.map((stop, idx) => {
                        const coords = getStopCoords(idx, stopsForTrip.length);
                        const isReached = idx <= activeTrackingTrip.currentStopIndex;
                        const isCurrent = idx === activeTrackingTrip.currentStopIndex;

                        return (
                          <g key={idx} className="cursor-pointer" onClick={() => handleSetStopIndex(idx)}>
                            {isCurrent && (
                              <circle
                                cx={coords.x}
                                cy={coords.y}
                                r="12"
                                fill="#3b82f6"
                                className="animate-ping opacity-30"
                              />
                            )}
                            <circle
                              cx={coords.x}
                              cy={coords.y}
                              r="8"
                              fill={isCurrent ? "#2563eb" : isReached ? "#10b981" : "#94a3b8"}
                              stroke="white"
                              strokeWidth="2"
                              className="transition-colors duration-300"
                            />
                            <text
                              x={coords.x}
                              y={coords.y - 14}
                              textAnchor="middle"
                              className="text-[9px] font-bold fill-slate-700 select-none"
                            >
                              {stop}
                            </text>
                            <text
                              x={coords.x}
                              y={coords.y + 20}
                              textAnchor="middle"
                              className="text-[8px] font-semibold fill-slate-400 select-none"
                            >
                              Stop {idx + 1}
                            </text>
                          </g>
                        );
                      })}

                      {stopsForTrip.length > 0 && (
                        <g
                          style={{
                            transform: `translate(${
                              activeTrackingTrip.currentStopIndex === -1
                                ? getStopCoords(0, stopsForTrip.length).x - 30
                                : getStopCoords(activeTrackingTrip.currentStopIndex, stopsForTrip.length).x
                            }px, ${
                              activeTrackingTrip.currentStopIndex === -1
                                ? getStopCoords(0, stopsForTrip.length).y
                                : getStopCoords(activeTrackingTrip.currentStopIndex, stopsForTrip.length).y
                            }px)`,
                            transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)"
                          }}
                        >
                          <g transform="translate(-16, -16)">
                            <circle cx="16" cy="16" r="16" fill="#4f46e5" className="shadow-lg border-2 border-white" />
                            <text x="16" y="21" textAnchor="middle" className="text-[12px]">🚌</text>
                          </g>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* ADMIN TRACKING CONTROL PANEL */}
              {activeTrackingTrip && stopsForTrip.length > 0 && (
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4">
                    <div>
                      <h4 className="font-bold text-slate-800">Admin Stop Tracker Console</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Stops reached will persist immediately in the backend database.</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleResetTrip}
                        className="py-2 px-4 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition shadow-sm"
                      >
                        Reset Trip
                      </button>
                      <button
                        onClick={handleAdvanceTripStop}
                        disabled={activeTrackingTrip.currentStopIndex === stopsForTrip.length - 1}
                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white rounded-xl text-xs font-bold active:scale-95 transition shadow-md disabled:cursor-not-allowed"
                      >
                        Mark Next Stop Reached
                      </button>
                    </div>
                  </div>

                  {/* VERTICAL STEPPER LIST */}
                  <div className="mt-6 space-y-4">
                    {stopsForTrip.map((stop, idx) => {
                      const isReached = idx <= activeTrackingTrip.currentStopIndex;
                      const isCurrent = idx === activeTrackingTrip.currentStopIndex;
                      const stopStudents = activeTripStudents.filter(s => s.stopName.toLowerCase() === stop.toLowerCase());
                      const routePickups = pickupEvents[activeTrackingTrip.id] || {};
                      const pickupRecord = routePickups[idx];

                      return (
                        <div key={idx} className="flex gap-4 items-start relative group">
                          {idx !== stopsForTrip.length - 1 && (
                            <div className={`absolute left-[13px] top-[26px] bottom-[-22px] w-[2px] ${idx < activeTrackingTrip.currentStopIndex ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                          )}

                          <div
                            onClick={() => handleSetStopIndex(idx)}
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 cursor-pointer transition-all ${
                              isCurrent
                                ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                                : isReached
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-200 text-slate-400 group-hover:bg-slate-300"
                            }`}
                          >
                            {isReached ? <Check className="w-4 h-4" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                          </div>

                          <div className={`flex-grow p-3 border rounded-xl shadow-sm transition-all ${
                            isCurrent ? 'bg-indigo-50/55 border-indigo-200 ring-2 ring-indigo-100'
                            : isReached ? 'bg-emerald-50/30 border-slate-100'
                            : 'bg-white border-slate-100'
                          }`}>
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-grow">
                                <h5 className="font-bold text-slate-800 text-sm">{stop}</h5>
                                <span className={`text-[10px] font-semibold ${isCurrent ? 'text-indigo-600' : isReached ? 'text-emerald-600' : 'text-slate-400'}`}>
                                  {isCurrent ? "📍 Bus Currently Here" : isReached ? "✓ Reached & Departed" : "⏳ Pending Arrival"}
                                </span>
                              </div>

                              {/* PICKUP/DROP BUTTON — only shown when bus is at this stop */}
                              {isCurrent && (
                                <button
                                  onClick={() => {
                                    setPickupModal({ stopName: stop, stopIndex: idx });
                                    setPickupCount(stopStudents.length);
                                  }}
                                  className={`flex items-center gap-1 px-3 py-1.5 ${isMorningShift ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-amber-500 hover:bg-amber-600'} active:scale-95 text-white rounded-lg text-[11px] font-bold shadow-md transition-all animate-pulse`}
                                >
                                  {actionEmoji} {actionLabel}
                                </button>
                              )}

                              <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Stop {idx + 1}</span>
                            </div>

                            {/* PICKUP/DROP RECORD */}
                            {pickupRecord && (
                              <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                                <span className={`flex items-center gap-1 text-[11px] font-semibold ${isMorningShift ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'} px-2 py-0.5 rounded-full`}>
                                  🕐 {actionLabel}: {new Date(pickupRecord.pickupTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                                </span>
                                <span className="flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                                  👥 {pastActionLabel}: {pickupRecord.pickedCount} students
                                </span>
                              </div>
                            )}

                            {stopStudents.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                  <Users className="w-3.5 h-3.5 text-indigo-500" /> Students at Stop ({stopStudents.length})
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {stopStudents.map(student => (
                                    <span key={student.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold bg-white border border-slate-100 text-slate-600 shadow-sm">
                                      {student.studentName} <span className="text-[10px] text-slate-400">({student.class})</span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {(!activeTrackingTrip || stopsForTrip.length === 0) && (
                <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
                  <p className="text-slate-400 font-medium text-sm">Please register buses, routes, and active stops first to monitor live trips.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 1, 2, 3: DATA LIST VIEWS ================= */}
        {activeTab !== "tracking" && (
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
            
            {/* SUBHEADER CONTROLS */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg uppercase tracking-tight">
                  {activeTab === "buses" ? "Fleet List" : activeTab === "routes" ? "Routes & Schedules" : "Assigned Students"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage records and logistics configuration.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 w-52"
                  />
                </div>

                <button
                  onClick={() => {
                    const next = !sortAsc;
                    setSortAsc(next);
                    if (activeTab === "buses") {
                      setBuses(prev => [...prev].sort((a, b) => next ? a.busNumber.localeCompare(b.busNumber) : b.busNumber.localeCompare(a.busNumber)));
                    } else if (activeTab === "routes") {
                      setRoutes(prev => [...prev].sort((a, b) => next ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
                    } else {
                      setStudents(prev => [...prev].sort((a, b) => next ? a.studentName.localeCompare(b.studentName) : b.studentName.localeCompare(a.studentName)));
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort A-Z
                </button>
              </div>
            </div>

            {/* DATA TABLE */}
            <div className="hidden lg:block overflow-x-auto">
              {paginatedData.length > 0 ? (
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      {activeTab === "buses" && (
                        <>
                          <th className="px-6 py-4">Bus ID</th>
                          <th className="px-6 py-4">Bus Number</th>
                          <th className="px-6 py-4">Plate Number</th>
                          <th className="px-6 py-4">Driver Details</th>
                          <th className="px-6 py-4 text-center">Capacity</th>
                          <th className="px-6 py-4 text-center">Assigned Users</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </>
                      )}
                      {activeTab === "routes" && (
                        <>
                          <th className="px-6 py-4">Route ID</th>
                          <th className="px-6 py-4">Route Name</th>
                          <th className="px-6 py-4">Assigned Bus</th>
                          <th className="px-6 py-4">Total Stops</th>
                          <th className="px-6 py-4">Added On</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </>
                      )}
                      {activeTab === "students" && (
                        <>
                          <th className="px-6 py-4">Student Details</th>
                          <th className="px-6 py-4">Roll No / Class</th>
                          <th className="px-6 py-4">Assigned Bus</th>
                          <th className="px-6 py-4">Assigned Stop</th>
                          <th className="px-6 py-4 text-center">Actions</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                    {paginatedData.map((row: any) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition">
                        {/* ================= TAB: BUSES ================= */}
                        {activeTab === "buses" && (
                          <>
                            <td className="px-6 py-4 text-indigo-600 font-bold text-xs">{row.id}</td>
                            <td className="px-6 py-4 font-bold text-slate-800">{row.busNumber}</td>
                            <td className="px-6 py-4 text-xs font-semibold text-slate-500 inline-block bg-slate-100 rounded px-1.5 py-0.5 mt-3.5 ml-6">{row.plateNumber}</td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-bold text-slate-800 flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-400" /> {row.driverName}</span>
                                <span className="text-xs text-slate-400 flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {row.driverPhone}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-slate-800">{row.capacity} Seats</td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">
                                <Users className="w-3.5 h-3.5" />
                                {students.filter(s => s.busId === row.id).length} Active
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                row.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                {row.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleEditBusClick(row)}
                                  className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition"
                                >
                                  <Pencil size={15} />
                                </button>
                                <button
                                  onClick={() => setConfirmDelete({ type: "bus", id: row.id })}
                                  className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-rose-600 hover:text-rose-600 transition"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}

                        {/* ================= TAB: ROUTES ================= */}
                        {activeTab === "routes" && (
                          <>
                            <td className="px-6 py-4 text-indigo-600 font-bold text-xs">{row.id}</td>
                            <td className="px-6 py-4 font-bold text-slate-800">{row.name}</td>
                            <td className="px-6 py-4">
                              <span className="font-bold text-slate-700">
                                {buses.find(b => b.id === row.busId)?.busNumber || "Not Assigned"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500">
                              <span className="font-bold text-slate-700">{row.stops?.length || 0} stops</span>
                              <div className="text-[10px] text-slate-400 mt-1 max-w-[200px] truncate">
                                {row.stops?.join(" ➔ ")}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-slate-400 text-xs">{row.date}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                row.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-rose-50 text-rose-700"
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                {row.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedTripId(row.id);
                                    setActiveTab("tracking");
                                  }}
                                  title="Live Monitor Route"
                                  className="p-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                                >
                                  <Navigation size={15} />
                                </button>
                                <button
                                  onClick={() => handleEditRouteClick(row)}
                                  className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition"
                                >
                                  <Pencil size={15} />
                                </button>
                                <button
                                  onClick={() => setConfirmDelete({ type: "route", id: row.id })}
                                  className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-rose-600 hover:text-rose-600 transition"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}

                        {/* ================= TAB: STUDENTS ================= */}
                        {activeTab === "students" && (
                          <>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                  {row.studentName.slice(0,2)}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-bold text-slate-800">{row.studentName}</span>
                                  <span className="text-[10px] text-slate-400">ID: {row.studentId?.slice(0, 8)}...</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                              <span className="font-bold text-slate-700">#{row.rollNo}</span> / {row.class}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-bold text-slate-800 flex items-center gap-1">
                                  <Bus className="w-3.5 h-3.5 text-slate-400" />
                                  {buses.find(b => b.id === row.busId)?.busNumber || "—"}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {routes.find(r => r.busId === row.busId)?.name || "No Route Assigned"}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                                {row.stopName}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-center">
                                <button
                                  onClick={() => setConfirmDelete({ type: "student", id: row.id })}
                                  className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-rose-600 hover:text-rose-600 transition"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-12 text-center text-slate-400 font-medium">No transport records found matching search filters.</div>
              )}
            </div>

            {/* PAGINATION WRAPPER */}
            {filteredData.length > rowsPerPage && (
              <div className="flex justify-end gap-2 px-6 py-4 border-t text-sm bg-slate-50/50">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="px-3 py-1 border bg-white border-slate-200 rounded disabled:opacity-40 font-semibold text-slate-600 active:scale-95 transition"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded font-bold text-xs ${
                      currentPage === i + 1
                        ? "bg-indigo-600 text-white"
                        : "border bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="px-3 py-1 border bg-white border-slate-200 rounded disabled:opacity-40 font-semibold text-slate-600 active:scale-95 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ================= MODAL: ADD/EDIT BUS ================= */}
      {openBusModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fadeIn flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100 animate-scale">
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Bus className="w-5 h-5 text-indigo-600" />
                {editingBus ? "Edit Bus Fleet Details" : "Add New Bus"}
              </h3>
              <button onClick={() => setOpenBusModal(false)} className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBus} className="space-y-4 text-xs mt-4">
              <div>
                <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Bus Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BUS-104"
                  value={busForm.busNumber}
                  onChange={(e) => setBusForm({ ...busForm, busNumber: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">License Plate Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TN-07-AL-9999"
                  value={busForm.plateNumber}
                  onChange={(e) => setBusForm({ ...busForm, plateNumber: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Bus Capacity (Seats) *</label>
                  <input
                    type="number"
                    required
                    min="5"
                    max="100"
                    value={busForm.capacity}
                    onChange={(e) => setBusForm({ ...busForm, capacity: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Bus Status</label>
                  <select
                    value={busForm.status}
                    onChange={(e) => setBusForm({ ...busForm, status: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <h4 className="font-bold text-slate-700 text-xs flex items-center gap-1"><User className="w-4 h-4 text-indigo-500" /> Assigned Driver Details</h4>
                
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Driver Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Murugan M"
                    value={busForm.driverName}
                    onChange={(e) => setBusForm({ ...busForm, driverName: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Driver Contact Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 99999 88888"
                    value={busForm.driverPhone}
                    onChange={(e) => setBusForm({ ...busForm, driverPhone: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setOpenBusModal(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-indigo-100 active:scale-95 transition"
                >
                  {editingBus ? "Update Fleet" : "Add to Fleet"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL: ADD/EDIT ROUTE ================= */}
      {openRouteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fadeIn flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-100 animate-scale max-h-[90vh] flex flex-col">
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 shrink-0">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600 animate-bounce" />
                {editingRoute ? "Modify Route Logistics" : "Create New Route Path"}
              </h3>
              <button onClick={() => setOpenRouteModal(false)} className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoute} className="flex-grow overflow-y-auto pr-1 text-xs space-y-4 my-4">
              <div>
                <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Route Name / Path *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adyar - Thiruvanmiyur - Sholinganallur"
                  value={routeForm.name}
                  onChange={(e) => setRouteForm({ ...routeForm, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Assign Fleet Bus</label>
                  <select
                    value={routeForm.busId}
                    onChange={(e) => setRouteForm({ ...routeForm, busId: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                  >
                    <option value="">Choose Available Bus</option>
                    {buses.map(b => (
                      <option key={b.id} value={b.id}>{b.busNumber} ({b.driverName})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Route Status</label>
                  <select
                    value={routeForm.status}
                    onChange={(e) => setRouteForm({ ...routeForm, status: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Shift</label>
                  <select
                    value={routeForm.shift}
                    onChange={(e) => setRouteForm({ ...routeForm, shift: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
              </div>

              {/* DYNAMIC STOPS INPUTS */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-700 text-xs flex items-center gap-1">
                    <Clock className="w-4 h-4 text-indigo-500" /> Route Stops Stepper List
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddStopField}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    + Add Stop Checkpoint
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">Order stops sequentially from departure to final terminal.</p>

                <div className="space-y-3 mt-2 max-h-[220px] overflow-y-auto pr-1">
                  {routeForm.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-500 shrink-0">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        required
                        placeholder={`e.g. Stop ${index + 1} station`}
                        value={stop}
                        onChange={(e) => handleStopFieldChange(index, e.target.value)}
                        className="flex-grow border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveStopField(index)}
                        className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t shrink-0">
                <button
                  type="button"
                  onClick={() => setOpenRouteModal(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-indigo-100 active:scale-95 transition"
                >
                  {editingRoute ? "Update Path" : "Publish Route"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL: ASSIGN STUDENT ================= */}
      {openAssignModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fadeIn flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100 animate-scale">
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Assign Student to Transport
              </h3>
              <button onClick={() => setOpenAssignModal(false)} className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignStudent} className="space-y-4 text-xs mt-4">
              <div>
                <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Select Student *</label>
                <select
                  required
                  value={assignForm.studentId}
                  onChange={(e) => setAssignForm({ ...assignForm, studentId: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                >
                  <option value="">Search Student</option>
                  {dbStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Roll No: #{s.roll_number || '—'} | Class: {s.AcademicConfig?.class?.name || '—'})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Select Bus Route *</label>
                <select
                  required
                  value={assignForm.busId}
                  onChange={(e) => {
                    const r = routes.find(rt => rt.busId === e.target.value);
                    setAssignForm({
                      ...assignForm,
                      busId: e.target.value,
                      stopName: r && r.stops.length > 0 ? r.stops[0] : ""
                    });
                  }}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Target Bus</option>
                  {routes.filter(r => r.status === "Active" && r.busId).map(r => (
                    <option key={r.id} value={r.busId}>
                      {buses.find(b => b.id === r.busId)?.busNumber} — {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {assignForm.busId && (
                <div>
                  <label className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Select Stop Checkpoint *</label>
                  <select
                    required
                    value={assignForm.stopName}
                    onChange={(e) => setAssignForm({ ...assignForm, stopName: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                  >
                    {routes.find(r => r.busId === assignForm.busId)?.stops.map((stop, idx) => (
                      <option key={idx} value={stop}>{stop}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setOpenAssignModal(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-indigo-100 active:scale-95 transition"
                >
                  Assign to Route
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL: PICKUP / DROP CONFIRMATION ================= */}
      {pickupModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fadeIn flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 animate-scale">
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle className={`w-5 h-5 ${isMorningShift ? 'text-emerald-600' : 'text-amber-600'} animate-bounce`} />
                Confirm Student {actionLabel}
              </h3>
              <button
                onClick={() => { setPickupModal(null); setPickupCount(0); }}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mt-4 text-sm">
              <div className={`${isMorningShift ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'} border rounded-xl p-4`}>
                <p className={`${isMorningShift ? 'text-emerald-800' : 'text-amber-800'} font-semibold text-xs uppercase tracking-wider mb-1`}>Stop Name</p>
                <p className={`${isMorningShift ? 'text-emerald-900' : 'text-amber-900'} font-bold text-base`}>{pickupModal.stopName}</p>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <p className="text-indigo-800 font-semibold text-xs uppercase tracking-wider mb-1">Route ({activeTrackingTrip?.shift || 'Morning'} Shift)</p>
                <p className="text-indigo-900 font-bold text-sm">{activeTrackingTrip?.name || "—"}</p>
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase tracking-wider text-xs block mb-1.5">
                  Number of Students {pastActionLabel} *
                </label>
                <input
                  type="number"
                  min={0}
                  value={pickupCount}
                  onChange={(e) => setPickupCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className={`w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 ${isMorningShift ? 'focus:ring-emerald-500' : 'focus:ring-amber-500'} focus:outline-none font-bold text-slate-800`}
                  placeholder="Enter student count"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Students assigned to this stop: {activeTripStudents.filter(s => s.stopName.toLowerCase() === pickupModal.stopName.toLowerCase()).length}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => { setPickupModal(null); setPickupCount(0); }}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePickupConfirm}
                  disabled={pickupLoading}
                  className={`px-5 py-2.5 ${isMorningShift ? 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-100' : 'bg-amber-600 hover:bg-amber-700 hover:shadow-amber-100'} disabled:bg-slate-300 text-white rounded-xl text-sm font-bold shadow-md active:scale-95 transition flex items-center gap-2`}
                >
                  {pickupLoading ? (
                    <>
                      <RefreshCcw className="w-4 h-4 animate-spin" /> Recording...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" /> Confirm {actionLabel}
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= CONFIRM DELETE DIALOG ================= */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 animate-scale">
            
            <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-600" />
              Confirm Revocation
            </h3>
            
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete this {confirmDelete.type}? 
              {confirmDelete.type === "bus" && " Removing this bus will clear its route and student assignments."}
              {confirmDelete.type === "route" && " Deleting this route path will clear its stops map."}
              {confirmDelete.type === "student" && " Removing this student assignment will clear their bus pass details."}
              <br /><strong>This action is irreversible.</strong>
            </p>

            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteItem}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-rose-100 active:scale-95 transition"
              >
                Delete Record
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
