import { format, isSameDay } from 'date-fns';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { styled } from 'styled-components';

const FinanceChartBox = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;

  /* background-color: var(--color-card-bg); */
`;

function FinanceChart({ records }) {
  const dateSet = new Set(records.map((record) => record.transactionDate));
  const allDates = Array.from(dateSet)
    .map((date) => new Date(date))
    .sort((a, b) => a - b);

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      Income:
        records
          .filter(
            (record) =>
              record.category === 'income' &&
              isSameDay(date, new Date(record.transactionDate))
          )
          .reduce((acc, cur) => acc + cur.amount, 0) / 1000000,
      Expenses:
        records
          .filter(
            (record) =>
              record.category === 'expenses' &&
              isSameDay(date, new Date(record.transactionDate))
          )
          .reduce((acc, cur) => acc + cur.amount, 0) / 1000000,
    };
  });

  const labelFormatter = (value) => {
    return `NGN ${value}M`;
  };

  const colors = {
    income: 'var(--color-main)',
    expenses: 'var(--color-danger)',
    text: 'var(--color-text)',
    background: 'var(--color-bg)',
  };

  return (
    <FinanceChartBox>
      <ResponsiveContainer height={400} width="100%">
        <BarChart width={500} height={300} data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="M"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip formatter={labelFormatter} />
          <Bar dataKey="Income" fill={colors.income} />
          <Bar dataKey="Expenses" fill={colors.expenses} />
          <Legend
            verticalAlign="middle"
            align="right"
            width="20%"
            layout="vertical"
            iconSize={8}
            iconType="circle"
          />
        </BarChart>
      </ResponsiveContainer>
    </FinanceChartBox>
  );
}

export default FinanceChart;
