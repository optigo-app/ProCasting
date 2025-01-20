import React from 'react';
import { useCountdownTimer } from '../../../Utils/TimerHook';

const TimerComponent = ({ startDate, mode }) => {


    const { timeLeft, isCompleted, completedAt } = useCountdownTimer(startDate, mode);

    return (
        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', width: 'fit-content' }}>
            <h3>Mode: {mode}</h3>
            {!isCompleted ? (
                <p>
                    Time Left: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </p>
            ) : (
                <p>Completed at: {completedAt}</p>
            )}
        </div>
    );
};

const App = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TimerComponent
                startDate="2024-12-23T12:13:00.00"
                mode="Investment"
            />
        </div>
    );
};

export default App;
