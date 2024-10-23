import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { isTokenValid } from "../../utils/token.util";

interface ProtectedRouteProps {
    children: ReactNode;
  }
  
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const tokenValid = isTokenValid(localStorage.getItem("token"));
  
    if (!tokenValid) {
      return <Navigate to="/login" replace />;
    }
  
    return children
  };