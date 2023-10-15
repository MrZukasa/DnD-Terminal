import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import CallerAPI from './components/callerAPI';
import LogoGenerator from './components/logoGenerator';

const App = () => {
  const [apiUrl, setApiUrl] = useState('https://www.dnd5eapi.co/api/');
  const [inputValue, setInputValue] = useState('');
  const [logoKey, setLogoKey] = useState(0); // Cambiare la chiave per forzare il componente LogoGenerator a reinizializzarsi
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        setInputValue('');
      }
    }
    // Aggiungi il listener per il caricamento della pagina
    window.addEventListener('load', () => {
      focusInput();
      generateRandomLogo();
    });

    // Rimuovi il listener quando il componente si smonta
    return () => window.removeEventListener('load', focusInput);
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
          break;
        default:
          setApiUrl('https://www.dnd5eapi.co/api/' + inputValue)
          setInputValue('');
          break;
      }
    }
  }

  return (
    <>
      <div className='w-full sticky'>
        <div className='coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased
              bg-gray-800  pb-6 pt-4 leading-normal overflow-hidden'>
          <div className='top mb-2 flex'>
            <div className='h-3 w-3 bg-red-500 rounded-full'></div>
            <div className='ml-2 h-3 w-3 bg-orange-300 rounded-full'></div>
            <div className='ml-2 h-3 w-3 bg-green-500 rounded-full'></div>
          </div>
          <div className='mt-4 flex'>
            <LogoGenerator key={logoKey} /> {/* Usare la chiave per forzare la reinizializzazione del componente LogoGenerator */}
          </div>
          <div className='mt-4 flex'>
            <CallerAPI apiUrl={apiUrl} />
          </div>
          <div className='mt-4 flex'>
            <span className='text-green-400' id='shell'>
              shell qui
            </span>
            <div className='flex px-1' id='input'>
              <input
                className='text-white bg-inherit focus:outline-none'
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
