import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

const Select = styled.select`
  padding: 1rem 1.8rem;
  font-family: inherit;
  border: none;
  border-radius: 0.8rem;

  background-color: var(--color-form-btn);
  color: var(--color-text);

  transition: all 0.3s;

  &:focus {
    /* padding: 1rem 2rem; */
    outline: 1.5px solid var(--color-light-accent);
    background-color: var(--color-input-focus);
    color: var(--color-text);
  }

  & option {
    background-color: var(--color-bg);
    color: var(--color-text);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleChange(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={currentFilter}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export default Filter;
