import React, { useEffect, useState } from 'react';

interface JSONAnswer {
    answer: Record<string, number | string | boolean>;
    mainMenu: boolean;
}

const emojis = [
    '🎲', '🐉', '⚔️', '🏰', '🧙🏻‍♂️', '🏹', '🐲', '👸', '🧚‍♀️',
    '🧜🏿‍♀️', '🧙🏼', '🧛', '🧜🏽‍♂️', '🧝🏼‍♀️', '🗡', '💎', '💰',
    '💍', '🧞', '🧞‍♀️', '👹', '🦄', '🦹🏽‍♂️', '🦇', '📜', '🛡️', '🧟'
];

const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

const JSONRenderer: React.FC<JSONAnswer> = ({ answer, mainMenu }) => {
    const [randomEmojis, setRandomEmojis] = useState<string[]>([]);

    useEffect(() => {
        const initialEmojis = Array(emojis.length).fill(null).map(getRandomEmoji);
        setRandomEmojis(initialEmojis);
    }, []);

    return (
        <ul className="pl-4">
            {answer && Object.entries(answer).map(([key, value], index) => (
                (key !== 'index') ? (
                    (value !== 0 && value !== null && value !== '' && (!Array.isArray(value) || value.length > 0)) && (
                        <li key={key}>
                            {typeof key === 'string' && <span role="img" aria-label="emoji">{randomEmojis[index]}</span>}
                            <span className='text-amber-200'>{key}</span>
                            {typeof value === 'object' ? (
                                <JSONRenderer answer={value} mainMenu={mainMenu} />
                            ) : (
                                <span className={key === 'url' ? 'text-cyan-200' : key === 'name' ? 'text-green-400' : ''}>
                                    {
                                        key === 'url' ?
                                            !mainMenu && ' ' + (String(value).substring(4, String(value).length))
                                            : !mainMenu && ' ' + String(value)
                                    }
                                </span>
                            )}
                        </li>
                    )
                ) : '')
            )}
        </ul>
    );

}

export default JSONRenderer;
