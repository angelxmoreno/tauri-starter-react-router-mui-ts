import { useInterval } from '@app/utils/useInterval.ts';
import { Button } from '@mui/material';
import { FC, useState } from 'react';

const Timer: FC = () => {
    const [clock, setClock] = useState(new Date());

    const [stopInterval, isRunning] = useInterval(() => {
        setClock(new Date());
    }, 1);

    return (
        <div>
            <p>{clock.toTimeString()}</p>
            <Button variant="contained" onClick={() => stopInterval()} disabled={!isRunning}>
                Stop
            </Button>
        </div>
    );
};

export default Timer;
