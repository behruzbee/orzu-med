import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ProtectorLayout from 'pages/layout/protector';
import { LoginPage } from 'pages/login';
import { MainPage } from 'pages/main';

const router = createBrowserRouter([
        {
                path: "/",
                element: <ProtectorLayout />,
                children: [
                        {
                                index: true,
                                element: <MainPage />
                        }
                ]
        },
        {
                path: "/login",
                element: <LoginPage />
        },
        // {
        //         path: "*",
        //         element: <Navigate to="/" replace />
        // }
])

const RoutingProvider = () => {
        return (
                <RouterProvider router={router} />
        );
};

export default RoutingProvider