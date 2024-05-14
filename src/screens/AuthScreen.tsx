import DeviceLogIn from '@app/auth/Google/DeviceLogIn.tsx';
import BrowserLink from '@app/components/BrowserLink.tsx';
import { useAuthStore } from '@app/stores/auth-store.ts';
import { Avatar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const AuthScreen: FC = () => {
    const { user, logout } = useAuthStore();

    return (
        <>
            <h1>Auth Integration</h1>
            <Typography paragraph>
                Authentication is done without adding client secrets to the Tauri app. This is achieved by using{' '}
                <BrowserLink href="https://github.com/angelxmoreno/desktop-oauth-bridge">
                    DesktopOAuthBridge
                </BrowserLink>{' '}
                and Google's{' '}
                <BrowserLink href="https://developers.google.com/identity/protocols/oauth2/limited-input-device">
                    OAuth 2.0 for TV and Limited-Input Device Applications
                </BrowserLink>
                .
            </Typography>
            {!user && <DeviceLogIn />}
            {user && (
                <div>
                    <Avatar alt={user.name || ''} src={user.picture || undefined} sx={{ width: 48, height: 48 }}>
                        {user.name ? user.name[0] : 'XX'}
                    </Avatar>
                    <p>{user.name}</p>
                    <Button variant="contained" onClick={() => logout()}>
                        Log Out
                    </Button>
                    <hr />
                </div>
            )}
        </>
    );
};

export default AuthScreen;
