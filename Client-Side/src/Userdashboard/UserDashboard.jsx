import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Calendar, Shield, LogOut, 
  Settings, Bell, Activity, CreditCard
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 group">
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className="text-white" size={24} />
    </div>
    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
    <p className="text-2xl font-black text-gray-900">{value}</p>
  </div>
);

const UserDashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1565c0]"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mt-8 min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#1565c0] to-[#24b7d2] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-[#1565c0]/30 border-4 border-white">
              {user.Firstname?.[0]}{user.Lastname?.[0]}
            </div>
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Welcome back, <span className="text-[#1565c0]">{user.Firstname}</span>!
            </h1>
            <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
              <Mail size={16} /> {user.email}
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={logout}
              className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={Calendar} label="Next Appointment" value="Oct 24, 2024" color="bg-[#1565c0]" />
          <StatCard icon={Activity} label="Treatment Phase" value="Phase 2 of 4" color="bg-[#f37121]" />
          <StatCard icon={Shield} label="Account Status" value="Verified" color="bg-green-500" />
          <StatCard icon={CreditCard} label="Next Payment" value="₹2,500" color="bg-purple-500" />
        </div>

        {/* content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Recent Activity</h3>
                <button className="text-[10px] font-black text-[#1565c0] uppercase tracking-widest hover:underline">View All</button>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#1565c0]">
                      <Settings size={20} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-black text-gray-900">Treatment Plan Updated</p>
                      <p className="text-xs text-gray-400">Dr. Abinash Panda updated your progress charts.</p>
                    </div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase">2h ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
             <div className="bg-[#1d1d1f] rounded-[2.5rem] p-8 text-white">
                <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all text-left px-6 flex items-center justify-between group">
                    Book Appointment <Calendar size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all text-left px-6 flex items-center justify-between group">
                    Contact Support <Bell size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all text-left px-6 flex items-center justify-between group">
                    Profile Settings <Settings size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
