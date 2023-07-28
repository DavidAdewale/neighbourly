import { useState } from 'react';

function useMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(() => !isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return { isOpen, handleToggle, closeMenu };
}

export { useMenuToggle };
