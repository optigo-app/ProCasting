import { useEffect, useState } from 'react';

export const useCountdownTimer = (startDate, mode = '', hours, minutes, seconds) => {
    const [timeLeft, setTimeLeft] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [completedAt, setCompletedAt] = useState(null);

    useEffect(() => {
        const startTime = new Date(startDate).getTime();
        const duration = hours * 3600 + minutes * 60 + seconds;
        const endTime = startTime + duration * 1000;

        const updateTimer = () => {
            const currentTime = Date.now();
            const remainingTime = endTime - currentTime;

            if (remainingTime <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                setIsCompleted(true);
                setCompletedAt(new Date().toISOString());
                clearInterval(timer);
            } else {
                const hrs = Math.floor(remainingTime / (1000 * 60 * 60));
                const mins = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const secs = Math.floor((remainingTime % (1000 * 60)) / 1000);

                setTimeLeft({ hours: hrs, minutes: mins, seconds: secs });
            }
        };

        const timer = setInterval(updateTimer, 1000);
        updateTimer(); // Initialize immediately

        return () => clearInterval(timer);
    }, [startDate, mode]);

    return { timeLeft, isCompleted, completedAt, mode };
};
