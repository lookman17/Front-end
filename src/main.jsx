import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Beranda from "./pages/Beranda.jsx";
import { Layout } from "./components/Layout.jsx";
import { Register } from "./pages/Register.jsx";
import Settings from "./pages/Setting.jsx";
import { Login } from "./pages/Login.jsx";
import Event from "./pages/Admin/Event.jsx";
import Gallery from "./pages/Gallery.jsx";
import CreateEvent from "./pages/Admin/Create_Event.jsx";
import ContentList from "./pages/Admin/Gallery.jsx";
import UpdateGallery from "./pages/Admin/Update_Gallery";
import CreateGallery from "./pages/Admin/Create_Gallery.jsx";
import Dashboard from "./pages/Admin/Beranda.jsx";
import GalleryDetail from "./pages/Detail_Gallery.jsx";
import { LayoutSantri } from "./components/LayoutSantri.jsx";
import UpdateEvent from "./pages/Admin/Update_Event.jsx";
import EventDetail from "./pages/Detail_Event.jsx";
import EventShow from "./pages/EventShow.jsx";
import CreateCategory from "./pages/Admin/Create_Category.jsx";
import UpdateCategory from "./pages/Admin/Update_Category.jsx";
//import PrivateRoute from "./components/PrivateRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/Dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/gallery/admin"
          element={
            <Layout>
              <ContentList />
            </Layout>
          }
        />
        <Route
          path="/detail_gallery/:id"
          element={
            <Layout>
              <GalleryDetail />
            </Layout>
          }
        />
        <Route
          path="/Create/Gallery"
          element={
            <Layout>
              <CreateGallery />
            </Layout>
          }
        />
        <Route
          path="/update_gallery/:id"
          element={
            <Layout>
              <UpdateGallery />
            </Layout>
          }
        />
        <Route
          path="/update_event/:id"
          element={
            <Layout>
              <UpdateEvent />
            </Layout>
          }
        />
        <Route
          path="/event/admin"
          element={
            <Layout>
              <Event />
            </Layout>
          }
        />
        <Route
          path="/setting/admin"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
        <Route
          path="/Create/Event"
          element={
            <Layout>
              <CreateEvent />
            </Layout>
          }
        />
        <Route
          path="/detail_event/:id"
          element={
            <Layout>
              <EventDetail />
            </Layout>
          }
        />
        <Route
          path="/Create/Category"
          element={
            <Layout>
              <CreateCategory />
            </Layout>
          }
        />
        <Route
          path="/update_category/:id"
          element={
            <Layout>
              <UpdateCategory />
            </Layout>
          }
        />

        {/* Santri */}
        <Route
          path="/profil"
          element={
            <LayoutSantri>
              <Beranda />
            </LayoutSantri>
          }
        />
        <Route
          path="/"
          element={
            <LayoutSantri>
              <Beranda />
            </LayoutSantri>
          }
        />
        <Route
          path="/Gallery"
          element={
            <LayoutSantri>
              <Gallery />
            </LayoutSantri>
          }
        />
        <Route
          path="/setting"
          element={
            <LayoutSantri>
              <Settings />
            </LayoutSantri>
          }
        />
        <Route
          path="/detail/gallery/:id"
          element={
            <LayoutSantri>
              <GalleryDetail />
            </LayoutSantri>
          }
        />
        <Route
          path="/detail/acara/:id"
          element={
            <LayoutSantri>
              <EventDetail />
            </LayoutSantri>
          }
        />
        <Route
          path="/acara"
          element={
            <LayoutSantri>
              <EventShow />
            </LayoutSantri>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
