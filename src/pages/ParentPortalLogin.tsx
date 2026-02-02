import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ParentPortalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ FRONTEND ONLY LOGIN
    if (
      email === "parentportal@preskool.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("role", "parent");
      localStorage.setItem("portal", "true");
      localStorage.setItem("isAuth", "true");

      toast.success("Parent Portal Login Successful ✅");
      navigate("/parent/dashboard/admissions");
      return;
    }

    toast.error("Invalid Parent Portal credentials");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
