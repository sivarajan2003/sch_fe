import {
  LayoutDashboard,
  GraduationCap, ChevronDown, Building2, BookOpen, Calendar,
  FileText, DollarSign, MessageSquare, Settings, LayoutGrid, Columns, AlignLeft, Box as BoxIcon,
  DoorOpen, CalendarDays,
  Layers, Table, ClipboardList,
  FileCheck, HelpCircle, Wallet, Book, Activity,
  Building, Bus, UserCog, CalendarCheck, Briefcase, FileBarChart2, Mail,
  ClipboardCheck,
  Lock,
  CalendarOff,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import PreLogo from "../assets/pre2.png";
import SchFull from "../assets/sch1.png";   // full sidebar logo
import SchCollapsed from "../assets/sch2.png"; // collapsed icon logo

export default function Sidebar({
  collapsed,
}: {
  collapsed: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const rawRole = localStorage.getItem("role");
  const role = (rawRole === "Super Admin" || rawRole === "super admin") ? "admin" : rawRole;
  const isParent = role === "parent";
  const isParentPortal = localStorage.getItem("portal") === "true";

  const isApplicationsContext =
    role === "admin" &&
    location.pathname.startsWith("/admin/dashboard/receptionist");

  const basePath =
    role === "admin"
      ? "/admin/dashboard"
      : role === "Super Admin"
        ? "/admin/dashboard"
        : role === "teacher"
          ? "/teacher/dashboard"
          : role === "student"
            ? "/student/dashboard"
            : "/parent/dashboard";

  const isActive = (path: string) =>
    location.pathname === path;

  const isPeopleActive = location.pathname.startsWith(
    `${basePath}/people`
  );

  const canAccess = (allowedRoles: string[]) =>
    role ? allowedRoles.includes(role) : false;
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  //const role = localStorage.getItem("role");
  //const [openDashboard, setOpenDashboard] = useState(true);
  const [openApplications, setOpenApplications] = useState(
    location.pathname.startsWith(
      "/admin/dashboard/receptionist/admissions"
    )
  );

  const isAdminDashboard =
    location.pathname === "/admin/dashboard";

  const isReceptionistDashboard =
    location.pathname.startsWith("/admin/dashboard/receptionist");

  const [openPeople, setOpenPeople] = useState(
    location.pathname.startsWith(`${basePath}/people`)
  );
  const canSeeAdmission =
    role === "admin" ||
    role === "Super Admin" ||
    role === "receptionist" ||
    (role === "parent" && isParentPortal);
  const isPureParentPortal =
    role === "parent" && isParentPortal;


  const [openStudents, setOpenStudents] = useState(false);
  const [openTeachers, setOpenTeachers] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openAcademic, setOpenAcademic] = useState(
    location.pathname.startsWith(`${basePath}/academic`)
  );

  const [openClasses, setOpenClasses] = useState(false);
  const [openExams, setOpenExams] = useState(
    location.pathname.startsWith(`${basePath}/academic/examinations`)
  );
  const [openManagement, setOpenManagement] = useState(false);
const [openHRM, setOpenHRM] = useState(false);
const [openHostelManagement, setOpenHostelManagement] = useState(false);

  //const [openManagement, setOpenManagement] = useState(true);
  const [openFees, setOpenFees] = useState(false);
  const [openLibrary, setOpenLibrary] = useState(false);
  const [openHostel, setOpenHostel] = useState(false);
  const [openTransport, setOpenTransport] = useState(false);
  //const [openHRM, setOpenHRM] = useState(true);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openLeaves, setOpenLeaves] = useState(false);
  const [openReports, setOpenReports] = useState(
    location.pathname.startsWith(`${basePath}/reports`)
  );
  const admissionBasePath = isPureParentPortal
    ? "/parent/dashboard/admissions"
    : "/admin/dashboard/receptionist/admissions";

  /* MANAGEMENT ACTIVE CHECK */
  const isManagementActive = location.pathname.startsWith(
    "/admin/dashboard/management"
  );
  const isManagementItemActive = (path: string) =>
    location.pathname.startsWith(path);
  const isAdmissionAdmin =
    JSON.parse(localStorage.getItem("user") || "{}")?.admissionAdmin === true;
const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div
      className={`${collapsed ? "w-20" : "w-64"
        } bg-white border-r h-screen overflow-y-auto no-scrollbar transition-all duration-300`}
    >
      {/* ================= HEADER ================= */}
      <div className="h-16 border-b flex items-center px-4">
        <div
          className={`flex items-center transition-all duration-300
      ${collapsed ? "justify-center" : "justify-start"}
    `}
        >
          <img
            src={collapsed ? SchCollapsed : SchFull}
            alt="School Logo"
            className={`object-contain transition-all duration-300
        ${collapsed ? "h-14 w-14" : "h-18 w-auto"}
      `}
          />
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {canAccess(["admin", "teacher", "student", "parent"]) && (
          <>
            {/* ===== DIRECT DASHBOARDS ===== */}
            {/* ADMIN – SEE ALL DASHBOARDS */}
            {role === "admin" && (
              <>
               
 <MenuItem
  icon={LayoutDashboard}
  label="Admin Dashboard"
  onClick={() => navigate("/admin/dashboard")}
  active={location.pathname === "/admin/dashboard"}
  collapsed={collapsed}
/>
                {/* <MenuItem
                  icon={UserCheck}
                  label="Receptionist Dashboard"
                  onClick={() => navigate("/admin/dashboard/receptionist")}
                  active={location.pathname.startsWith("/admin/dashboard/receptionist")}
                  collapsed={collapsed}
                /> */}

                {/* <MenuItem
                  icon={GraduationCap}
                  label="Student Dashboard"
                  onClick={() => navigate("/student/dashboard")}
                  active={location.pathname.startsWith("/student/dashboard")}
                  collapsed={collapsed}
                /> */}

                {/* <MenuItem
                  icon={Users}
                  label="Teacher Dashboard"
                  onClick={() => navigate("/teacher/dashboard")}
                  active={location.pathname.startsWith("/teacher/dashboard")}
                  collapsed={collapsed}
                /> */}

                {/* <MenuItem
                  icon={User}
                  label="Parent Dashboard"
                  onClick={() => navigate("/parent/dashboard")}
                  active={location.pathname.startsWith("/parent/dashboard")}
                  collapsed={collapsed}
                /> */}
              </>
            )}
            {role === "teacher" && (
              <MenuItem
                icon={Users}
                label="Teacher Dashboard"
                onClick={() => navigate("/teacher/dashboard")}
                active={location.pathname.startsWith("/teacher/dashboard")}
                collapsed={collapsed}
              />
            )}

            {role === "student" && (
              <MenuItem
                icon={GraduationCap}
                label="Student Dashboard"
                onClick={() => navigate("/student/dashboard")}
                active={location.pathname.startsWith("/student/dashboard")}
                collapsed={collapsed}
              />
            )}
            {role === "parent" && (
              <MenuItem
                icon={User}
                label="Parent Dashboard"
                onClick={() => navigate("/parent/dashboard")}
                active={location.pathname.startsWith("/parent/dashboard")}
                collapsed={collapsed}
              />
            )}
          </>

        )}
        {/* ================= APPLICATIONS (Receptionist Only) ================= */}
        {canSeeAdmission && (
          <>
            <SectionHeader
              icon={ClipboardList}
              label="Admission"
              collapsed={collapsed}
              open={activeSection === "admission"}
onClick={() =>
  setActiveSection(activeSection === "admission" ? null : "admission")
}

            />
            {!collapsed && activeSection === "admission" && (
              <div className="ml-6 mt-2 space-y-1">
 {/* <MenuItem
                  icon={LayoutDashboard}
                  label="AdmissionDashboard"
                  onClick={() => navigate("/admin/dashboard/receptionist")}
                  active={location.pathname === "/admin/dashboard/receptionist"}
                  collapsed={collapsed}
                /> */}
                <ApplicationItem
  label="AdmissionDashboard"
  icon={LayoutDashboard}
  path="/admin/dashboard/receptionist"
/>
                  <ApplicationItem
                    label="All Applications"
                    icon={FileText}
                    path={`${admissionBasePath}/all`}
                  />
                  
                {!isPureParentPortal && (
                  <ApplicationItem
                    label="Application Form"
                    icon={FileText}
                    path={`${admissionBasePath}/application-form`}
                  />
                )}

                {isPureParentPortal && (
                  <ApplicationItem
                    label="Fee Payment"
                    icon={Wallet}
                    path={`${admissionBasePath}/fee-payment`}
                  />
                )}

                {!isPureParentPortal && (
                  <ApplicationItem
                    label="Verification"
                    icon={ClipboardCheck}
                    path={`${admissionBasePath}/verification`}
                  />
                )}

                {/* {!isPureParentPortal && (
                  <ApplicationItem
                    label="New Application"
                    icon={Mail}
                    path={`${admissionBasePath}/new`}
                  />
                )} */}


                <ApplicationItem
                  label="Documents"
                  icon={ClipboardCheck}
                  path={`${admissionBasePath}/documents`}
                />

                <ApplicationItem
                  label="Interviews"
                  icon={CalendarCheck}
                  path={`${admissionBasePath}/interviews`}
                />

                <ApplicationItem
                  label="Offer Letters"
                  icon={FileCheck}
                  path={`${admissionBasePath}/offers`}
                />

                {!isPureParentPortal && (
                  <>
                    <ApplicationItem
                      label="Enrolled Student"
                      icon={UserCheck}
                      path={`${admissionBasePath}/enrolled`}
                    />

                    <ApplicationItem
                      label="Seat Allocation"
                      icon={LayoutGrid}
                      path={`${admissionBasePath}/seat-allocation`}
                    />

                    <ApplicationItem
                      label="Reports"
                      icon={LayoutGrid}
                      path={`${admissionBasePath}/reports`}
                    />
                  </>
                )}

              </div>
            )}
          </>
        )}

        {canAccess(["admin", "teacher", "parent"]) && !isPureParentPortal && (
          <>
            {/* ================= PEOPLE ================= */}
            <SectionHeader
              icon={Users}
              label="People"
              collapsed={collapsed}
             open={activeSection === "people"}
onClick={() =>
  setActiveSection(activeSection === "people" ? null : "people")
}
            />
            
            {!collapsed && activeSection === "people" && (
              
              <div className="ml-6 mt-2 space-y-1">
                {/* ================= STUDENTS ================= */}
                
                <button
  onClick={() =>
    navigate(`${basePath}/people/student-dashboard`)
  }
  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
  ${
    isActive(`${basePath}/people/student-dashboard`)
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-50 text-gray-700"
  }`}
>
<span
  className={`w-8 h-8 rounded-lg flex items-center justify-center
  ${
    isActive(`${basePath}/people/student-dashboard`)
      ? "bg-white/20"
      : "bg-gray-100"
  }`}
>
 <LayoutDashboard
    className={`w-4 h-4 ${
      isActive(`${basePath}/people/student-dashboard`)
        ? "text-white"
        : "text-gray-700"
    }`}
  />
</span>

  <span className="text-sm font-medium">
    Student Dashboard
  </span>
</button>
                {!isParent && (
                  <>
                     <button
                      onClick={() => navigate(`${basePath}/people/students`)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg
    ${isActive(`${basePath}/people/students`)
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-50 text-gray-700"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center
        ${isActive(`${basePath}/people/students`)
                              ? "bg-white/20"
                              : "bg-gray-100"
                            }`}
                        >
                          <GraduationCap className="w-4 h-4" />
                        </span>

                        <span className="text-sm font-medium">Students</span>
                          {/* 🔒 LOCK ICON */}
  {/* <Lock className="w-4 h-4 text-gray-400" /> */}
                      </div>
                    </button> 


                    {openStudents && (
      <div className="ml-11 space-y-1">
        <ChildItem
          label="All Students"
          active={activeItem === "all-students"}
          onClick={() => setActiveItem("all-students")}
        />
        <ChildItem
          label="Student Promotion"
          active={activeItem === "student-promotion"}
          onClick={() => setActiveItem("student-promotion")}
        />
      </div>
    )}

                    {/* ================= PARENTS ================= */}
                    <button
  onClick={() =>
    navigate(`${basePath}/people/parent-dashboard`)
  }
  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
  ${
    isActive(`${basePath}/people/parent-dashboard`)
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-50 text-gray-700"
  }`}
>
  <span
    className={`w-8 h-8 rounded-lg flex items-center justify-center
    ${
      isActive(`${basePath}/people/parent-dashboard`)
        ? "bg-white/20"
        : "bg-gray-100"
    }`}
  >
    <LayoutDashboard
      className={`w-4 h-4 ${
        isActive(`${basePath}/people/parent-dashboard`)
          ? "text-white"
          : "text-gray-700"
      }`}
    />
  </span>

  <span className="text-sm font-medium">
    Parent Dashboard
  </span>
</button>
                     <button
                      onClick={() => {
                        navigate(`${basePath}/people/parents`);
                        setActiveItem("parents");
                      }}

                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
  ${isActive(`${basePath}/people/parents`)
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-50 text-gray-700"
                        }`}

                    >
                      <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-700" />
                      </span>

                      <span className="text-sm font-medium">Parents</span>
                        {/* 🔒 LOCK ICON */}
  {/* <Lock className="w-4 h-4 text-gray-400" /> */}
                    </button> 
                  </>
                )}
                {/* ================= GUARDIANS ================= */}
                <button
                  onClick={() => {
                    navigate(`${basePath}/people/guardians`);
                    setActiveItem("guardians");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
    ${isActive(`${basePath}/people/guardians`)
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-50 text-gray-700"
                    }`}
                >

                  <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-gray-700" />
                  </span>

                  <span className="text-sm font-medium">Guardians</span>
                    {/* 🔒 LOCK ICON */}
  {/* <Lock className="w-4 h-4 text-gray-400" /> */}
                </button> 
<button
  onClick={() =>
    navigate(`${basePath}/people/teacher-dashboard`)
  }
  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
  ${
    isActive(`${basePath}/people/teacher-dashboard`)
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-50 text-gray-700"
  }`}
>
  <span
    className={`w-8 h-8 rounded-lg flex items-center justify-center
    ${
      isActive(`${basePath}/people/teacher-dashboard`)
        ? "bg-white/20"
        : "bg-gray-100"
    }`}
  >
    <LayoutDashboard
      className={`w-4 h-4 ${
        isActive(`${basePath}/people/teacher-dashboard`)
          ? "text-white"
          : "text-gray-700"
      }`}
    />
  </span>

  <span className="text-sm font-medium">
    Teacher Dashboard
  </span>
</button>
                {/* ================= TEACHERS ================= */}
                
                <button
                  onClick={() => {
                    navigate(`${basePath}/people/teachers`);
                    setActiveItem("teachers");
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg
    ${isActive(`${basePath}/people/teachers`)
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-50 text-gray-700"
                    }`}
                >

                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-gray-700" />
                    </span>

                    <span className="text-sm font-medium ">
                      Teachers
                    </span>
                    
                  </div>

                  {/* <ChevronDown
                    className={`w-4 h-4 transition-transform ${openTeachers ? "rotate-180" : ""
                      }`}
                  /> */}
                </button>

                {/*{openTeachers && (
      <div className="ml-11 space-y-1">
        <ChildItem
          label="All Teachers"
          active={activeItem === "all-teachers"}
          onClick={() => setActiveItem("all-teachers")}
        />
        <ChildItem
          label="Routine"
          active={activeItem === "teacher-routine"}
          onClick={() => setActiveItem("teacher-routine")}
        />
      </div>
    )}  */}
              </div>
            )}
          </>
        )}
        {canAccess(["admin", "teacher", "student", "parent"]) && !isPureParentPortal && (
          <>
            {/* ================= ACADEMIC ================= */}

            <SectionHeader
              icon={GraduationCap}
              label="Academic"
              collapsed={collapsed}
              open={activeSection === "academic"}
onClick={() =>
  setActiveSection(activeSection === "academic" ? null : "academic")
}

            />
            {!collapsed && activeSection === "academic" && (
              <div className="ml-4 mt-2 space-y-1">
                {/* ================= CLASSES (HAS CHILD) ================= */}
                {!isParent && (
                  <button
                    onClick={() => navigate(`${basePath}/academic/classes`)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
    ${location.pathname === `${basePath}/academic/classes`

                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-50 text-gray-700"
                      }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center
      ${location.pathname === `${basePath}/academic/classes`
                          ? "bg-white/20"
                          : "bg-gray-100"
                        }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-medium">Classes</span>
                  </button>
                )}

                {/*{openClasses && (
      <div className="ml-11 space-y-1">
        <ChildItem label="All Classes" />
        <ChildItem label="Schedule" />
      </div>
    )}*/}

                {/* ================= SINGLE MENUS ================= */}
                <AcademicItem
                  label="Class Room"
                  icon={DoorOpen}
                  path={`${basePath}/academic/class-room`}
                />
                 {/* {!isAdmissionAdmin && (
                  <AcademicItem
                    label="Class Routine"
                    icon={CalendarDays}
                    path={`${basePath}/academic/class-routine`}
                    locked
                  />
                )}  */}
                 {!isAdmissionAdmin && (
                  <AcademicItem
                    label="Subject"
                    icon={BookOpen}
                    path={`${basePath}/academic/subject`}
                    locked
                  />
                )} 
                {!isAdmissionAdmin && (
                  <AcademicItem
                    label="Syllabus"
                    icon={FileText}
                    path={`${basePath}/academic/syllabus`}
                    locked
                  />
                )} 
                {!isAdmissionAdmin && (
                  <AcademicItem
                    label="Time Table"
                    icon={Table}
                    path={`${basePath}/academic/time-table`}
                    locked
                  />
                )} 
                {/* ================= EXAMINATIONS (HAS CHILD) ================= */}
                {/* {!isParent && !isAdmissionAdmin && ( */}
                <>
                   <button
                      onClick={() => setOpenExams(!openExams)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FileCheck className="w-4 h-4" />
                        </span>
                        <div className="flex items-center justify-between w-full">
  <span className="text-sm font-medium">Examinations</span>
  {/* <Lock className="w-4 h-4 text-gray-400" /> */}
</div>

                      </div>

                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${openExams ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {openExams && (
                      <div className="ml-11 space-y-1">

                        <ChildItem
                          label="Exam"
                          active={location.pathname === `${basePath}/academic/examinations/exam`
                          }
                          onClick={() =>
                            navigate(`${basePath}/academic/examinations/exam`)
                          }
                        />

                        <ChildItem
                          label="Exam Schedule"
                          active={location.pathname === "/admin/dashboard/academic/examinations/schedule"}
                          onClick={() =>
                            navigate(`${basePath}/academic/examinations/schedule`)
                          }
                        />

                        <ChildItem
                          label="Grade"
                          active={location.pathname === "/admin/dashboard/academic/examinations/grade"}
                          onClick={() =>
                            navigate(`${basePath}/academic/examinations/grade`)
                          }
                        />

                      </div>
                    )}
                    {isParent && (
                      <MenuItem
                        icon={CalendarCheck}
                        label="Attendance"
                        onClick={() => navigate(`${basePath}/attendance`)}
                        active={location.pathname.startsWith(`${basePath}/attendance`)}
                      />
                    )} 


                  {/* ================= SINGLE MENU ================= */}
                  {!isAdmissionAdmin && (
                     <MainItem
  label="Reasons"
  icon={HelpCircle}
  locked
  active={location.pathname.startsWith(`${basePath}/academic/reasons`)}
  onClick={() => navigate(`${basePath}/academic/reasons`)}
/>

                    )} 


                </>
                {/* )} */}
              </div>
            )}
          </>
        )}

        {canAccess(["admin", "student", "teacher"]) &&
          !isPureParentPortal &&
          !isAdmissionAdmin && (
            <>
             <SectionHeader
  icon={Briefcase}
  label="Management"
  locked 
                collapsed={collapsed}
                open={activeSection === "management"}
onClick={() =>
  setActiveSection(activeSection === "management" ? null : "management")
}

              />
              {!collapsed && activeSection === "management" && (
                <div className="ml-4 mt-2 space-y-1">
                  {role === "admin" && (
                    <button
  onClick={() =>
    navigate("/admin/dashboard/management/fees-collection")
  }
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
    ${isManagementItemActive("/admin/dashboard/management/fees-collection")
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-50"
    }`}
>
  <span
    className={`w-9 h-9 rounded-xl flex items-center justify-center
      ${isManagementItemActive("/admin/dashboard/management/fees-collection")
        ? "bg-blue-500"
        : "bg-gray-100"
      }`}
  >
    <Wallet
      className={`w-4 h-4 ${
        isManagementItemActive("/admin/dashboard/management/fees-collection")
          ? "text-white"
          : "text-gray-600"
      }`}
    />
  </span>

  <span className="font-medium">Fees Collection</span>
</button>
                  )}

                  

                 <button
  onClick={() => navigate(`${basePath}/management/library`)}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
    ${isManagementItemActive(`${basePath}/management/library`)
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-50"
    }`}
>
  <span
    className={`w-9 h-9 rounded-xl flex items-center justify-center
      ${isManagementItemActive(`${basePath}/management/library`)
        ? "bg-blue-500"
        : "bg-gray-100"
      }`}
  >
    <Book
      className={`w-4 h-4 ${
        isManagementItemActive(`${basePath}/management/library`)
          ? "text-white"
          : "text-gray-600"
      }`}
    />
  </span>

  <span className="font-medium">Library Members</span>
</button>


<button
  onClick={() => navigate(`${basePath}/management/sports`)}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
    ${isManagementItemActive(`${basePath}/management/sports`)
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-50"
    }`}
>
  <span
    className={`w-9 h-9 rounded-xl flex items-center justify-center
      ${isManagementItemActive(`${basePath}/management/sports`)
        ? "bg-blue-500"
        : "bg-gray-100"
      }`}
  >
    <Activity
      className={`w-4 h-4 ${
        isManagementItemActive(`${basePath}/management/sports`)
          ? "text-white"
          : "text-gray-600"
      }`}
    />
  </span>

  <span className="font-medium">Sports</span>
</button>
<button
  onClick={() => navigate(`${basePath}/management/hostel`)}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
    ${isManagementItemActive(`${basePath}/management/hostel`)
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-50"
    }`}
>
  <span
    className={`w-9 h-9 rounded-xl flex items-center justify-center
      ${isManagementItemActive(`${basePath}/management/hostel`)
        ? "bg-blue-500"
        : "bg-gray-100"
      }`}
  >
    <Building
      className={`w-4 h-4 ${
        isManagementItemActive(`${basePath}/management/hostel`)
          ? "text-white"
          : "text-gray-600"
      }`}
    />
  </span>

  <span className="font-medium">Hostel</span>
</button>
<button
  onClick={() => navigate(`${basePath}/management/transport`)}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
    ${isManagementItemActive(`${basePath}/management/transport`)
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-50"
    }`}
