import { StyledContent } from './ui/StyledContent';
import { Title } from './ui/Title';
import { Section } from './ui/Section';
import { StyledParagraph } from './ui/StyledParagraph';

function GettingStarted() {
  return (
    <StyledContent>
      <Title>
        <h3>
          <strong>Getting Started with Neighbourly</strong>
        </h3>
        <StyledParagraph>
          Your Online Property Management Solution
        </StyledParagraph>
      </Title>
      <Section>
        <StyledParagraph>
          Welcome to Neighbourly, your comprehensive online property management
          app! This guide will walk you through the essential steps for setting
          up and navigating the app to effectively manage your properties,
          tenants, and finances. Let&lsquo;s dive in:
        </StyledParagraph>
      </Section>
      <Section>
        <h4>1. Accessing Neighbourly</h4>
        <StyledParagraph>
          <strong>1.1 Access the Web App:</strong> To begin, open your preferred
          web browser and navigate to the Neighbourly web app by entering the
          URL provided to you.
        </StyledParagraph>
        <StyledParagraph>
          <strong>1.2 Account Creation:</strong> If you&lsquo;re a new user,
          click on the &quot;Sign Up&quot; link to create your Neighbourly
          account. Provide your email address and create a strong password to
          proceed.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>2. Exploring the Dashboard</h4>
        <StyledParagraph>
          <strong>2.1 Logging In:</strong> Upon account creation, use your
          registered email and password to log in to the Neighbourly web app.
        </StyledParagraph>
        <StyledParagraph>
          <strong>2.2 Dashboard Overview:</strong> The dashboard is your
          app&lsquo;s central hub. It offers a snapshot of key information,
          including recent activity, occupancy rates, and recent financial
          transactions.
        </StyledParagraph>
        <StyledParagraph>
          <strong>2.3 Navigation:</strong> Use the navigation menu, typically
          located at the top or side of the screen, to access various sections
          of the app: Properties, Tenants, and Finance.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>3. Managing Your Properties</h4>
        <StyledParagraph>
          <strong>3.1 Adding Properties:</strong> To start managing your
          properties, click on the &quot;Properties&quot; section in the
          navigation menu and select &quot;Add Property.&quot; Input property
          details such as name, address, and type.
        </StyledParagraph>
        <StyledParagraph>
          <strong>3.2 Property Details:</strong> Once a property is added, you
          can view and edit its details at any time. Upload property photos, set
          rent amounts, and add tenants to properties.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>4. Managing Tenants</h4>
        <StyledParagraph>
          <strong>4.1 Adding Tenants:</strong> Navigate to the
          &quot;Tenants&quot; section to view added tenants, please note that
          tenants are added to properties in the properties panel and can be
          tracked in the tenants panel which provides a simple way to track and
          manage all tenants.
        </StyledParagraph>
        <StyledParagraph>
          <strong>4.2 Tracking tenants</strong> The tenants panel provides
          details of all tenants, the properties they are renting, owing
          tenants, and tenants with expired leases.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>5. Handling Finances</h4>
        <StyledParagraph>
          <strong>5.1 Income and Expenses:</strong> Navigate to the
          &quot;Finance&quot; section to meticulously monitor your financial
          activities. This is where you can record various financial aspects,
          including expenses for maintenance, utilities, and additional income
          sources such as service charges.
        </StyledParagraph>
        <StyledParagraph>
          <strong>5.2 Automated Rent Payment Recording:</strong> A crucial note:
          Rent payments are a special case. They should <strong>not</strong> be
          manually entered. Instead, the system intelligently and automatically
          records rent payments when a tenant is assigned to a property. This
          process is designed to maintain the utmost data accuracy without
          requiring your manual intervention.
        </StyledParagraph>
        <StyledParagraph>
          <strong>5.3 Recording Additional Income and Expenses:</strong> In the
          finance panel, you have the ability to manually input other income
          sources and expenses beyond rent payments. This comprehensive approach
          ensures you have a complete financial snapshot of your property
          management activities.
        </StyledParagraph>
        <StyledParagraph>
          Rest assured, Neighbourly streamlines your financial management by
          automatically handling rent payments, allowing you to focus on other
          important aspects of property management.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>6. Automatic Data Backup</h4>
        <StyledParagraph>
          <strong>6.1 Data Security:</strong> Rest assured, your data is
          automatically backed up through Supabase, ensuring you never lose
          important information.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>7. Support and Feedback</h4>
        <StyledParagraph>
          <strong>7.1. Help Resources:</strong> If you encounter any challenges
          or have inquiries, head to the &quot;Help&quot; section within the
          app.
        </StyledParagraph>
      </Section>
      <Section>
        <StyledParagraph>
          You&lsquo;ve successfully completed the initial setup of Neighbourly
          and are ready to enhance your property management experience.
          Remember, you can always refer back to this guide or reach out to our
          support team if you need assistance.
        </StyledParagraph>
        <StyledParagraph>
          Enjoy the convenience of managing your properties with Neighbourly!
          🏠📊👥
        </StyledParagraph>
      </Section>
    </StyledContent>
  );
}

export default GettingStarted;
