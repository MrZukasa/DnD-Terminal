import './App.css'
import CallerAPI from './components/callerAPI'

const App = () => {
  return (
    <>
      <div className="w-full sticky border-black border-4">
        <div className="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased
              bg-gray-800  pb-6 pt-4 leading-normal overflow-hidden border-red-500 border-4">
          <div className="top mb-2 flex">
            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
            <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
          </div>
          <div className='mt-4 flex border-red-500 border-4'>
            logo random qui
          </div>
          <div className='mt-4 flex border-red-500 border-4' id='risposte'>
            <CallerAPI apiUrl={"https://www.dnd5eapi.co/api/"} />
          </div>
          <div className="mt-4 flex border-red-500 border-4">
            <span className="text-green-400" id='shell'>
              shell qui
            </span>
            <div className='flex px-1' id='input'>
              <input placeholder='qui ci scrivi' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
