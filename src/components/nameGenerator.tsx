import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import maleApiUrl from '../initiatorMaleAPIURL';
import femaleApiUrl from '../initiatorFemaleAPIURL';
import raceList from '../initiatorName';
import Loading from './loading';

interface Muna {
    names: string;
}

const NameGenerator: React.FC = () => {
    const [result, setResult] = useState<Muna[]>([]);
    const resultName: string[] = raceList;
    const isMounting = useRef(false);
    const loadingDuration = 20200; //TODO fixare il timer qui in maniera che sia appaiato alla lettura della API
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        isMounting.current = true
        const fetchData = async () => {
            const maleData = await Promise.all(
                maleApiUrl.map((URI) => axios.get(URI).then(response => response.data.names[0]))
            );

            const femaleData = await Promise.all(
                femaleApiUrl.map((URI) => axios.get(URI).then(response => response.data.names[0]))
            );
            setResult([...maleData, ...femaleData]);
            setLoading(false);
        };
        const timer = setInterval(fetchData, 20000);
        fetchData();
        let startTime = Date.now();
        const updateProgress = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const progress = 100 - (elapsedTime / loadingDuration) * 100;
            setLoadingProgress(progress);
            if (progress <= 0) {
                setLoadingProgress(100);
                startTime = currentTime;
            }
            requestAnimationFrame(updateProgress);
        };
        updateProgress();
        return () => clearInterval(timer);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            {result.map((data, index) => (
                <div key={index}>
                    <span>
                        {index < 11 ?
                            (<span className='italic font-bold'>_ Male</span>) :
                            (<span className='italic font-bold text-purple-100'>_ Female</span>)}
                        <span className=' text-amber-100 text-opacity-50'>{' ' + resultName[index]}:</span>
                        <span className='text-green-400'>{' ' + data}</span>
                    </span>
                </div>
            ))}
            <br />
            <span className='text-amber-200 text-opacity-50'> .\ press 'h' to see the list of available commands.</span>
            <div className="relative h-1 mt-4 bg-stone-800 rounded">
                <div className="absolute h-1 bg-stone-700 rounded" style={{ width: `${loadingProgress}%` }}></div>
            </div>
        </div>
    );
}

export default NameGenerator;
