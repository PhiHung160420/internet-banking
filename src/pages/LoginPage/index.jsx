import React from 'react';
import { Navigate } from 'react-router-dom';
import { IS_LOGIN } from '~/constant';

function LoginPage() {
    return IS_LOGIN ? <Navigate to={'/'} /> : <div>LoginPage</div>;
}

export default LoginPage;
