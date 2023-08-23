import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utilities/config';
import { styled } from 'styled-components';
import Paragraph from './Paragraph';
import { ButtonContainer } from './ButtonContainer';
import { HiMiniArrowSmallLeft, HiMiniArrowSmallRight } from 'react-icons/hi2';

const StyledPagination = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  justify-content: space-between;
`;

const PagnationButton = styled.button`
  font-family: inherit;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 2.5rem;

  display: flex;
  background-color: var(--color-card-bg);
  cursor: not-allowed;
  transition: all 0.3s;

  &:not(:disabled) {
    cursor: pointer;
    background-color: var(--color-light-accent);

    & svg {
      color: var(--color-text);
    }

    &:hover {
      background-color: var(--color-main);
    }
  }
  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-light-accent);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page') ? 1 : +searchParams.get('page');
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function previousPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  const startPageRange = (currentPage - 1) * PAGE_SIZE + 1;
  const endPageRange =
    currentPage === pageCount ? count : currentPage * PAGE_SIZE;

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <Paragraph size="small">
        Showing <span>{startPageRange}</span> to <span>{endPageRange}</span> of{' '}
        <span>{count}</span>
      </Paragraph>
      <ButtonContainer>
        <PagnationButton onClick={previousPage} disabled={currentPage === 1}>
          <HiMiniArrowSmallLeft />
        </PagnationButton>
        <PagnationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <HiMiniArrowSmallRight />
        </PagnationButton>
      </ButtonContainer>
    </StyledPagination>
  );
}

export default Pagination;
