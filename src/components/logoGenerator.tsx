import React, { useEffect, useState } from 'react';
import figlet, { Fonts } from 'figlet';
import fontNames from '../fontNames';

const getRandomFont = (): string => {
    const randomIndex = Math.floor(Math.random() * fontNames.length);
    return fontNames[randomIndex];
};

const LogoComponent: React.FC = () => {
    const [logoText, setLogoText] = useState<string>(''); // Stato per memorizzare il testo del logo

    const printLogo = () => {
        const selectedFont = getRandomFont();

        figlet('DnD', { font: selectedFont } as unknown as Fonts, (err, data) => {
            if (err) {
                console.error('Errore: ', err);
                return;
            }
            if (data)
                setLogoText(data);
        });
    };

    useEffect(() => {
        printLogo(); // Chiamato all'avvio del componente
    }, []);

    return (
        <div>
            <pre>{logoText}</pre>
        </div>
    );
};

export default LogoComponent;
