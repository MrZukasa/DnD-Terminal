import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSONRenderer from './jsonRender';
import Loading from './loading';


interface CallerAPIProps {
    apiUrl: string;
    mainCheck: boolean;
}

const CallerAPI = ({ apiUrl, mainCheck }: CallerAPIProps) => {
    const [data, setData] = useState<object | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorCheck, setErrorCheck] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(apiUrl)
            .then(response => {
                if (!response.data.results) {
                    setData(response.data)
                }
                else {
                    setData(response.data.results);
                }
                setLoading(false);
                setErrorCheck(false);
            })
            .catch(error => {
                console.log('Si è verificato un errore durante la richiesta API:', error);
                setErrorCheck(true);
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
            <JSONRenderer answer={data} mainMenu={mainCheck} />
            <br />
            <span className='text-amber-200 text-opacity-50'> .\ press 'h' to see the list of available commands.</span>
        </div>
    );
}

export default CallerAPI;
