import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { styled } from 'styled-components';

const ChartBox = styled.div`
  border-top: 1px solid var(--color-light-accent);
  border-bottom: 1px solid var(--color-light-accent);
  padding: 1rem 0;
  margin-bottom: 2rem;
  background-color: var(--color-bg);

  max-height: 100%;
  overflow: hidden;
`;

function OccupancyStatusChart({ properties }) {
  const numProperties = properties.length;
  const numOccupied = properties.filter(
    (property) => property.occupancyStatus === 'occupied'
  ).length;
  const numPartiallyOccupied = properties.filter(
    (property) => property.occupancyStatus === 'partially-occupied'
  ).length;
  const numVacant = properties.filter(
    (property) => property.occupancyStatus === 'vacant'
  ).length;

  const occupiedPercentage = Math.round((numOccupied / numProperties) * 100);
  const partiallyOccupiedPercentage = Math.round(
    (numPartiallyOccupied / numProperties) * 100
  );
  const vacantPercentage = Math.round((numVacant / numProperties) * 100);

  const data = [
    { name: 'Fully Occupied', value: occupiedPercentage },
    { name: 'Partially Occupied', value: partiallyOccupiedPercentage },
    { name: 'Vacant', value: vacantPercentage },
  ];
  const labelFormatter = (value) => {
    return `${value}%`;
  };

  const colors = [
    'var(--color-main)',
    'var(--color-tertiary)',
    'var(--color-secondary)',
  ];
  return (
    <ChartBox>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="50%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} stroke="none" />
            ))}
          </Pie>
          <Tooltip formatter={labelFormatter} />
          <Legend
            verticalAlign="middle"
            align="right"
            width="20%"
            layout="vertical"
            iconSize={8}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default OccupancyStatusChart;
