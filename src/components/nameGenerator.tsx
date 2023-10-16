import React, { useEffect, useState } from 'react';

const NameGenerator: React.FC = () => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'm') {
                'https://muna.ironarachne.com/dwarf/?count=30&nameType=male'
            } else if (e.key === 'f') {
                'https://muna.ironarachne.com/dwarf/?count=30&nameType=female'
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <div>
                <span> .\ Press 'i' to go back to the MAIN entry list.</span>
                <br />
                <span> .\ Press 'm' to generate 10 male names.</span>
                <br />
                <span> .\ Press 'f' to generate 10 female names.</span>
            </div>
        </>
    );
}

export default NameGenerator;
