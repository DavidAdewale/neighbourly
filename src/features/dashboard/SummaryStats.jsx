import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineUser,
} from 'react-icons/hi2';
import { css, styled } from 'styled-components';
import Paragraph from '../../ui/Paragraph';
import { formatCurrency } from '../../utilities/helpers';
import { useNavigate } from 'react-router-dom';

const StatContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  /* justify-content: space-between; */
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-bg);
  gap: 1rem;
  min-width: 20rem;
  padding: 2rem 2rem;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--color-card-bg);

  &:hover {
    background-color: var(--color-form-input-focus);
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  border-radius: 30rem;

  & svg {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-btn-text);
  }

  ${({ type }) =>
    type === 'properties' &&
    css`
      background-color: var(--color-green);
    `}

  ${({ type }) =>
    type === 'rent' &&
    css`
      background-color: var(--color-purple);
    `}

    ${({ type }) =>
    type === 'tenants' &&
    css`
      background-color: var(--color-blue);
    `}

    ${({ type }) =>
    type === 'occupancy' &&
    css`
      background-color: var(--color-orange);
    `}
`;

const StatValues = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & p {
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }

  & h3 {
    font-size: 1.5rem;
  }
`;

const Title = styled.p`
  font-size: 1.05rem;
`;

function SummaryStats({ summaryData }) {
  const navigate = useNavigate();
  const { numProperties, totalRent, numTenants, overallOccupancyRate } =
    summaryData;

  const occupancyRate = Math.round(overallOccupancyRate);
  return (
    <StatContainer>
      <StatCard onClick={() => navigate('/properties')}>
        <Icon type="properties">
          <HiOutlineBriefcase />
        </Icon>
        <StatValues>
          <Title size="small">properties</Title>
          <h3>{numProperties}</h3>
        </StatValues>
      </StatCard>
      <StatCard onClick={() => navigate('/finances')}>
        <Icon type="rent">
          <HiOutlineBanknotes />
        </Icon>
        <StatValues>
          <Title size="small">rental income</Title>
          <h3>{formatCurrency(totalRent)}</h3>
        </StatValues>
      </StatCard>
      <StatCard onClick={() => navigate('/tenants')}>
        <Icon type="tenants">
          <HiOutlineUser />
        </Icon>
        <StatValues>
          <Title size="small">Tenants</Title>
          <h3>{numTenants}</h3>
        </StatValues>
      </StatCard>
      <StatCard onClick={() => navigate('/properties')}>
        <Icon type="occupancy">
          <HiOutlineChartBar />
        </Icon>
        <StatValues>
          <Title size="small">occupancy rate</Title>
          <h3>{occupancyRate}%</h3>
        </StatValues>
      </StatCard>
    </StatContainer>
  );
}

export default SummaryStats;
