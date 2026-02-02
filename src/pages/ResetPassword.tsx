import LeftIllustration from "../assets/reset-left.png"; // your left image
import Logo from "../assets/logo.png";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen flex">

      {/* 🔵 LEFT IMAGE SECTION (DESKTOP ONLY) */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center relative overflow-hidden">
        <img
          src={LeftIllustration}
          alt="Reset Password"
          className="w-[520px]"
        />

        {/* Bottom wave */}
        <div className="absolute bottom-0 w-full h-24 bg-blue-600 rounded-t-[100%]" />
      </div>

      {/* 🟢 RIGHT FORM SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">

          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="Preskool" className="h-8" />
          </div>

          <h2 className="text-xl font-semibold text-center">
            Reset Password?
          </h2>

          <p className="text-sm text-gray-500 text-center mt-1 mb-6">
            Enter New Password & Confirm Password to get inside
          </p>

          {/* OLD PASSWORD */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600">
              Old Password
            </label>
            <input
              type="password"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* NEW PASSWORD */}
          <div className="mb-4 relative">
            <label className="text-xs font-medium text-gray-600">
              New Password
            </label>
            <input
              type={show ? "text" : "password"}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-8 text-gray-400"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-6">
            <label className="text-xs font-medium text-gray-600">
              New Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* BUTTON */}
          <button
  onClick={() => navigate("/reset-success")}
  className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
>
  Change Password
</button>


          {/* BACK TO LOGIN */}
          <button
            onClick={() => navigate("/login")}
            className="w-full text-xs text-gray-500 mt-4"
          >
            Return to Login
          </button>

          <p className="text-[10px] text-center text-gray-400 mt-8">
            Copyright © 2024 Preskool
          </p>
        </div>
      </div>
    </div>
  );
}
