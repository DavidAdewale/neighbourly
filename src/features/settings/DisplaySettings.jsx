import { styled } from 'styled-components';
import { useDarkMode } from '../../context/DarkModeContext';
import { useEffect, useState } from 'react';

const Select = styled.select`
  font-family: inherit;
  font-size: inherit;
  padding: 0.5rem 1.5rem;
  border-radius: 0.8rem;

  border: 1px solid var(--color-light-accent);
  outline: none;

  background-color: var(--color-form-input);
  color: var(--color-text);
`;

function DisplaySettings() {
  const { isDark, toggleDisplay } = useDarkMode();
  const isLocalStorage = localStorage.getItem('isDark');
  const initState = isLocalStorage
    ? isDark
      ? 'dark'
      : 'light'
    : 'system-default';
  const [select, setSelect] = useState(initState);

  function handleToggle(e) {
    setSelect(e);
    toggleDisplay(e);
  }

  return (
    <div>
      <Select
        value={select}
        onChange={(e) => {
          handleToggle(e.target.value);
        }}
      >
        <option value="dark">Dark Mode</option>
        <option value="light">Light Mode</option>
        <option value="system-default">System Default</option>
      </Select>
    </div>
  );
}

export default DisplaySettings;
