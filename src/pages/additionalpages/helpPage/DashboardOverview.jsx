import { StyledContent } from './ui/StyledContent';
import { Title } from './ui/Title';
import { Section } from './ui/Section';
import { StyledParagraph } from './ui/StyledParagraph';

function DashboardOverview() {
  return (
    <StyledContent>
      <Title>
        <h3>
          <strong>Dashboard Overview:</strong>
        </h3>
        <StyledParagraph>Managing Your Properties at a Glance</StyledParagraph>
      </Title>
      <Section>
        <h4>1. Property Overview</h4>
        <StyledParagraph>
          Gain immediate insights into your property portfolio. The dashboard
          prominently displays the total number of properties under your
          management, giving you a quick snapshot of your real estate holdings.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>2. Rental Income Tracker</h4>
        <StyledParagraph>
          Effortlessly monitor your rental income. The rental income tracker
          calculates the total rental income generated exclusively from rent
          payments. This gives you a clear understanding of the revenue stream
          derived solely from renting out properties.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>3. Tenant Count and Occupancy Rate</h4>
        <StyledParagraph>
          Stay informed about tenant statistics and property occupancy. The
          dashboard showcases the total number of tenants across all your
          properties. Moreover, the occupancy rate feature calculates the ratio
          of currently occupied properties against the total properties in your
          portfolio.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>4. Recent Financial Transactions</h4>
        <StyledParagraph>
          Stay up-to-date with your financial activities. The notification panel
          provides you with a chronological view of recent financial
          transactions. It covers transactions from the present date back to the
          past week, ensuring you have a comprehensive view of recent money
          flows.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>5. Financial Summary Panel</h4>
        <StyledParagraph>
          Monitor your financial health in real time. The financial summary
          panel provides a snapshot of the total income earned, the total
          expenses incurred, and subsequently, the net income generated. This
          instant overview helps you understand your profitability at a glance.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>6. Occupancy Summary Chart</h4>
        <StyledParagraph>
          Visualize property occupancy patterns effectively. The occupancy
          summary chart presents a breakdown of property statuses, indicating
          fully occupied, partially occupied, and vacant properties.
          Specifically, the &quot;partially occupied&quot; category pertains to
          apartment buildings with apartments having varying occupancy levels.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>7. Income vs Expenses Bar Chart</h4>
        <StyledParagraph>
          Track financial trends over time. The income vs expenses bar chart
          offers a dynamic representation of your financial performance. It
          allows you to visualize the relationship between total income and
          total expenses for specific dates or time periods. This visual aids
          you in identifying spending patterns and their impacts on income.
        </StyledParagraph>
      </Section>
      <Section>
        <StyledParagraph>
          With the Neighbourly dashboard, you&lsquo;re equipped with a
          comprehensive view of your property management operations. These
          detailed metrics, notifications, and charts enable you to make
          informed decisions, optimize your portfolio, and navigate your
          property management journey with ease.
        </StyledParagraph>
      </Section>
    </StyledContent>
  );
}

export default DashboardOverview;
