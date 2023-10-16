import React from 'react';
import HelpMenu from './helpMenu';
import NameGenerator from './nameGenerator';
import CallerAPI from './callerAPI';

interface ContentRendererProps {
    showHelp: boolean;
    showNameGenerator: boolean;
    apiUrl: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ showHelp, showNameGenerator, apiUrl }) => {
    switch (true) {
        case showHelp:
            return <HelpMenu />;
        case showNameGenerator:
            return <NameGenerator />;
        default:
            return <CallerAPI apiUrl={apiUrl} />;
    }
};

export default ContentRenderer;
