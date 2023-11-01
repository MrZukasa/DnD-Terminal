import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import LogoGenerator from './components/logoGenerator';
import ShellInput from './components/shellInput';
import ContentRenderer from './components/contentRenderer';
import './App.css';

const App = () => {
  const [apiUrl, setApiUrl] = useState('https://api.open5e.com/');
  const [logoKey, setLogoKey] = useState(0); // Cambiare la chiave per forzare il componente LogoGenerator a reinizializzarsi
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [actualTime, setActualTime] = useState<string>('');
  const [showHelp, setShowHelp] = useState(false);
  const [showNameGenerator, setShowNameGenerator] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [path, setPath] = useState<string>('main');
  const [mainCheck, setMainCheck] = useState(true);

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }

    window.addEventListener('load', () => {
      focusInput();
      generateRandomLogo();
    });

    window.addEventListener('click', () =>
      focusInput());

    return () => {
      window.removeEventListener('load', focusInput);
      window.removeEventListener('click', focusInput);
    }
  }, []);

  useEffect(() => {
    const updateActualTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setActualTime(`${hours}:${minutes}:${seconds}`);
    };

    // Aggiorna l'ora attuale all'avvio del componente
    updateActualTime();

    // Aggiorna l'ora attuale ogni secondo
    const interval = setInterval(updateActualTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomLogo = () => {
    // Cambiare la chiave per forzare il componente LogoGenerator a reinizializzarsi
    setLogoKey(prevKey => prevKey + 1);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.startsWith(' '))
      setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      switch (inputValue) {
        case 'i':
        case 'I':
        case '':
          setApiUrl('https://api.open5e.com/');
          setInputValue('');
          generateRandomLogo();
          setShowHelp(false);
          setShowNameGenerator(false);
          setShowSearch(false);
          setPath('main');
          setMainCheck(true);
          break;
        case 'h':
        case 'H':
          setInputValue('');
          setShowHelp(true);
          setShowNameGenerator(false);
          setShowSearch(false);
          setPath('help');
          setMainCheck(false);
          break;
        case 'g':
        case 'G':
          setInputValue('');
          setShowHelp(false);
          setShowNameGenerator(true);
          setShowSearch(false);
          setPath('Name Generator')
          setMainCheck(false);
          break;
        case 's':
        case 'S':
          setInputValue('');
          setShowHelp(false);
          setShowNameGenerator(false);
          setShowSearch(true);
          setPath('Searching');
          setMainCheck(false);
          break;
        default:
          if (!showSearch)
            setApiUrl('https://api.open5e.com/v1/' + inputValue)
          else
            setApiUrl('https://api.open5e.com/search/?text=' + inputValue)
          setInputValue(inputValue);
          setShowHelp(false);
          setShowNameGenerator(false);
          setShowSearch(false);
          setPath(inputValue)
          setMainCheck(false);
          break;
      }
    }
  }

  return (
    <>
      <div className='m-2 p-2 bg-stone-800 min-h-screen border-2 border-yellow-600 rounded'>
        <div className='coding inverse-toggle px-2 pt-2 text-amber-100 text-sm font-mono subpixel-antialiased pb-6 leading-normal overflow-hidden'>
          <div className='top mb-2 flex'>
            <div className='h-3 w-3 bg-red-500 rounded-full'></div>
            <div className='ml-2 h-3 w-3 bg-orange-300 rounded-full'></div>
            <div className='ml-2 h-3 w-3 bg-green-500 rounded-full'></div>
          </div>
          <div className='mt-4 flex'>
            <LogoGenerator key={logoKey} /> {/* Usare la chiave per forzare la reinizializzazione del componente LogoGenerator */}
          </div>
          <div className='mt-4 flex'>
            <ContentRenderer
              apiUrl={apiUrl}
              showHelp={showHelp}
              showNameGenerator={showNameGenerator}
              showSearch={showSearch}
              mainCheck={mainCheck}
            />
          </div>
          <div className='mt-4 flex'>
            <ShellInput
              actualTime={actualTime}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onInputKeyPress={handleInputKeyPress}
              inputRef={inputRef}
              path={path}
              searchMode={showSearch}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
