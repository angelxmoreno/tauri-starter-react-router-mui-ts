import { useEffect, useRef, useState } from 'react';

type Callback = () => void;
type IntervalId = ReturnType<typeof setInterval> | null;

export function useInterval(callback: Callback, delay: number): [() => void, boolean] {
    const savedCallback = useRef<Callback>();
    const intervalId = useRef<IntervalId>(null);
    const [isRunning, setIsRunning] = useState<boolean>(true);

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }
        if (delay !== null && isRunning) {
            intervalId.current = setInterval(tick, delay);
            return () => {
                if (intervalId.current) {
                    clearInterval(intervalId.current);
                }
            };
        }
    }, [delay, isRunning]);

    // Function to stop the interval
    const stopInterval = () => {
        setIsRunning(false);
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    };

    return [stopInterval, isRunning];
}
