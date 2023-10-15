import React from 'react';

interface JSONAnsware {
    answare: Record<string, any>;
}

const renderJSON = (obj: Record<string, any>) => (
    <ul>
        {Object.entries(obj).map(([key, value]) => (
            <li key={key}>
                <strong>📜 {key}:</strong> {typeof value === 'object' && value !== null ? renderJSON(value) : String(value)}
            </li>
        ))}
    </ul>
);

const JSONRenderer: React.FC<JSONAnsware> = ({ answare }) => (
    <div>
        {renderJSON(answare)}
    </div>
);

export default JSONRenderer;
