import { css, styled } from 'styled-components';
import { HiArrowTrendingDown, HiArrowTrendingUp } from 'react-icons/hi2';
import {
  capitalizeFirstLetter,
  formatCurrency,
  formatDateToRelative,
} from '../../utilities/helpers';
import { useNavigate, useParams } from 'react-router-dom';

const StyledList = styled.div`
  display: grid;
  width: 100%;
  border-bottom: 1px solid var(--color-light-accent);
  grid-template-columns: repeat(2, minmax(1rem, 1fr)) 2fr 4fr;
  grid-column-gap: 2rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-card-bg);
  }

  @media only screen and (max-width: 37.5em) {
    grid-template-columns: 0.3fr repeat(2, 1fr) 2fr;
  }
`;

const Category = styled.div`
  text-align: center;
  & svg {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2.5rem;
    text-transform: uppercase;
    font-size: 1.1rem;
  }

  ${({ type }) =>
    type === 'income' &&
    css`
      color: var(--color-main);
    `}
  ${({ type }) =>
    type === 'expenses' &&
    css`
      color: var(--color-danger);
    `}
`;

const Date = styled.p`
  max-width: 15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 1.2rem;
`;

const Description = styled.p`
  max-width: 30rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Amount = styled.p`
  font-family: 'Space Mono';

  ${({ type }) =>
    type === 'income' &&
    css`
      color: var(--color-main);
    `}

  ${({ type }) =>
    type === 'expenses' &&
    css`
      color: var(--color-danger);
    `}
`;

function TableList({ record }) {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const { id, category, transactionDate, amount, description } = record;
  return (
    <StyledList onClick={() => navigate(`/finances/${propertyId}/entry/${id}`)}>
      <Category type={category}>
        {category === 'income' ? (
          <HiArrowTrendingUp />
        ) : (
          <HiArrowTrendingDown />
        )}
      </Category>
      <Date>
        {capitalizeFirstLetter(formatDateToRelative(transactionDate))}
      </Date>
      <Amount type={category}>{formatCurrency(amount)}</Amount>
      <Description>{description}</Description>
    </StyledList>
  );
}

export default TableList;
