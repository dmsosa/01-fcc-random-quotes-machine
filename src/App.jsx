import { useState } from 'react'
import RandomQuotes from './components/RandomQuotes'

export const THEMES_LENGTH = 5;

function App() {
  const [ theme, setTheme ] = useState('theme-1');

  return (
    <div id="app-wrapper" className={`app-wrapper ${theme}`}>
      <RandomQuotes setTheme={setTheme}/>
    </div>
  )
}

export default App
