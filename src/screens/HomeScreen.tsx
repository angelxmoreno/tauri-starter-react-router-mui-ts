import Anchor from '@app/components/Anchor.tsx';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const HomeScreen: FC = () => {
    return (
        <>
            <h1>Tauri Starter Kit</h1>
            <Typography>Below you will find examples usage of the starter kit</Typography>
            <hr />
            <h2>Theme Control</h2>
            <p>Control dark/light mode with persistence across app launches. This uses Zustand and localstorage.</p>
            <Anchor to="/theme-control">see more</Anchor>
            <hr />
            <h2>Database Integration</h2>
            <p>Combing Plugin-SQL, Kysely and Zustand; create local-first components.</p>
            <Anchor to="/database-integration">see more</Anchor>
        </>
    );
};

export default HomeScreen;
