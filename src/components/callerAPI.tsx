import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSONRenderer from './jsonRender';
import Loading from './loading';


interface CallerAPIProps {
    apiUrl: string;
}

const CallerAPI = ({ apiUrl }: CallerAPIProps) => {
    const [data, setData] = useState<object | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorCheck, seterrorCheck] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(apiUrl)
            .then(response => {
                setData(response.data);
                setLoading(false);
                seterrorCheck(false);
            })
            .catch(error => {
                console.error('Si è verificato un errore durante la richiesta API:', error);
                seterrorCheck(false);
                setLoading(false);
            });
    }, [apiUrl]);

    if (loading) {
        return <Loading />;
    }

    if (!data || errorCheck) {
        return (
            <div>
                <div className=' text-red-300'> .\ Oh-oh! it seems there is nothing here ( ͡° ͜ʖ ͡°)</div>
                <br />
                <div className=' text-amber-200 text-opacity-50'> .\ press 'h' to see the list of available commands.</div>
            </div>
        );
    }

    return (
        <div>
            <span></span>
            <JSONRenderer answer={data} />
            <br />
            <span className='text-amber-200 text-opacity-50'> .\ press 'h' to see the list of available commands.</span>
        </div>
    );
}

export default CallerAPI;
