import React from 'react'

const helpMenu: React.FC = () => {
    return (
        <div>
            <span> .\ Press 'i' to list all the MAIN entry available.</span>
            <br />
            <span> .\ Press 'g' to generate a random name.</span>
            <br />
            <span> .\ Press 's' to search through the Wiki.</span>
        </div>
    )
}

export default helpMenu;