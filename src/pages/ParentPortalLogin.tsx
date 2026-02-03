import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

// Assets
import LoginWave from "../assets/png.png";
import PreLogo from "../assets/pre2.png";
// Using the same illustration for visual consistency, or we could use another one if available
import LeftIllustration from "../assets/login-left.png";

export default function ParentPortalLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network delay for better UX feel
    await new Promise(resolve => setTimeout(resolve, 800));

    // ✅ PARENT PORTAL AUTH LOGIC
    if (
      email === "parentportal@preskool.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("role", "parent");
      localStorage.setItem("portal", "true");
      localStorage.setItem("isAuth", "true");
      // Add a dummy user object so topbar doesn't crash
      localStorage.setItem("user", JSON.stringify({ name: "Demo Parent", role: "parent", email }));

      toast.success("Welcome to Parent Portal! 👋");
      navigate("/parent/dashboard");
      setLoading(false);
      return;
    }

    toast.error("Invalid credentials. Please try again.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">

      {/* LEFT SECTION - ILLUSTRATION */}
      <div className="hidden lg:flex w-[70%] relative overflow-hidden">
        {/* Wave Background */}
        <img
          src={LoginWave}
          alt="Background Pattern"
          className="absolute top-0 right-0 h-full w-full object-fit opacity-80"
        />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-12">
          <div className="mb-8 text-center self-end">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">Parent Portal</h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Monitor your child's progress, pay fees, and stay connected with the school.
            </p>
          </div>
          <img
            src={LeftIllustration}
            alt="Parent Portal Illustration"
            className="w-[80%] max-w-[600px] object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* RIGHT SECTION - LOGIN FORM */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-20 bg-white">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="w-full max-w-[400px]">
          {/* LOGO */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <img src={PreLogo} alt="School Logo" className="h-16 w-16 object-contain" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Parents</h2>
              <p className="text-sm text-gray-500 mt-1">Please login to access your dashboard</p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL INPUT */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="parentportal@preskool.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                  required
                />
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* REMEMBER ME & FORGOT PASSWORD */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-11 bg-blue-600 text-white rounded-lg text-sm font-semibold tracking-wide 
                hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md hover:shadow-lg
                ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Sign In to Parent Portal"
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Not a parent? <button onClick={() => navigate("/login")} className="text-blue-600 font-medium hover:underline">Staff Login</button>
            </p>
            <p className="mt-4 text-xs text-gray-400">
              © {new Date().getFullYear()} Preskool. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
