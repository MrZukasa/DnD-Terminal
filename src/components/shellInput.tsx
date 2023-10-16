import React from 'react';

interface ShellInputProps {
    actualTime: string;
    inputValue: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInputKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

const ShellInput: React.FC<ShellInputProps> = ({
    actualTime,
    inputValue,
    onInputChange,
    onInputKeyPress,
    inputRef,
}) => {
    return (
        <>
            <span>
                <span className='text-amber-500'>master</span>
                <span className='text-opacity-75 text-amber-200'>@</span>
                <span className='text-amber-200 text-opacity-50'>{actualTime}</span>
                <span className='text-amber-200 text-opacity-75'>: $ ~ </span>
            </span>
            <div className='flex-1 px-1 w-full'>
                <input
                    className='text-green-400 bg-inherit focus:outline-none w-full'
                    value={inputValue}
                    onKeyDown={onInputKeyPress}
                    onChange={onInputChange}
                    ref={inputRef}
                />
            </div>
        </>

    );
};

export default ShellInput;
