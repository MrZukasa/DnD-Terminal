import React from 'react';
import HelpMenu from './helpMenu';
import NameGenerator from './nameGenerator';
import CallerAPI from './callerAPI';
import SearchMenu from './searchMenu';

interface ContentRendererProps {
    showHelp: boolean;
    showNameGenerator: boolean;
    showSearch: boolean;
    mainCheck: boolean;
    apiUrl: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ showHelp, showNameGenerator, showSearch, mainCheck, apiUrl }) => {
    switch (true) {
        case showHelp:
            return <HelpMenu />;
        case showNameGenerator:
            return <NameGenerator />;
        case showSearch:
            return <SearchMenu />;
        default:
            return <CallerAPI apiUrl={apiUrl} mainCheck={mainCheck} />;
    }
};

export default ContentRenderer;
