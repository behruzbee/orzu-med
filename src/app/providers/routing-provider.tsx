import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ProtectorLayout from 'pages/layout/protector';
import { LoginPage } from 'pages/login';
import { BranchPage } from 'pages/branch';
import { AppPages } from 'shared/constants/routes';
import { AccountPage } from 'pages/account';
import { StatisticPage } from 'pages/statistic';

const router = createBrowserRouter([
        {
                path: AppPages.RootPage,
                element: <ProtectorLayout />,
                children: [
                        {
                                index: true,
                                element: <Navigate to={AppPages.CreateAccountPage} />
                        },
                        {
                                path: AppPages.MonitoringPage + '/:marketId',
                                element: <BranchPage />
                        },
                        {
                                path: AppPages.CreateAccountPage,
                                element: <AccountPage />
                        },
                        {
                                path: AppPages.StatisticsPage,
                                element: <StatisticPage />
                        }
                ]
        },
        {
                path: AppPages.LoginPage,
                element: <LoginPage />
        },
        {
                path: AppPages.AnyPage,
                element: <Navigate to="/login" replace />
        }
])

const RoutingProvider = () => {
        return (
                <RouterProvider router={router} />
        );
};

export default RoutingProvider