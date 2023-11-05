import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'markdown-to-jsx';

interface JSONAnswer {
    answer: Record<string, any>;
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
                (key !== 'document__license_url'
                    && key !== 'search'
                    && key !== 'manifest'
                    && key !== 'requires_verbal_components'
                    && key !== 'requires_somatic_components'
                    && key !== 'requires_material_components'
                    && key !== 'can_be_cast_as_ritual'
                    && key !== 'spell_level'
                    && key !== 'spell_lists'
                    && key !== 'target_range_sort'
                    && key !== 'created_at'
                    && key !== 'copyright'
                    && key !== 'document__slug'
                    && key !== 'requires_concentration') ? (
                    (value !== 0 && value !== null && value !== '' && (!Array.isArray(value) || value.length > 0)) && (
                        <li key={key}>
                            {typeof key === 'string' && <span role="img" aria-label="emoji">{randomEmojis[index]}</span>}
                            <span className='text-amber-200'>{key}</span>
                            {typeof value === 'object' ? (
                                <JSONRenderer answer={value} mainMenu={mainMenu} />
                            ) : (
                                <span className={key === 'slug' ? 'text-cyan-200' : key === 'name' ? 'text-green-400' : ''}>
                                    {!mainMenu ? (
                                        typeof value === 'string'
                                            && ((value.indexOf('*') !== -1) || (value.indexOf('|') !== -1)) ? (
                                            <span>
                                                &nbsp;
                                                <ReactMarkdown>{value}</ReactMarkdown>
                                            </span>
                                        ) : (
                                            typeof value === 'string' && value.indexOf('.png') !== -1 ? (
                                                <img src={value} alt="Immagine" className="max-h-60" />
                                            ) : (
                                                ' ' + String(value)
                                            )
                                        )
                                    ) : null}
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
