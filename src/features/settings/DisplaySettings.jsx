import { styled } from 'styled-components';
import { useDarkMode } from '../../context/DarkModeContext';

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
  const { toggleDisplay } = useDarkMode();

  return (
    <div>
      <Select onChange={(e) => toggleDisplay(e.target.value)}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="system-default">System Default</option>
      </Select>
    </div>
  );
}

export default DisplaySettings;
