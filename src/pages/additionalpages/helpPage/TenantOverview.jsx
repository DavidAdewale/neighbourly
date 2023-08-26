import { StyledContent } from './ui/StyledContent';
import { Title } from './ui/Title';
import { Section } from './ui/Section';
import { StyledParagraph } from './ui/StyledParagraph';
import { useScrollToTop } from '../../../hooks/useScrollToTop';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';

function TenantOverview() {
  useScrollToTop();
  useDocumentTitle('Getting start with Properties');

  return (
    <StyledContent>
      <Title>
        <h3>
          <strong>Tenants Section:</strong>
        </h3>
        <StyledParagraph>
          Comprehensive Tenant Management and Insights
        </StyledParagraph>
      </Title>
      <Section>
        <h4>1. Tenant Overview</h4>
        <StyledParagraph>
          The Tenants section serves as a central hub for managing tenants
          across your properties. While you can&lsquo;t add tenants here, you
          gain valuable insights into your tenants&lsquo; status and
          information.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>2. Tenant Details</h4>
        <StyledParagraph>
          View a comprehensive snapshot of your tenants. You can see their
          respective apartment (if applicable), email addresses, total amount
          paid, lease duration, and current occupancy status.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>3. Tenant Filtering</h4>
        <StyledParagraph>
          Navigate tenants effectively with advanced filtering options. You can
          sort tenants based on property categories, helping you quickly
          identify residents in houses or apartment buildings.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>4. Lease Expiry Notifications</h4>
        <StyledParagraph>
          Stay proactive with lease management. Neighbourly offers the ability
          to filter tenants whose leases are nearing expiry (within 1 to 6
          months) and those whose leases have already expired. This feature
          ensures you&lsquo;re prepared for lease renewals or transitions.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>5. Tenant Details and Actions</h4>
        <StyledParagraph>
          For each tenant, you can access a detailed view that includes their
          lease information, contact details, and payment history. This
          comprehensive insight allows you to make informed decisions regarding
          lease renewals or terminations.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>6. Tenant Renewals and Removals</h4>
        <StyledParagraph>
          Manage your tenants efficiently. From the tenant details view, you can
          quickly renew a tenant&lsquo;s lease if it&lsquo;s up for renewal.
          Likewise, if a tenant&lsquo;s lease has expired or they&lsquo;re
          moving out, you have the option to remove them from the property.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>7. Property-Specific Tenant Management</h4>
        <StyledParagraph>
          Remember, tenant additions can only be performed in the Property
          section. This ensures that tenants are accurately associated with the
          right properties. From there, you can link each tenant to their
          respective apartment or house.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>8. Holistic Tenant Insights</h4>
        <StyledParagraph>
          Collectively, the Tenants section offers holistic insights into your
          tenants&lsquo; situations and helps you maintain transparent,
          efficient tenant management practices.
        </StyledParagraph>
      </Section>
      <Section>
        <StyledParagraph>
          Neighbourly empowers you with an in-depth understanding of your
          tenants&lsquo; statuses and enables swift actions, ensuring your
          property management remains smooth and organized.
        </StyledParagraph>
      </Section>
    </StyledContent>
  );
}

export default TenantOverview;
