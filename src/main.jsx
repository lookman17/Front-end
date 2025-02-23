import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Beranda from "./pages/Beranda.jsx";
import { Layout } from "./components/Layout.jsx";
import { Register } from "./pages/Register.jsx";
import  Settings  from "./pages/Setting.jsx";
import { Login } from "./pages/Login.jsx";
import Event from "./pages/Event.jsx";
import Gallery from "./pages/Gallery.jsx";
import CreateEvent from "./pages/Admin/Create_Event.jsx";
import ContentList from "./pages/Admin/Gallery.jsx";
import UpdateGallery from "./pages/Admin/Update_Gallery";
import CreateGallery from "./pages/Admin/Create_Gallery.jsx";
import Dashboard from "./pages/Beranda.jsx";
import GalleryDetail from "./pages/Detail_Gallery.jsx";
//import PrivateRoute from "./components/PrivateRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/Gallery"
          element={
            <Layout>
              <Gallery />
            </Layout>
          }
        />
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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
