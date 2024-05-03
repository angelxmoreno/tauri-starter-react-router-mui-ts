import Header from '@app/layout/Header.tsx';
import MenuDrawer from '@app/layout/MenuDrawer.tsx';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header />
            <MenuDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ position: 'relative' }}>
                <Toolbar />
                <div className="page">
                    <Outlet />
                </div>
            </Box>
        </Box>
    );
};

export default Layout;
