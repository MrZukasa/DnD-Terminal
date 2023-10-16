import React, { useState, useEffect } from 'react';

const Loading: React.FC = () => {
    const [dots, setDots] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots + 1) % 4); // Aumenta fino a 3, poi torna a 0
        }, 300); // Cambia il valore per regolare la velocità dell'animazione

        return () => {
            clearInterval(interval); // Pulisce l'intervallo quando il componente si smonta
        };
    }, []);

    return <div>Loading{'.'.repeat(dots)}</div>;
};

export default Loading;
