import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token"); // Fetch token from cookies
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
