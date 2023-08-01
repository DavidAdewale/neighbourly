import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDark, setisDark] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDark'
  );

  useEffect(
    function () {
      if (isDark) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }
    },
    [isDark]
  );

  function handleDarkToggle() {
    setisDark(() => !isDark);
  }

  function toggleDisplay(value) {
    if (value === 'dark') setisDark(true);
    if (value === 'light') setisDark(false);
    if (value === 'system-default')
      setisDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  return (
    <DarkModeContext.Provider
      value={{ isDark, handleDarkToggle, toggleDisplay }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}

export { DarkModeProvider, useDarkMode };
