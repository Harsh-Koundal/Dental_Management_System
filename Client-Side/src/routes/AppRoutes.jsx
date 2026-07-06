import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LandingPage from '@/components/landingpage/index.jsx';
import About from '@/pages/About/About';
import Treatments from '@/pages/Treatments/Treatments';
import Gallary from '@/pages/Gallary/Gallary';
import FAQ from '@/pages/FAQ/FAQ';
import BookAppointments from '@/pages/BookAppointments/BookAppointments';
import Blogs from '@/pages/Blogs/Blogs';
import Process from '@/pages/Process/Process';
import SignUp from '@/pages/SignUp';

import UserDashboard from '@/Userdashboard/UserDashboard';
import HomeContact from '../components/landingpage/HomeContact';

import UserProtectedRoute from '../protectedRoutes/UserProtectedRoute';
import AdminProtectedRoute from '../protectedRoutes/AdminProtectedRoute';

import AdminDashboard from '../adminDashboard/AdminDashboard';
import DashboardOverview from '../adminDashboard/DashboardOverview';
import TreatmentsPage from '../adminDashboard/TreatmentsPage';
import ManagePatientsPage from '../adminDashboard/ManagePatientsPage';
import BookingManagement from '../adminDashboard/BookingManagement';
import GalleryManagement from "../adminDashboard/GalleryManagement";
import CaseStudiesPage from "../adminDashboard/CaseStudiesPage";
import SettingsPage from "../adminDashboard/SettingsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/gallery" element={<Gallary />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/process" element={<Process />} />
        <Route path="/appointment" element={<BookAppointments />} />
        <Route path="/contact" element={<HomeContact />} />
        <Route path="/blogs" element={<Blogs />} />

        <Route
          path="/dashboard"
          element={
            <UserProtectedRoute>
              <UserDashboard />
            </UserProtectedRoute>
          }
          />

      <Route path="/treatments/:id" element={<Treatments />} />
      </Route>
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        >
          <Route path="/admin-dashboard/overview" element={<DashboardOverview />} />
          <Route path="/admin-dashboard/treatments" element={<TreatmentsPage/>} />
          <Route path="/admin-dashboard/manage-patients" element={<ManagePatientsPage/>} />
          <Route path="/admin-dashboard/booking-management" element={<BookingManagement/>} />
          <Route path="/admin-dashboard/gallery-management" element={<GalleryManagement/>} />
          <Route path="/admin-dashboard/case-studies" element={<CaseStudiesPage/>} />
          <Route path="/admin-dashboard/settings" element={<SettingsPage/>} />
        </Route>



      {/* routes WITHOUT layout */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
