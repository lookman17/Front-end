import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  console.log("User in ProtectedRoute:", user);

  if (!user || user.role !== "admin") {
    console.warn("Unauthorized access - Redirecting to /profil");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
