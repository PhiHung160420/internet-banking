import React, { useEffect, useState } from 'react';

function useCountdown(from) {
    const [seconds, setSeconds] = useState(from);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                clearInterval(myInterval);
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    const reCountdown = () => {
        setSeconds(from);
    };

    return { seconds, reCountdown };
}
export default useCountdown;
