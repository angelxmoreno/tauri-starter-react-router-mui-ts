import Layout from '@app/layout/Layout.tsx';
import FeedsScreen from '@app/screens/FeedsScreen.tsx';
import HomeScreen from '@app/screens/HomeScreen.tsx';
import OtherScreen from '@app/screens/OtherScreen.tsx';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
    { path: '/', element: <HomeScreen />, index: true },
    { path: '/other', element: <OtherScreen /> },
    { path: '/feeds', element: <FeedsScreen /> },
];

const rootRoute: RouteObject = {
    element: <Layout />,
    children: routes,
};
export const router = createBrowserRouter([rootRoute]);
