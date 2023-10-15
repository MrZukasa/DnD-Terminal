import React, { useState, useEffect } from 'react';

interface JSONAnswer {
    answer: Record<string, any>;
}

// Lista di emoji possibili
const emojis = ['🎲', '🐉', '⚔️', '🏰', '🧙🏻‍♂️', '🏹', '🐲', '👸', '🧚‍♀️', '🧜🏿‍♀️', '🧙🏼', '🧛', '🧜🏽‍♂️', '🧝🏼‍♀️', '🗡', '💎', '💰', '💍', '🧞', '🧞‍♀️', '👹', '🦄', '🦹🏽‍♂️', '🦇', '📜', '🛡️', '🧟'];

const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

const JSONRenderer: React.FC<JSONAnswer> = ({ answer }) => {
    const [randomEmoji, setRandomEmoji] = useState<string>('');

    useEffect(() => {
        setRandomEmoji(getRandomEmoji());
    }, []);

    const removeApiPrefix = (value: string) => {
        return value.startsWith('/api/') ? value.slice(5) : value;
    };

    return (
        <ul className="pl-4">
            {Object.entries(answer).map(([key, value]) => (
                <li key={key}>
                    {typeof key === 'string' && !/^\d+$/.test(key) && (
                        <span role="img" aria-label="emoji">{randomEmoji}</span>
                    )}
                    <strong>{key}:</strong>
                    {typeof value === 'object' ? (
                        <JSONRenderer answer={value} />
                    ) : (
                        <span className={key === 'url' ? 'text-yellow-400' : key === 'name' ? 'text-green-400' : ''}>
                            {removeApiPrefix(String(value))}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default JSONRenderer;
