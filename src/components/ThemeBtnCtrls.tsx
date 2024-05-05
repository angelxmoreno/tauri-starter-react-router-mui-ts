import { useSettingsStore } from '@app/stores/settings-store.ts';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const ThemeBtnCtrls: FC = () => {
    const { themeMode, setLightMode, setDarkMode } = useSettingsStore();

    return (
        <>
            <Typography paragraph>
                This is the home screen {themeMode === null ? 'with no theme set' : `with the ${themeMode} theme.`}
            </Typography>
            <p>
                <Button variant="outlined" onClick={setLightMode}>
                    Light Theme
                </Button>{' '}
                <Button variant="contained" onClick={setDarkMode}>
                    Dark Theme
                </Button>
            </p>
        </>
    );
};

export default ThemeBtnCtrls;
