import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';

function EmployeeRoutes() {
    const { IS_EMPLOYEE } = useAuth();
    return IS_EMPLOYEE ? <Outlet /> : <Navigate to="/login" />;
}

export default EmployeeRoutes;
