import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_BASE_URL || import.meta.env.VITE_API_URL;

const LabelInput = ({ id, label, hint, ...inputProps }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label htmlFor={id} className="text-[11px] font-black text-gray-800 tracking-widest uppercase">
      {label}
    </label>
    <input
      id={id}
      className="h-11 px-4 rounded-xl border border-gray-200 text-sm bg-gray-50/50 text-gray-900 outline-none focus:ring-2 focus:ring-[#1565c0]/5 focus:border-[#1d1d1f] focus:bg-white transition-all duration-300"
      {...inputProps}
    />
    {hint && <p className="text-[10px] text-gray-400 font-medium tracking-tight">{hint}</p>}
  </div>
);

const SubmitButton = ({ loading, label, loadingLabel }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full h-12 bg-[#1d1d1f] text-white rounded-2xl text-[13px] font-black tracking-widest hover:bg-black transition-all duration-500 shadow-xl shadow-black/10 disabled:opacity-50 mt-2"
  >
    {loading ? loadingLabel : label}
  </button>
);

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(data.email, data.password);
    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <LabelInput
        id="email"
        label="Email Address"
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        disabled={loading}
        required
      />
      <LabelInput
        id="password"
        label="Password"
        type="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        disabled={loading}
        required
      />
      <div className="flex justify-end pr-1 text-[10px] text-gray-400 font-bold hover:text-black cursor-pointer uppercase tracking-widest transition" onClick={() => navigate("/forgot-password")}>
        Forgot Password?
      </div>
      <SubmitButton loading={loading} label="Login" loadingLabel="Logging in..." />
    </form>
  );
}

function SignupForm() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${API}/auth/signup`,
        {
          Firstname: data.firstname.trim(),
          Lastname: data.lastname.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
          role: "USER",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Verification email sent!");
      setData({ firstname: "", lastname: "", email: "", password: "", confirmpassword: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <LabelInput
          id="firstname"
          label="First Name"
          value={data.firstname}
          onChange={(e) => setData({ ...data, firstname: e.target.value })}
          disabled={loading}
          required
        />
        <LabelInput
          id="lastname"
          label="Last Name"
          value={data.lastname}
          onChange={(e) => setData({ ...data, lastname: e.target.value })}
          disabled={loading}
          required
        />
      </div>
      <LabelInput
        id="signup-email"
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        disabled={loading}
        required
      />
      <div className="grid grid-cols-2 gap-3">
        <LabelInput
          id="signup-password"
          label="Password"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          disabled={loading}
          required
        />
        <LabelInput
          id="confirmpassword"
          label="Confirm"
          type="password"
          value={data.confirmpassword}
          onChange={(e) => setData({ ...data, confirmpassword: e.target.value })}
          disabled={loading}
          required
        />
      </div>
      <SubmitButton loading={loading} label="Sign Up" loadingLabel="Sending..." />
    </form>
  );
}

export default function AuthPage() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(pathname.includes("signup") ? "signup" : "login");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === "ADMIN") {
      navigate("/admin-dashboard/overview", { replace: true });
    } else if (user?.role === "USER") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const status = searchParams.get("status");
  const errorFromURL = searchParams.get("error");

  useEffect(() => {
    if (pathname.includes("signup")) setTab("signup");
    else if (pathname.includes("login")) setTab("login");
  }, [pathname]);

  useEffect(() => {
    if (status === "verified") setTab("login");
  }, [status]);

  const handleGoogleLogin = () => {
    window.location.href = `${API}/auth/google?role=user`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4 py-8">
      <div className="w-full max-w-[460px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-9 pb-6 relative border border-gray-100">

        <button
          onClick={() => navigate("/")}
          className="absolute left-8 top-8 flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-300 hover:text-black transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          BACK
        </button>

        <div className="text-center mb-6 pt-1 flex flex-col items-center">
          {/* Brand Logo and Title */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-14 overflow-hidden rounded-2xl border border-gray-50 shadow-sm">
              <img
                src="/images/Dental_ORTHODONTIST1-LOGO - Copy.jpg"
                alt="Panda Smile Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-tighter leading-none text-slate-900 uppercase">Panda Smile</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#f37121]">Aligner & Braces</span>
            </div>
          </div>

          {status === "verified" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <p className="text-[11px] text-green-700 font-black uppercase tracking-tight">SUCCESS: user verify successful</p>
            </div>
          )}

          {errorFromURL && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-[11px] text-red-700 font-black uppercase tracking-tight">{errorFromURL.replace(/_/g, " ")}</p>
            </div>
          )}

          <p className="text-xs text-gray-400 font-medium uppercase tracking-[0.15em] text-[10px]">
            {tab === "login" ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        <div className="grid grid-cols-2 bg-gray-100 rounded-2xl p-1.5 mb-8">
          {["login", "signup"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 ${tab === t
                  ? "bg-white text-black shadow-lg shadow-black/5"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {t === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        <div className="transition-all duration-300">
          {tab === "login" ? <LoginForm /> : <SignupForm />}
        </div>

        <div className="mt-5">
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-300 bg-white px-3 tracking-widest">OR</div>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-12 flex items-center justify-center gap-3 border-2 border-gray-50 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
