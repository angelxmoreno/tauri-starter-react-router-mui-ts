import { useSettingsStore } from '@app/stores/settings-store.ts';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { FC, PropsWithChildren, useMemo } from 'react';

export const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const { themeMode } = useSettingsStore();

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode || 'light',
                },
            }),
        [themeMode],
    );

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
