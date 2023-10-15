import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CallerAPIProps {
    apiUrl: string;
}

function renderJSONObject(obj: any) {
    return (
        <ul>
            {Object.entries(obj).map(([key, value]) => (
                <li key={key}>
                    <strong>{key}:</strong> {typeof value === 'object' && value !== null ? renderJSONObject(value) : String(value)}
                </li>
            ))}
        </ul>
    );
}

function CallerAPI({ apiUrl }: CallerAPIProps) {
    const [data, setData] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Si è verificato un errore durante la richiesta API:', error);
                setLoading(false);
            });
    }, [apiUrl]);

    if (loading) {
        return <div>Caricamento in corso...</div>;
    }

    if (!data) {
        return <div>La risposta dall'API è vuota o non è un JSON valido.</div>;
    }

    return (
        <div>
            <h1>Dati dall'API:</h1>
            {renderJSONObject(data)}
        </div>
    );
}

export default CallerAPI;
