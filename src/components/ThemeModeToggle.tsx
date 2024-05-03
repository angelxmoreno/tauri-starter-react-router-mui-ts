import { useSettingsStore } from '@app/stores/settings-store.ts';
import { mdiThemeLightDark } from '@mdi/js';
import Icon from '@mdi/react';
import { Switch } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FC } from 'react';
import * as React from 'react';

const ThemeModeToggle: FC = () => {
    const { themeMode, setLightMode, setDarkMode } = useSettingsStore();
    const handleChange = (_e: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
        if (isChecked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    };
    return (
        <ListItem>
            <ListItemIcon>
                <Icon path={mdiThemeLightDark} size={1} />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <Switch onChange={handleChange} checked={themeMode === 'dark'} />
        </ListItem>
    );
};

export default ThemeModeToggle;
