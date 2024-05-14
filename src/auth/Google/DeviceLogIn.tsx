import BrowserLink from '@app/components/BrowserLink.tsx';
import { useAuthStore } from '@app/stores/auth-store.ts';
import { Button, TextField } from '@mui/material';
import { FC } from 'react';

const DeviceLogIn: FC = () => {
    const { deviceCodeResponse, createDeviceCode, isFetching } = useAuthStore();

    return deviceCodeResponse ? (
        <div>
            <p>
                Go to{' '}
                <BrowserLink href={deviceCodeResponse.verification_url}>
                    {deviceCodeResponse.verification_url}
                </BrowserLink>{' '}
                and enter the code below:
            </p>
            <TextField value={deviceCodeResponse.user_code} />
            <hr />
            <Button variant="contained" onClick={() => createDeviceCode()}>
                Generate new code
            </Button>
        </div>
    ) : (
        <div>
            <Button onClick={() => createDeviceCode()} variant="contained" disabled={isFetching}>
                Log In
            </Button>
        </div>
    );
};

export default DeviceLogIn;
