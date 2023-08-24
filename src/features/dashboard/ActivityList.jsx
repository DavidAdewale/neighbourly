import { css, styled } from 'styled-components';
import {
  capitalizeFirstLetter,
  formatCurrency,
  formatDateToRelative,
} from '../../utilities/helpers';
import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const Activity = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1.5fr 2fr 0.5fr;
  padding: 1rem 2rem;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 37.5em) {
    display: flex;
    flex-direction: column;
  }

  &:hover {
    background-color: var(--color-form-input-focus);
  }
`;

const Icon = styled.div`
  & svg {
    width: 2rem;
    height: 2rem;
  }

  ${({ type }) =>
    type === 'income' &&
    css`
      & svg {
        color: var(--color-main);
      }
    `}

  ${({ type }) =>
    type === 'expenses' &&
    css`
      & svg {
        color: var(--color-danger);
      }
    `}
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

const Description = styled.p`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function ActivityList({ activity }) {
  const { id, property_id, category, amount, description, transactionDate } =
    activity;
  const navigate = useNavigate();

  return (
    <Activity onClick={() => navigate(`/finances/${property_id}/entry/${id}`)}>
      <Icon type={category}>
        {category === 'income' ? (
          <HiOutlineArrowTrendingUp />
        ) : (
          <HiOutlineArrowTrendingDown />
        )}
      </Icon>
      <Description>{description}</Description>
      <Amount type={category}>{formatCurrency(amount)}</Amount>
      <p>{capitalizeFirstLetter(formatDateToRelative(transactionDate))}</p>
    </Activity>
  );
}

export default ActivityList;