>
  <span
    className={`w-9 h-9 rounded-xl flex items-center justify-center
      ${isManagementItemActive(`${basePath}/management/transport`)
        ? "bg-blue-500"
        : "bg-gray-100"
      }`}
  >
    <Bus
      className={`w-4 h-4 ${
        isManagementItemActive(`${basePath}/management/transport`)
          ? "text-white"
          : "text-gray-600"
      }`}
    />
  </span>

  <span className="font-medium">Transport</span>
</button>


                </div>
              )}
            </>
          )} 
                            {/* ================= HRM ================= */}
                            {/* ================= HR ================= */}
<SectionHeader
  icon={User}
  label="HR"
  collapsed={collapsed}
  open={activeSection === "hr"}
  onClick={() =>
    setActiveSection(activeSection === "hr" ? null : "hr")
  }
/>

{!collapsed && activeSection === "hr" && (
  <div className="ml-4 mt-2 space-y-1">

    <MenuItem
      icon={UserCheck}
      label="Candidates"
      onClick={() => navigate("/admin/dashboard/hr/candidates")}
      active={location.pathname.startsWith("/admin/dashboard/hr/candidates")}
      collapsed={collapsed}
    />
    <MenuItem
  icon={Users}
  label="Teachers"
  onClick={() => navigate("/admin/dashboard/hr/teachers")}
  active={location.pathname.startsWith("/admin/dashboard/hr/teachers")}
  collapsed={collapsed}
/>
<MenuItem
  icon={Wallet}
  label="Salary"
  onClick={() => navigate("/admin/dashboard/hr/salary")}
  active={location.pathname.startsWith("/admin/dashboard/hr/salary")}
  collapsed={collapsed}
/>

  </div>
)}

         {canAccess(["admin", "Super Admin", "student", "teacher", "parent"]) &&
          !isPureParentPortal &&
          !isAdmissionAdmin && (
            <>
              <SectionHeader
                icon={UserCog}
                label="HRM"
                 locked
                collapsed={collapsed}
                open={activeSection === "hrm"}
onClick={() =>
  setActiveSection(activeSection === "hrm" ? null : "hrm")
}

              />
              {!collapsed && activeSection === "hrm" && (
                <div className="ml-4 mt-2 space-y-1">


                  {role === "admin" || role === "Super Admin" && (
                    <HRMItem
                      icon={Layers}
                      label="Departments"
                      path="/admin/dashboard/hrm/departments"
                    />
                  )}
                  {role === "admin" || role === "Super Admin" && (
                    <HRMItem
                      icon={UserCog}
                      label="Designation"
                      path="/admin/dashboard/hrm/designation"
                    />
                  )}



                  {(role === "admin" || role === "Super Admin" || role === "teacher") && (
                    <>
                      <button
  onClick={() => setOpenAttendance(!openAttendance)}
  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
>
  <div className="flex items-center gap-3">
    <span className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
      <CalendarCheck className="w-4 h-4 text-gray-600" />
    </span>

    <span className="font-medium">Attendance</span>
  </div>

  <ChevronDown
    className={`w-4 h-4 transition-transform ${
      openAttendance ? "rotate-180" : ""
    }`}
  />
</button>

                      {openAttendance && (
                        <div className="ml-11 space-y-1">

                          <ChildItem
                            label="Student Attendance"
                            onClick={() =>
                              navigate(
                                role === "admin" || role === "Super Admin"
                                  ? "/admin/dashboard/hrm/attendance/student"
                                  : "/teacher/dashboard/hrm/attendance/student"
                              )
                            }
                          />

                          <ChildItem
                            label="Teacher Attendance"
                            onClick={() =>
                              navigate(
                                role === "admin" || role === "Super Admin"
                                  ? "/admin/dashboard/hrm/attendance/teacher"
                                  : "/teacher/dashboard/hrm/attendance/teacher"
                              )
                            }
                          />
                          {role === "admin" || role === "Super Admin" && (
                            <ChildItem
                              label="Staff Attendance"
                              onClick={() =>
                                navigate("/admin/dashboard/hrm/attendance/staff")
                              }
                            />
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {role === "admin" && (
                    <>
                      <button
  onClick={() => setOpenLeaves(!openLeaves)}
  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
>
  <div className="flex items-center gap-3">
    <span className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
      <CalendarDays className="w-4 h-4 text-gray-600" />
    </span>

    <span className="font-medium">Leaves</span>
  </div>

  <ChevronDown
    className={`w-4 h-4 transition-transform ${
      openLeaves ? "rotate-180" : ""
    }`}
  />
</button>

                      {openLeaves && (
                        <div className="ml-11 space-y-1">
                          <ChildItem
                            label="List of Leaves"
                            active={location.pathname === "/admin/dashboard/hrm/leaves/list"}
                            onClick={() =>
                              navigate("/admin/dashboard/hrm/leaves/list")
                            }
                          />

                          <ChildItem
                            label="Approve Request"
                            active={location.pathname === "/admin/dashboard/hrm/leaves/approve"}
                            onClick={() =>
                              navigate("/admin/dashboard/hrm/leaves/approve")
                            }
                          />

                        </div>
                      )}
                    </>
                  )}
                  {(role === "admin" || role === "teacher" || role === "student" || role === "parent") && (
                    <HRMItem
                      icon={Briefcase}
                      label="Holidays"
                      path={`${basePath}/hrm/holidays`}
                    />
                  )}

                  {(role === "admin" || role === "parent") && (
                    <HRMItem
                      icon={Wallet}
                      label="Payroll"
                      path={
                        role === "admin"
                          ? "/admin/dashboard/hrm/payroll"
                          : "/parent/dashboard/hrm/payroll"
                      }
                    />
                  )}

                </div>
              )}
            </>
          )} 
          {/* ================= HOSTEL MANAGEMENT ================= */}

{canAccess([
  "admin",
  "teacher",
  "receptionist",
  "Super Admin",
  
]) && (
  <>
    <SectionHeader
      icon={Building}
      label="Hostel Management"
      collapsed={collapsed}
      open={activeSection === "hostelmanagement"}
      onClick={() =>
        setActiveSection(
          activeSection === "hostelmanagement"
            ? null
            : "hostelmanagement"
        )
      }
    />

    {!collapsed &&
      activeSection === "hostelmanagement" && (
        <div className="ml-4 mt-2 space-y-1">

          <HRMItem
            icon={Building}
            label="Hostel Setup"
            path="/admin/dashboard/hostel-management/setup"
          />

          <HRMItem
            icon={DoorOpen}
            label="Room Management"
            path="/admin/dashboard/hostel-management/room-management"
          />

          <HRMItem
            icon={Users}
            label="Student Hostel Allocation"
            path="/admin/dashboard/hostel-management/student-allocation"
          />

          <HRMItem
            icon={Wallet}
            label="Hostel Fee Management"
            path="/admin/dashboard/hostel-management/fee-management"
          />

          <HRMItem
            icon={CalendarCheck}
            label="Attendance & Entry Tracking"
            path="/admin/dashboard/hostel-management/attendance-entry"
          />

          <HRMItem
            icon={ClipboardCheck}
            label="Complaints & Maintenance"
            path="/admin/dashboard/hostel-management/complaints-maintenance"
          />

          <HRMItem
            icon={FileBarChart2}
            label="Hostel Reports"
            path="/admin/dashboard/hostel-management/reports"
          />

        </div>
      )}
  </>
)}
        {canAccess(["admin", "teacher", "parent", "student"]) &&
          !isPureParentPortal &&
          !isAdmissionAdmin && (
            <>
              {/* ================= REPORTS ================= */}
               <SectionHeader
                icon={FileBarChart2}
                label="Reports"
                  locked
                collapsed={collapsed}
                open={activeSection === "reports"}
onClick={() =>
  setActiveSection(activeSection === "reports" ? null : "reports")
}
              /> 
              {!collapsed && activeSection === "reports" && (
                <div className="ml-4 mt-2 space-y-1">

                   <ReportItem
                    icon={ClipboardCheck}
                    label="Attendance Report"
                    path={`${basePath}/reports/attendance`}
                  /> 
                  {role === "admin" && (
                    <ReportItem
                      icon={Wallet}
                      label="Fee Collection"
                      path={`${basePath}/reports/fees`}
                    />
                  )} 

                  <ReportItem
                    icon={FileText}
                    label="Exam Results"
                    path={`${basePath}/reports/exam-results`}
                  /> 
                   {role === "admin" && (
                    <ReportItem
                      icon={FileBarChart2}
                      label="Custom Reports"
                      path={`${basePath}/reports/custom`}
                    />
                  )} 

                  {/* <ReportItem
      icon={GraduationCap}
      label="Class Report"
      path="/admin/dashboard/reports/class"
    />

    <ReportItem
      icon={Users}
      label="Student Report"
      path="/admin/dashboard/reports/student"
    />

    <ReportItem
      icon={FileBarChart2}
      label="Grade Report"
      path="/admin/dashboard/reports/grade"
    />

    <ReportItem
      icon={CalendarOff}
      label="Leave Report"
      path="/admin/dashboard/reports/leave"
    />

    <ReportItem
      icon={Wallet}
      label="Fees Report"
      path="/admin/dashboard/reports/fees"
    /> */}

                </div>
              )}
            </>
          )}
        {/* ================= OTHER MENUS ================= */}
        {role === "admin" && (
          <div className="pt-3 space-y-1">
            {/*<MenuItem icon={Building2} label="Classes" />
    <MenuItem icon={BookOpen} label="Subjects" />
    <MenuItem icon={Calendar} label="Class Routine" />
    <MenuItem icon={FileText} label="Attendance" />
    <MenuItem icon={DollarSign} label="Fees Collection" />
    <MenuItem icon={MessageSquare} label="Notice Board" />*/}
            <button
              onClick={() => navigate("/admin/dashboard/settings")}
              className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"
                } px-4 py-3 rounded-lg transition
      ${location.pathname === "/admin/dashboard/settings"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              title={collapsed ? "Settings" : undefined}
            >
              <Settings className="w-5 h-5" />

              {!collapsed && (
                <span className="text-sm font-medium">Settings</span>
              )}
            </button>

          </div>
        )}
        {/* ================= LOGOUT ================= */}
        <div className="pt-4 mt-4 border-t">
          <button
            onClick={logout}
            className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"
              } px-4 py-3 rounded-lg
      text-red-600 hover:bg-red-50 transition`}
            title={collapsed ? "Logout" : undefined}
          >
            <DoorOpen className="w-5 h-5" />

            {!collapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>

      </nav>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function SubItem({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`block text-sm w-full text-left px-2 py-1 rounded
        ${active
          ? "text-blue-600 font-medium"
          : "text-gray-600 hover:text-blue-600"
        }`}
    >
      {label}
    </button>
  );
}


function LayoutItem({ icon, label }: { icon: JSX.Element; label: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600">
      <span className="w-4 h-4">{icon}</span>
      {label}
    </div>
  );
}
function AcademicItem({
  label,
  icon: Icon,
  path,
  locked,
}: {
  label: string;
  icon: any;
  path: string;
  locked?: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  //const active = location.pathname === path;
  const active = location.pathname.startsWith(path);

  return (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
        ${active
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-50"
        }`}
    >
      <span
        className={`w-9 h-9 rounded-xl flex items-center justify-center
          ${active
            ? "bg-blue-500"
            : "bg-gray-100"
          }`}
      >
        <Icon
          className={`w-4 h-4 ${active ? "text-white" : "text-gray-600"
            }`}
        />
      </span>

     <div className="flex items-center justify-between w-full">

  <span className="font-medium">{label}</span>

  {/* {locked && (
    <Lock className="w-4 h-4 text-gray-400" />
  )} */}

</div>

    </button>
  );
}


function MenuItem({
  icon: Icon,
  label,
  onClick,
  active,
  collapsed,
}: {
  icon: any;
  label: string;
  onClick?: () => void;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-lg transition
    ${active
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-50"
        }`}
    >

<Icon className="w-[18px] h-[18px]" />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
function MainItem({
  label,
  icon: Icon,
  active,
  onClick,
  locked,
}: {
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
  locked?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
        ${active
          ? "bg-blue-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-50"
        }`}
    >
      <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </span>
<div className="flex items-center justify-between w-full">
  <span>{label}</span>
  {/* {locked && <Lock className="w-4 h-4 text-gray-400" />} */}
</div>
    </button>
  );
}
function ChildItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg ${active
        ? "bg-blue-600 text-white"
        : "text-gray-500 hover:text-blue-600"
        }`}
    >
      {label}
    </button>
  );
}
function IconBox({
  Icon,
  active,
}: {
  Icon: any;
  active?: boolean;
}) {
  return (
    <span
      className={`w-8 h-8 rounded-lg flex items-center justify-center
        ${active ? "bg-blue-500" : "bg-gray-100"}`}
    >
      <Icon
        className={`w-4 h-4
          ${active ? "text-white" : "text-gray-500"}`}
      />
    </span>
  );
}

function HRMItem({
  icon: Icon,
  label,
  path,
}: {
  icon: any;
  label: string;
  path: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.startsWith(path);

  return (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
        ${active
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-50"
        }`}
    >
      <span
        className={`w-9 h-9 rounded-xl flex items-center justify-center
          ${active ? "bg-blue-500" : "bg-gray-100"}`}
      >
        <Icon
          className={`w-4 h-4 ${
            active ? "text-white" : "text-gray-600"
          }`}
        />
      </span>

      <span className="font-medium">{label}</span>
    </button>
  );
}
function ReportItem({
  icon: Icon,
  label,
  path,
}: {
  icon: any;
  label: string;
  path: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.startsWith(path);

  return (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
        ${active
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-50"
        }`}
    >
      <span
        className={`w-9 h-9 rounded-xl flex items-center justify-center
          ${active ? "bg-blue-500" : "bg-gray-100"}`}
      >
        <Icon
          className={`w-4 h-4 ${
            active ? "text-white" : "text-gray-600"
          }`}
        />
      </span>

      <span className="font-medium">{label}</span>
    </button>
  );
}
 function ApplicationItem({
  label,
  icon: Icon,
  path,
}: {
  label: string;
  icon: any;
  path: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
 const active =
  path === "/admin/dashboard/receptionist"
    ? location.pathname === path
    : location.pathname.startsWith(path);
  return (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition
        ${active
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-50"
        }`}
    >
      {/* ICON BOX */}
      <span
        className={`w-9 h-9 rounded-lg flex items-center justify-center
          ${active
            ? "bg-blue-500"
            : "bg-gray-100"
          }`}
      >
        <Icon
          className={`w-4 h-4 ${active ? "text-white" : "text-gray-600"
            }`}
        />
      </span>

      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
function SectionHeader({
  icon: Icon,
  label,
  collapsed,
  onClick,
  open,
  locked,
}: {
  icon: any;
  label: string;
  collapsed: boolean;
  onClick?: () => void;
  open?: boolean;
  locked?: boolean;   
}) {
  return (
    <button
      onClick={() => {
        if (!collapsed && onClick) {
          onClick();
        }
      }}
      className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100"
    >

      <div
        className={`flex items-center ${collapsed ? "justify-center" : "gap-3"
          }`}
      >
        <div title={collapsed ? label : undefined}>
          <Icon className="w-[18px] h-[18px] text-gray-600" />
        </div>

        {!collapsed && (
          <span className="text-sm font-semibold text-gray-700">
            {label}
          </span>
        )}
      </div>

     {!collapsed && (
  <div className="flex items-center gap-2">

    {/* {locked && (
      <Lock className="w-4 h-4 text-gray-400" />
    )} */}

    {open !== undefined && (
      <ChevronDown
        className={`w-4 h-4 transition-transform ${
          open ? "rotate-180" : ""
        }`}
      />
    )}

  </div>
)}

    </button>
  );
}

