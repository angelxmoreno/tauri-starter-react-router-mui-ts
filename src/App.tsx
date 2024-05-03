import { router } from '@app/config/routes.tsx';
import { AppThemeProvider } from '@app/providers/AppThemeProvider.tsx';
import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';

export const App: FC = () => {
    return (
        <AppThemeProvider>
            <RouterProvider router={router} />
        </AppThemeProvider>
    );
};
