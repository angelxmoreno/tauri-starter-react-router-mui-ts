import ThemeBtnCtrls from '@app/components/ThemeBtnCtrls.tsx';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const ThemeControlScreen: FC = () => {
    return (
        <>
            <h1>Theme Control</h1>
            <Typography paragraph>Control dark/light mode</Typography>
            <ThemeBtnCtrls />
        </>
    );
};

export default ThemeControlScreen;
