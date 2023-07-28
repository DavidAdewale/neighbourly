import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDark, setisDark] = useState(
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
  return (
    <DarkModeContext.Provider value={{ isDark, handleDarkToggle }}>
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
