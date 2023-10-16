import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import CallerAPI from './components/callerAPI';
import LogoGenerator from './components/logoGenerator';
import HelpMenu from './components/helpMenu';

const App = () => {
  const [apiUrl, setApiUrl] = useState('https://www.dnd5eapi.co/api/');
  const [inputValue, setInputValue] = useState('');
  const [logoKey, setLogoKey] = useState(0); // Cambiare la chiave per forzare il componente LogoGenerator a reinizializzarsi
  const inputRef = useRef<HTMLInputElement>(null);
  const [actualTime, setActualTime] = useState<string>('');
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        setInputValue('');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      switch (inputValue) {
        case 'i':
        case 'I':
          setApiUrl('https://www.dnd5eapi.co/api/');
          setInputValue('');
          generateRandomLogo();
          setShowHelp(false);
          break;
        case 'h':
        case 'H':
          setApiUrl('https://www.dnd5eapi.co/api/');
          setShowHelp(true);
          console.log(showHelp);
          break;
        default:
          setApiUrl('https://www.dnd5eapi.co/api/' + inputValue)
          setInputValue('');
          setShowHelp(false);
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
            {showHelp ? <HelpMenu /> : <CallerAPI apiUrl={apiUrl} />}
          </div>
          <div className='mt-4 flex'>
            <span>
              <span className='text-amber-500'>master</span>
              <span className='text-opacity-75 text-amber-200'>@</span>
              <span className='text-amber-200 text-opacity-50'>{actualTime}</span>
              <span className='text-amber-200 text-opacity-75'>: $ ~</span>
            </span>
            <div className='flex-1 px-1 w-full'>
              <input
                className=' text-green-400 bg-inherit focus:outline-none w-full'
                value={inputValue}
                onKeyDown={handleInputKeyPress}
                onChange={handleInputChange}
                ref={inputRef}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
