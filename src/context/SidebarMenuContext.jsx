import { createContext, useContext, useState } from 'react';

const SideBarContext = createContext();

function SideBarProvider({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <SideBarContext.Provider
      value={{ isSidebarOpen, openSidebar, closeSidebar }}
    >
      {children}
    </SideBarContext.Provider>
  );
}

function useSideBarMenu() {
  const context = useContext(SideBarContext);
  if (context === undefined)
    throw new Error('SideBarContext was used outside of SideBarProvider');
  return context;
}

export { SideBarProvider, useSideBarMenu };
