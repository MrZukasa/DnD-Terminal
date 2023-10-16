import React, { useEffect, useState } from 'react';

interface JSONAnswer {
    answer: Record<string, any>;
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

const JSONRenderer: React.FC<JSONAnswer> = ({ answer }) => {
    const [randomEmojis, setRandomEmojis] = useState<string[]>([]);

    useEffect(() => {
        const initialEmojis = Array(emojis.length).fill(null).map(getRandomEmoji);
        setRandomEmojis(initialEmojis);
    }, []);

    const removeApiPrefix = (value: string) => {
        return value.startsWith('/api/') ? value.slice(5) : value;
    };

    return (
        <ul className="pl-4">
            {Object.entries(answer).map(([key, value], index) => (
                <li key={key}>
                    {typeof key === 'string' && !/^\d+$/.test(key) && (
                        <span role="img" aria-label="emoji">{randomEmojis[index]}</span>
                    )}
                    <span className='text-amber-200'>{key}:</span>
                    {typeof value === 'object' ? (
                        <JSONRenderer answer={value} />
                    ) : (
                        <span className={key === 'url' ? 'text-cyan-200' : key === 'name' ? 'text-green-400' : ''}>
                            {removeApiPrefix(String(value))}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default JSONRenderer;
