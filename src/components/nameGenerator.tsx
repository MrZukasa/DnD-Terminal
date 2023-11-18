import React, { useEffect, useState } from 'react';
import raceList from '../initiatorName';
import { nameByRace } from "fantasy-name-generator";

interface Muna {
    names: string | Error;
}

const NameGenerator: React.FC = () => {
    const [maleNameList, setMaleNameList] = useState<Muna[]>([]);
    const [femaleNameList, setFemaleNameList] = useState<Muna[]>([]);
    const loadingDuration = 20000;
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        const genNamesList = (raceList: string[]) => {
            const udatedMaleNameList = raceList.map((race: string) => {
                const name: Muna = {
                    names: nameByRace(race, { gender: 'male', allowMultipleNames: true })
                };
                return name;
            })
            setMaleNameList(udatedMaleNameList)
            const udatedFemaleNameList = raceList.map((race: string) => {
                const name: Muna = {
                    names: nameByRace(race, { gender: 'female', allowMultipleNames: true })
                };
                return name;
            })
            setFemaleNameList(udatedFemaleNameList)

        }
        genNamesList(raceList);
        const timer = setInterval(() => genNamesList(raceList), 20000);
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

    return (
        <div>
            {maleNameList.map((data, index) => (
                <div key={index}>
                    <span>
                        <span className='italic font-bold'>_ Male</span>
                        <span className=' text-amber-100 text-opacity-50'>{' ' + raceList[index]}:</span>
                        <span className='text-green-400'>{' ' + data.names}</span>
                    </span>
                </div>
            ))}
            {femaleNameList.map((data, index) => (
                <div key={index}>
                    <span>
                        <span className='italic font-bold text-purple-100'>_ Female</span>
                        <span className=' text-amber-100 text-opacity-50'>{' ' + raceList[index]}:</span>
                        <span className='text-green-400'>{' ' + data.names}</span>
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
