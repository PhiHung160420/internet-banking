import React from 'react';
import { Link } from 'react-router-dom';
import { routesConfig } from '~/config/routesConfig';

function HomePage() {
    return (
        <>
            <Link to={routesConfig.home}>HomePage</Link>
            <Link to={routesConfig.dashboard}>AdminPage</Link>
        </>
    );
}

export default HomePage;
