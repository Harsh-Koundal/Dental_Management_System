import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar, Menu, Phone, X,
  ArrowRight
} from 'lucide-react';
import { NAV_LINKS } from '@/data/constants';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);




  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-xl shadow-slate-200/40 py-3 border-b border-slate-100"
    >
      <div className="w-full px-8 md:px-16 mx-auto">
        <div className="flex items-center justify-between gap-4">

          {/* Logo - Left */}
          <Link to="/" className="inline-flex items-center gap-1 group transition-all shrink-0">
            <div className="h-10 overflow-hidden rounded-xl transition-transform duration-500 group-hover:scale-110">
              <img
                src="/images/Dental_ORTHODONTIST1-LOGO - Copy.jpg"
                alt="Panda Smile Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="block text-xl font-black tracking-tight leading-none mb-0.5 text-slate-900">Panda Smile</span>
              <span className="block text-[12px] font-black uppercase tracking-[0.25em] text-[#f37121]">Aligner & Braces</span>
            </div>
          </Link>


          <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            <div className="flex items-center gap-2 xl:gap-3 border-r border-slate-200/60 pr-5 mr-3">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 xl:px-4 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider flex flex-col items-center ${active
                        ? ' text-[#f37121]  '
                        : 'text-[#1565c0] group'
                      }`}
                  >
                    {link.name}
                    <span className={`block h-[3px] rounded-full bg-[#f37121] transition-all duration-300 ${active ? 'w-0' : 'w-0 group-hover:w-[80%]'
                      }`} />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <div className="flex items-center gap-2 xl:gap-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 text-[#1565c0] hover:text-[#f37121]"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="px-4 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 text-[#1565c0] hover:text-[#f37121]"
                >
                  Login
                </Link>
              )}

              <Link
                to="/appointment"
                className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 border-2 border-[#f37121] text-[#f37121] hover:bg-orange-50"
              >
                Book Appointment
              </Link>
            </div>
          </div>


          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-3 rounded-2xl transition-all bg-slate-900 text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`lg:hidden fixed inset-0 top-[72px] bg-white z-[99] transition-transform duration-500 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 space-y-4">
          {/* Main Links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block p-5 rounded-2xl bg-slate-50 text-slate-900 font-black text-lg tracking-tight hover:bg-[#1565c0] hover:text-white transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                {link.name}
                <ArrowRight size={20} />
              </div>
            </Link>
          ))}

          {/* Actions */}
          <div className="pt-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center py-4 rounded-2xl bg-slate-100 text-slate-900 font-black text-xs uppercase tracking-widest"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center justify-center py-4 rounded-2xl border-2 border-red-500 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center py-4 rounded-2xl bg-slate-100 text-slate-900 font-black text-xs uppercase tracking-widest"
                  >
                    Login
                  </Link>
                  <Link
                    to="/appointment"
                    className="flex items-center justify-center py-4 rounded-2xl border-2 border-[#1565c0]/20 text-[#1565c0] font-black text-xs uppercase tracking-widest"
                  >
                    Book Appointment
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;