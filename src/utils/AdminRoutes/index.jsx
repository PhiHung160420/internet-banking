import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';

function AdminRoutes() {
    const { IS_ADMIN } = useAuth();
    return IS_ADMIN ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoutes;
