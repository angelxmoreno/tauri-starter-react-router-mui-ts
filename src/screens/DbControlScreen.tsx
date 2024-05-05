import Greeter from '@app/components/Greeter.tsx';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const DbControlScreen: FC = () => {
    return (
        <>
            <h1>Database Integration</h1>
            <Typography paragraph>Fetch and set data to local sqlite db</Typography>
            <Greeter />
        </>
    );
};

export default DbControlScreen;
