import { StyledContent } from './ui/StyledContent';
import { Title } from './ui/Title';
import { Section } from './ui/Section';
import { StyledParagraph } from './ui/StyledParagraph';

function FinanceOverview() {
  return (
    <StyledContent>
      <Title>
        <h3>
          <strong>Finances Section:</strong>
        </h3>
        <StyledParagraph>
          In-Depth Financial Insights at Your Fingertips
        </StyledParagraph>
      </Title>
      <Section>
        <h4>1. Property Finance Cards</h4>
        <StyledParagraph>
          The Finances section provides individual finance cards for each
          property. When you click on a finance card, you&lsquo;re granted a
          comprehensive view of all financial records associated with that
          property.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>2. Automated Rent Entries</h4>
        <StyledParagraph>
          Rent payments are seamlessly logged for you. The system automatically
          records rent payments as tenants pay, ensuring your records are
          up-to-date without manual intervention.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>3. Adding Income and Expense Records</h4>
        <StyledParagraph>
          Expand your financial records using the &quot;Add Entry&quot; button.
          This leads to a form where you can specify whether the record is an
          income or an expense. Additionally, input the transaction date,
          amount, and a brief description of the transaction.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>4. Record Filtering and Sorting</h4>
        <StyledParagraph>
          Efficiently navigate records with various filters and sorting options.
          You can filter records based on income or expenses, sort them by date
          or amount, and the default view is yearly. However, you can customize
          the view to show records for the past quarter, past 6 months, 2 years,
          5 years, or all records associated with the property.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>5. Overview of Financial Status</h4>
        <StyledParagraph>
          Each property&lsquo;s finance page offers an at-a-glance overview of
          your financial health. It displays the total income, total expenses,
          and calculates the net income generated by the property.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>6. Insightful Financial Records</h4>
        <StyledParagraph>
          By offering detailed records and filtering options, Neighbourly
          ensures you have a thorough understanding of your property&lsquo;s
          financial performance. This feature-rich section allows you to keep
          your financial management precise and organized.
        </StyledParagraph>
      </Section>

      <Section>
        <StyledParagraph>
          Neighbourly empowers you to manage your property&lsquo;s financial
          aspects meticulously, with automated rent recording, record addition,
          insightful filters, and an overview of your financial situation right
          at your fingertips
        </StyledParagraph>
      </Section>
    </StyledContent>
  );
}

export default FinanceOverview;
