import { useState } from 'react';
import { Facebook, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SignupImg from '../assets/signup.png';
import Logo from '../assets/logo.png';


export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleFacebookSignup = () => {
    alert("Facebook signup clicked (OAuth not connected yet)");
  };
  
  const handleGoogleSignup = () => {
    alert("Google signup clicked (OAuth not connected yet)");
  };
  
  const handleAppleSignup = () => {
    alert("Apple signup clicked (OAuth not connected yet)");
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!agree) {
      setError('Please agree to Terms & Privacy');
      setLoading(false);
      return;
    }

    // ✅ Save user (frontend only)
    localStorage.setItem(
      'user',
      JSON.stringify({ name, email, password })
    );

    setLoading(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
     {/* LEFT IMAGE SECTION */}
<div className="hidden lg:flex lg:w-1/2 h-screen bg-[#F7FAFF] relative overflow-hidden">

{/* IMAGE */}
<div className="flex items-center justify-center w-full h-full">
  <img
    src={SignupImg}
    alt="Signup Illustration"
    className="w-[520px] xl:w-[620px] 2xl:w-[680px] object-contain"
  />
</div>

{/* WAVE */}
<div className="absolute bottom-0 left-0 w-full">
  <svg viewBox="0 0 1440 320" className="w-full h-[160px]">
    <path
      fill="#4361EE"
      fillOpacity="1"
      d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,176C672,192,768,224,864,229.3C960,235,1056,213,1152,197.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L0,320Z"
    />
  </svg>
</div>

</div>


      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center bg-white">
      <div className="w-full max-w-[420px] px-6">

          {/* LOGO */}
          <div className="text-center mb-6">
          <img
  src={Logo}
  alt="PreSkool Logo"
  className="mx-auto h-15 mb-4"
/>


  <h2 className="text-[26px] font-semibold text-gray-900">
    Register
  </h2>
  <p className="text-sm text-gray-500 mt-1">
    Please enter your details to sign up
  </p>
</div>


{/* TITLE */}

{/* SOCIAL LOGIN */}
<div className="flex gap-3 mb-4">

  {/* Facebook */}
  <button
    onClick={handleFacebookSignup}
    className="flex-1 h-11 rounded-lg bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition"
  >
    <Facebook className="w-5 h-5 text-white" />
  </button>

  {/* Google */}
  <button
    onClick={handleGoogleSignup}
    className="flex-1 h-11 rounded-lg border flex items-center justify-center bg-white hover:bg-gray-50 transition"
  >
    {/* Google SVG */}
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.3 0 6.3 1.1 8.6 3.1l6.4-6.4C34.9 2.4 29.8 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.5 5.8C12 13.4 17.5 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.1 24.5c0-1.7-.1-2.9-.4-4.2H24v8h12.7c-.3 2.1-1.9 5.3-5.5 7.4l8.4 6.5c4.9-4.5 7.5-11.2 7.5-17.7z"/>
      <path fill="#FBBC05" d="M10.1 28.1c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.5-5.8C.9 16.1 0 20 0 23.5c0 3.5.9 7.4 2.6 10.4l7.5-5.8z"/>
      <path fill="#34A853" d="M24 47c5.8 0 10.7-1.9 14.2-5.2l-8.4-6.5c-2.2 1.5-5.1 2.5-5.8 2.5-6.5 0-12-3.9-14-9.6l-7.5 5.8C6.5 41.6 14.6 47 24 47z"/>
    </svg>
  </button>

  {/* Apple */}
  <button
    onClick={handleAppleSignup}
    className="flex-1 h-11 rounded-lg bg-black flex items-center justify-center hover:opacity-90 transition"
  >
    <svg viewBox="0 0 384 512" className="w-5 h-5 fill-white">
      <path d="M318.7 268.6c-.3-42.8 34.9-63.3 36.5-64.3-19.9-29.1-50.8-33.1-61.7-33.6-26.3-2.7-51.3 15.5-64.6 15.5-13.3 0-34-15.1-55.8-14.7-28.7.4-55.1 16.7-69.9 42.4-29.8 51.6-7.6 128 21.4 169.8 14.2 20.4 31.2 43.3 53.5 42.5 21.5-.8 29.6-13.9 55.5-13.9 25.9 0 33.2 13.9 55.8 13.5 23-.4 37.5-20.9 51.6-41.4 16.3-23.8 23-46.9 23.3-48.1-.5-.2-44.6-17.1-44.9-67.7z"/>
    </svg>
  </button>



  {/* OR DIVIDER */}
  <div className="flex items-center gap-3 my-4">
  <div className="flex-1 h-px bg-gray-200" />
  <span className="text-xs text-gray-400">OR</span>
  <div className="flex-1 h-px bg-gray-200" />
</div>

</div>


          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"

            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-11 px-4 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />

<label className="flex items-center gap-2 text-xs text-gray-600 mt-2">
  <input type="checkbox" />
  I agree to <span className="text-blue-600">Terms & Privacy</span>
</label>


            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-4 bg-blue-600 text-white rounded-lg text-sm font-medium"            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-600">
  Already have an account?{' '}
  <span
    onClick={() => navigate('/login')}
    className="text-blue-600 cursor-pointer font-medium"
  >
    Sign In
  </span>
</p>

        </div>
      </div>
    </div>
  );
}
