import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import maleApiUrl from '../initiatorURL';
import maleApiList from '../initiatorName';

interface Muna {
    names: string;
}

const NameGenerator: React.FC = () => {
    const [result, setResult] = useState<Muna[]>([]);
    const resultName: string[] = maleApiList;
    const isMounting = useRef(false);

    useEffect(() => {
        isMounting.current = true
        Promise.all(maleApiUrl.map((URI) =>
            axios.get(URI).then(response => response.data.names[0])
        )).then((dataArray) => setResult(dataArray));
    }, []);

    return (
        <div>
            {result.map((data, index) => (
                <div key={index}>
                    <span> {resultName[index]} Name: {data}</span>
                </div>
            ))}
        </div>
    );
}

export default NameGenerator;
