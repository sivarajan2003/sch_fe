import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import ForgotImg from "../assets/forgot.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter email address");
      return;
    }

    // Later: API / Firebase reset logic
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT IMAGE (optional) */}
      <div className="hidden lg:flex w-1/2 bg-[#F7FAFF] items-center justify-center">
      <img
  src={ForgotImg}
  alt="Forgot Password Illustration"
  className="w-[420px] object-contain"
/>

      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-[420px] px-6">

          <div className="text-center mb-6">
            <img src={Logo} className="mx-auto h-14 mb-3" />
            <h2 className="text-xl font-semibold">Forgot Password?</h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="w-full h-11 bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
              Send Reset Link
            </button>
          </form>

          <p
            onClick={() => navigate("/login")}
            className="mt-5 text-center text-sm text-blue-600 cursor-pointer"
          >
            Return to Login
          </p>

        </div>
      </div>
    </div>
  );
}
