import React from 'react'

const NameGenerator: React.FC = () => {
    return (
        <>
            <div>
                <span> .\ Press 'q' to quit this functionality.</span>
                <br />
                <span> .\ Press 'm' to generate 10 male names.</span>
                <br />
                <span> .\ Press 'f' to generate 10 female names.</span>
            </div>
        </>
    )
}

export default NameGenerator;