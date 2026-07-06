import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, Menu, Phone, X, 
  ArrowRight
} from 'lucide-react';
import { NAV_LINKS } from '@/data/constants';

import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useAuth();
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

          {/* Unified Nav & Actions - Right */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {/* Main Navigation */}
            <div className="flex items-center gap-2 xl:gap-3 border-r border-slate-200/60 pr-5 mr-3">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 xl:px-4 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 ${active ? 'bg-[#1565c0] text-white shadow-xl shadow-[#1565c0]/20' : 'text-[#1565c0] hover:bg-[#1565c0]/5 hover:text-[#1565c0]'}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 xl:gap-4">
              {!loading && user ? (
                <>
                  <Link 
                    to="/dashboard"
                    className="flex items-center gap-3 px-5 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 bg-[#1565c0]/5 text-[#1565c0] hover:bg-[#1565c0] hover:text-white group"
                  >
                    {/* <div className="w-8 h-8 rounded-full bg-[#1565c0] text-white flex items-center justify-center text-[10px] group-hover:bg-white group-hover:text-[#1565c0] transition-colors">
                      {user.Firstname?.[0] || 'U'}{user.Lastname?.[0] || ''}
                    </div> */}
                    <span>Dashboard</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="px-4 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 text-[#1565c0] hover:bg-[#1565c0]/5"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                    className="px-4 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 border border-[#1565c0]/30 text-[#1565c0] hover:bg-[#1565c0]/5"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <Link 
                to="/appointment"
                className="px-9 py-3.5 rounded-xl text-white font-black text-sm uppercase tracking-widest bg-[#f37121] shadow-xl shadow-orange-500/30 hover:scale-105 transition-all duration-500"
              >
                Booking
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
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
             {!loading && user ? (
               <Link 
                to="/dashboard"
                className="flex items-center justify-between p-5 rounded-2xl bg-[#1565c0] text-white font-black text-lg tracking-tight shadow-xl shadow-[#1565c0]/20"
               >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm">
                      {user.Firstname?.[0] || 'U'}{user.Lastname?.[0] || ''}
                    </div>
                    <span>Dashboard</span>
                  </div>
                  <ArrowRight size={20} />
               </Link>
             ) : (
               <div className="grid grid-cols-2 gap-3">
                 <Link 
                  to="/login"
                  className="flex items-center justify-center py-4 rounded-2xl bg-slate-100 text-slate-900 font-black text-xs uppercase tracking-widest"
                 >
                    Login
                 </Link>
                 <Link 
                  to="/signup"
                  className="flex items-center justify-center py-4 rounded-2xl border border-[#1565c0]/30 text-[#1565c0] font-black text-xs uppercase tracking-widest"
                 >
                    Sign Up
                 </Link>
               </div>
             )}
             <Link 
              to="/appointment"
              className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-[#f37121] text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/30"
             >
                <Calendar size={20} /> Booking
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;