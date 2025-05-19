import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { INITIAL_ROUTES } from "../../constants";

interface IPrivateRouteProps  { 
    children: React.ReactNode
 };

export function PrivateRoute({ children }: IPrivateRouteProps): React.ReactElement | null{
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.user) {
    return (
        <Navigate 
            to={INITIAL_ROUTES.login} 
            state={{from: location.pathname}} 
            replace
        />
    )
  }

  return <>{children}</>;;
}