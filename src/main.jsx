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
import GalleryDetail from "./pages/Detail_Gallery.jsx";
import { LayoutSantri } from "./components/LayoutSantri.jsx";
import UpdateEvent from "./pages/Admin/Update_Event.jsx";
import EventDetail from "./pages/Detail_Event.jsx";
import EventShow from "./pages/EventShow.jsx";
import CreateCategory from "./pages/Admin/Create_Category.jsx";
import UpdateCategory from "./pages/Admin/Update_Category.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { RegisterAdmin } from "./pages/RegisterAdmin.jsx";
import EditProfil from "./pages/Admin/Update_pencapaian.jsx";
import CreateProfil from "./pages/Admin/Create_Pencapaian.jsx";
import ProfilList from "./pages/Admin/Beranda.jsx";
import PencapaianDetail from "./pages/Detail_Pencapaian.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <ProfilList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/update_pencapaian/:id"
          element={
            <PrivateRoute>
              <Layout>
                <EditProfil />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profil/create"
          element={
            <PrivateRoute>
              <Layout>
                <CreateProfil />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/gallery/admin"
          element={
            <PrivateRoute>
              <Layout>
                <ContentList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/detail_gallery/:id"
          element={
            <PrivateRoute>
              <Layout>
                <GalleryDetail />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Create/Gallery"
          element={
            <PrivateRoute>
              <Layout>
                <CreateGallery />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/update_gallery/:id"
          element={
            <PrivateRoute>
              <Layout>
                <UpdateGallery />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/update_event/:id"
          element={
            <PrivateRoute>
              <Layout>
                <UpdateEvent />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/detail_event/:id"
          element={
            <PrivateRoute>
              <Layout>
                <EventDetail />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/event/admin"
          element={
            <PrivateRoute>
              <Layout>
                <Event />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/setting/admin"
          element={
            <PrivateRoute>
              <Layout>
                <Settings />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Create/Event"
          element={
            <PrivateRoute>
              <Layout>
                <CreateEvent />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Create/Category"
          element={
            <PrivateRoute>
              <Layout>
                <CreateCategory />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/update_category/:id"
          element={
            <PrivateRoute>
              <Layout>
                <UpdateCategory />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pencapaian/detail/:id"
          element={
            <Layout>
              <PencapaianDetail />
            </Layout>
          }
        />

        {/* Rute untuk Santri */}
        <Route
          path="/profil"
          element={
            <LayoutSantri>
              <Beranda />
            </LayoutSantri>
          }
        />
        <Route
          path="/profil/profil/pencapaian/detail/:id"
          element={
            <LayoutSantri>
              <PencapaianDetail />
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
        <Route path="/register/admin" element={<RegisterAdmin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
