import './App.scss';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { adminRoutes, employeeRoutes, privateRoutes, publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout';
import { Fragment } from 'react';
import PrivateRoutes from './utils/PrivateRoutes';
import { DEFAULT_ROUTES, routesConfig } from './config/routesConfig';
import AdminRoutes from './utils/AdminRoutes';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeRoutes from './utils/EmployeeRoutes';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    {/* PUBLIC ROUTES */}
                    {publicRoutes.map((route, index) => {
                        const Page = route.element;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {/* PRIVATE ROUTES */}
                    <Route element={<PrivateRoutes />}>
                        {privateRoutes.map((route, index) => {
                            const Page = route.element;
                            let Layout = DashboardLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        <Route element={<AdminRoutes />}>
                            {adminRoutes.map((route, index) => {
                                const Page = route.element;
                                let Layout = DashboardLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>

                        <Route element={<EmployeeRoutes />}>
                            {employeeRoutes.map((route, index) => {
                                const Page = route.element;
                                let Layout = DashboardLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>
                    </Route>
                    <Route path={routesConfig.PageNotFound} element={<Navigate to={DEFAULT_ROUTES} />} />
                </Routes>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
