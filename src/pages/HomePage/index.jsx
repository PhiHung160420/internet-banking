import React from 'react';
import { Link, Navigate } from 'react-router-dom';

function HomePage() {
    return (
        <>
            <Link to="/">HomePage</Link>
            <Link to="admin/dashboard">AdminPage</Link>
        </>
    );
}

export default HomePage;
