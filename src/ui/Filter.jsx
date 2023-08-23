import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleChange(value) {
    if (searchParams.get('page')) {
      searchParams.set('page', '1');
    }
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
