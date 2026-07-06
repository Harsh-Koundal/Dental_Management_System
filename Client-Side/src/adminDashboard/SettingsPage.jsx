import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  RotateCcw,
  Save,
  User,
  ShieldCheck,
  Mail,
  CalendarDays,
} from "lucide-react";
import axios from "axios";

const TABS = [
  { id: "Profile", icon: User },
  { id: "Security", icon: ShieldCheck },
];

const Toast = ({ message, type, visible }) => (
  <div
    className={`fixed bottom-7 right-7 z-[9999] pointer-events-none transition-all duration-300 ${
      visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
    }`}
  >
    <div
      className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lg ${
        type === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-rose-200 bg-rose-50 text-rose-700"
      }`}
    >
      {type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      <span>{message}</span>
    </div>
  </div>
);

const Field = ({ label, hint, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</label>
    {children}
    {hint ? <p className="text-xs text-slate-400">{hint}</p> : null}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${className}`}
  />
);

const ActionButton = ({ onClick, loading, label, icon, color = "sky", outline = false }) => {
  const colorMap = {
    sky: {
      solid: "bg-sky-500 text-white hover:bg-sky-600",
      outline: "border-sky-500 text-sky-700 hover:bg-sky-50",
    },
    amber: {
      solid: "bg-amber-500 text-white hover:bg-amber-600",
      outline: "border-amber-500 text-amber-700 hover:bg-amber-50",
    },
  };

  const palette = colorMap[color] || colorMap.sky;

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
        outline ? `border ${palette.outline}` : palette.solid
      }`}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {loading ? "Please wait..." : label}
    </button>
  );
};

const StatCard = ({ label, value, icon, iconClass = "bg-slate-100 text-slate-700" }) => (
  <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className={`grid h-12 w-12 place-items-center rounded-2xl ${iconClass}`}>{icon}</div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold leading-none text-slate-900">{value}</p>
    </div>
  </div>
);

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Profile");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const API = import.meta.env.VITE_BACKEND_BASE_URL;

  const showToast = useCallback((message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((p) => ({ ...p, visible: false })), 3000);
  }, []);
  

  const loadSettings = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/admin/settings`, { withCredentials: true });
      setUser(res?.data?.data?.user || null);
    } catch {
      showToast("Failed to load settings.", "error");
    } finally {
      setLoading(false);
    }
  }, [API, showToast]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const initials = useMemo(() => {
    const base = user?.name?.trim() || "U";
    return base
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [user?.name]);

  const saveProfile = async () => {
    if (!user?.name?.trim()) {
      showToast("Name is required.", "error");
      return;
    }

    setSavingProfile(true);
    try {
      await axios.patch(
        `${API}/admin/settings/profile`,
        { name: user.name.trim() },
        { withCredentials: true }
      );
      showToast("Profile updated successfully.");
    } catch (e) {
      showToast(e?.response?.data?.message || "Failed to update profile.", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("All fields are required.", "error");
      return;
    }

    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    setSavingPassword(true);
    try {
      await axios.patch(
        `${API}/admin/settings/password`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Password changed successfully.");
    } catch (e) {
      showToast(e?.response?.data?.message || "Failed to change password.", "error");
    } finally {
      setSavingPassword(false);
    }
  };

  const resetPassword = async () => {
    if (!window.confirm("A temporary password will be sent to your email. Continue?")) return;

    setResettingPassword(true);
    try {
      const res = await axios.post(`${API}/admin/settings/password/reset`, {}, { withCredentials: true });
      showToast(res?.data?.message || "Password reset email sent.");
    } catch (e) {
      showToast(e?.response?.data?.message || "Failed to reset password.", "error");
    } finally {
      setResettingPassword(false);
    }
  };

  if (loading) {
    return <div className="flex h-72 items-center justify-center text-slate-500">Loading settings...</div>;
  }

  if (!user) {
    return (
      <div className="flex h-72 items-center justify-center text-slate-500">
        Unable to load settings right now.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-sm text-slate-500">Manage your profile and account security</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
          <StatCard
            label="Account Type"
            value="Admin"
            icon={<ShieldCheck size={20} />}
            iconClass="bg-emerald-100 text-emerald-700"
          />
          <StatCard
            label="Account Status"
            value={String(user?.status || "active").replace(/^./, (m) => m.toUpperCase())}
            icon={<CheckCircle size={20} />}
            iconClass="bg-sky-100 text-sky-700"
          />
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold transition ${
                    isActive ? "bg-sky-500 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon size={14} />
                  {tab.id}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "Profile" && (
          <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-base font-bold text-slate-900">Profile Details</h2>
                <p className="mt-1 text-sm text-slate-500">Update your personal information</p>
              </div>

              <div className="space-y-5 px-6 py-5">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-sky-500 text-sm font-extrabold text-white">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.name || "Admin"}</p>
                    <p className="text-xs text-slate-500">Administrator account</p>
                  </div>
                </div>

                <Field label="Full Name">
                  <Input
                    value={user.name || ""}
                    onChange={(e) => setUser((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </Field>

                <Field label="Email Address" hint="Used for login and important account notifications.">
                  <Input value={user.email || ""} disabled />
                </Field>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
                <p className="text-xs text-slate-500">Make sure your details are correct before saving.</p>
                <ActionButton
                  onClick={saveProfile}
                  loading={savingProfile}
                  color="sky"
                  label="Save Changes"
                  icon={<Save size={14} />}
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900">Account Summary</h3>
              <p className="mt-1 text-xs text-slate-500">Basic metadata for your account</p>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-500">Role</span>
                  <span className="text-xs font-semibold text-slate-900">ADMIN</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-500">Email</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700">
                    <Mail size={12} />
                    {user.email || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-500">Status</span>
                  <span className="text-xs font-semibold text-emerald-700">
                    {String(user.status || "active").replace(/^./, (m) => m.toUpperCase())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Security" && (
          <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-base font-bold text-slate-900">Change Password</h2>
                <p className="mt-1 text-sm text-slate-500">Keep your account protected with a strong password</p>
              </div>

              <div className="space-y-5 px-6 py-5">
                <Field label="Current Password">
                  <Input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="New Password">
                    <Input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                      placeholder="Minimum 6 characters"
                    />
                  </Field>

                  <Field label="Confirm New Password">
                    <Input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                      placeholder="Re-enter new password"
                    />
                  </Field>
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-100 px-6 py-4">
                <ActionButton
                  onClick={savePassword}
                  loading={savingPassword}
                  color="sky"
                  label="Change Password"
                  icon={<Save size={14} />}
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900">Forgot Password?</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Send a temporary password to your registered email address and update it after login.
              </p>

              <div className="mt-5">
                <ActionButton
                  onClick={resetPassword}
                  loading={resettingPassword}
                  color="amber"
                  outline
                  label="Reset via Email"
                  icon={<RotateCcw size={14} />}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
};

export default SettingsPage;
