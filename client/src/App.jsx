import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import DestinationPage from "./pages/DestinationPage/DestinationPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import Layout from "./layout/Layout";
import BlogPage from "./pages/BlogPage/BlogPage";
import SinglePost from "./pages/BlogPage/SinglePost";
import RendezVousPage from "./pages/RendezVousPage/RendezVousPage";
import EtudePage from "./pages/ServicePage/EtudePage";
import TourismePage from "./pages/ServicePage/TourismePage";
import SanitairePage from "./pages/ServicePage/SanitairePage";
import BilleteriePage from "./pages/ServicePage/BilleteriePage";
import HomePages from "./pages/admin/pages/HomePage/HomePage";
import LoginPage from "./pages/admin/pages/LoginPage/LoginPage";
import ProfilPage from "./pages/admin/pages/ProfilPage/ProfilPage";
import AdminLayout from "./layout/AdminLayout";
import PrivateRoute from "./lib/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/nos-destinations" element={<DestinationPage />} />
          <Route path="/nous-contacter" element={<ContactPage />} />
          <Route path="/actualites" element={<BlogPage />} />
          <Route path="/actualites/:slug" element={<SinglePost />} />
          <Route path="/prendre-rendez-vous" element={<RendezVousPage />} />
          <Route
            path="/services/etudier-a-l-etranger"
            element={<EtudePage />}
          />
          <Route
            path="/services/voyages-touristiques"
            element={<TourismePage />}
          />
          <Route
            path="/services/evacuation-sanitaire"
            element={<SanitairePage />}
          />
          <Route path="/services/billeterie" element={<BilleteriePage />} />
        </Route>
        <Route element={<PrivateRoute/>}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard/" element={<HomePages />} />
          <Route path="/admin/mon-profil/" element={<ProfilPage />} />
        </Route>
        </Route>

        <Route path="/admin/auth/connexion/" element={<LoginPage />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
