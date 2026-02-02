import SuccessIllustration from "../assets/reset-success.png"; // left image
import Logo from "../assets/logo.png";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResetSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">

      {/* 🔵 LEFT IMAGE SECTION (DESKTOP ONLY) */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center relative overflow-hidden">
        <img
          src={SuccessIllustration}
          alt="Success"
          className="w-[480px]"
        />

        {/* Bottom wave */}
        <div className="absolute bottom-0 w-full h-24 bg-blue-600 rounded-t-[100%]" />
      </div>

      {/* 🟢 RIGHT CONTENT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">

          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="Preskool" className="h-8" />
          </div>

          {/* SUCCESS CARD */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">

            {/* CHECK ICON */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="text-green-600" size={22} />
              </div>
            </div>

            <h3 className="text-lg font-semibold">Success</h3>

            <p className="text-sm text-gray-500 mt-1 mb-6">
              Your Password Reset Successfully
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
            >
              Back to Log in
            </button>
          </div>

          {/* FOOTER */}
          <p className="text-[10px] text-gray-400 mt-10">
            Copyright © 2024 - Preskool
          </p>
        </div>
      </div>
    </div>
  );
}
