import '@fortawesome/fontawesome-free/css/all.min.css';
import { StrictMode } from 'react';
import { createRoot }  from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';                              // <— new

/* global styles */
import './index.css';

/* public pages */
import App           from './App.jsx';
import Gallery       from './components/Gallery.jsx';
import About         from './components/About.jsx';
import Contact       from './components/Contact.jsx';
import SocialWork    from './components/SocialWork.jsx';
import DramasMovies  from './components/DramasMovies.jsx';
import Portfolio     from './components/Portfolio.jsx';
import Login         from './components/Login.jsx';
import EducationOutreach from './components/EducationOutreach.jsx';
import SocialWorkAdmin from './components/SocialWorkAdmin.jsx';
import ContactAdmin from './components/ContactAdmin';
import AwardsPage from './components/AwardsPage.jsx';
import AwardsPageAdmin from './components/AwardsPageAdmin.jsx'; // ✅ This is your component




/* admin */
import AdminLayout   from './components/AdminLayout.jsx';
import DashboardHome from './components/DashboardHome.jsx';
import AwardsAdmin   from './components/AwardsAdmin.jsx';
import UsersAdmin    from './components/UsersAdmin.jsx';
import EducationAdmin from './components/EducationAdmin.jsx';
import GalleryAdmin from './components/GalleryAdmin';
import VideoAdmin from './components/VideoAdmin';


/* ------------------------------------------------------------------ */
/*  Axios – base URL + token (one place, app-wide)                    */
/* ------------------------------------------------------------------ */
axios.defaults.baseURL = 'http://127.0.0.1:8000';      // Laravel root
axios.defaults.withCredentials = true;                 // Sanctum cookies

const saved = JSON.parse(localStorage.getItem('auth') || '{}');
if (saved.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${saved.token}`;
}

/* helper */
const AuthRoute = ({ children }) =>
  saved.token ? children : <Navigate to="/login" replace />;
/* ------------------------------------------------------------------ */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ----------  public  ---------- */}
        <Route path="/"              element={<App />} />
        <Route path="/gallery"       element={<Gallery />} />
        <Route path="/about"         element={<About />} />
        <Route path="/awards-page"   element={<AwardsPage />} />
        <Route path="/contact"       element={<Contact />} />
        <Route path="/social-work"   element={<SocialWork />} />
        <Route path="/dramas-movies" element={<DramasMovies />} />
        <Route path="/portfolio"     element={<Portfolio />} />
        <Route path="/login"         element={<Login />} />
        <Route path="/education-outreach" element={<EducationOutreach />} />


        {/* ----------  admin (protected)  ---------- */}
        <Route
          path="/admin/*"
          element={
            <AuthRoute>
              <AdminLayout />
            </AuthRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="awards"  element={<AwardsAdmin />} />
          <Route path="users"   element={<UsersAdmin />} />
          <Route path="education" element={<EducationAdmin />} />
          <Route path="social-work" element={<SocialWorkAdmin />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="videos" element={<VideoAdmin />} />
          <Route path="contact-settings" element={<ContactAdmin />} />
          <Route path="awards-page" element={<AwardsPageAdmin />} />


          
        </Route>

        {/* fallback  */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
