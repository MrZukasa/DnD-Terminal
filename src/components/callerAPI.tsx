import { useState, useEffect } from 'react';
import axios from 'axios';
import JSONRenderer from './jsonRender';


interface CallerAPIProps {
    apiUrl: string;
}

const CallerAPI = ({ apiUrl }: CallerAPIProps) => {
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
            <h1>Menù:</h1>
            <JSONRenderer answare={data} />
        </div>
    );
}

export default CallerAPI;
