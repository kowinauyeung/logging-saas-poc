import { useState, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const fireErrorIfEven = useCallback(() => {
    const nextCount = count + 1
    setCount(nextCount)
    if (count % 2 !== 0) {
      const msg = `This is even number ${nextCount}!!`
      console.log('log: ' + msg)
      console.info('info: ' + msg)
      console.warn('warn: ' + msg)
      console.error('error: ' + msg)
      console.trace('trace: ' + msg)
      throw new Error(msg)
    }
  }, [count])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={fireErrorIfEven}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
