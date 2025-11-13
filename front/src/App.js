import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SearchPage from "./pages/SearchPage";
import FAQPage from "./pages/FAQPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/:username" element={<ProfilePage />} />
        <Route path="/:username/edit" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
