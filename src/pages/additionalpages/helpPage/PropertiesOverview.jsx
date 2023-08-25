import { StyledContent } from './ui/StyledContent';
import { Title } from './ui/Title';
import { Section } from './ui/Section';
import { StyledParagraph } from './ui/StyledParagraph';

function PropertiesOverview() {
  return (
    <StyledContent>
      <Title>
        <h3>
          <strong>Properties Section:</strong>
        </h3>
        <StyledParagraph>
          Efficient Property Management Made Easy
        </StyledParagraph>
      </Title>
      <Section>
        <h4>1. Property Overview Cards</h4>
        <StyledParagraph>
          All your properties are neatly presented in the Properties section.
          Each property is represented by a card displaying essential
          information: the expected rental income, property name, and its
          occupancy status.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>2. Property Filtering</h4>
        <StyledParagraph>
          Effortlessly locate properties using the filtering options. You can
          narrow down your view by property category—houses or apartment
          buildings. Additionally, you can filter by occupancy status,
          categorizing properties as vacant, partially occupied, or fully
          occupied.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>3. Adding New Properties</h4>
        <StyledParagraph>
          Initiate property addition with ease. Click on the &quot;Add
          Property&quot; button to access the property creation form. This form
          gathers fundamental property information, including the property name,
          category (house or apartment building), address, amenities, and up to
          four property images.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>4. Property Creation for Houses</h4>
        <StyledParagraph>
          For houses, input the expected rental income. Houses are typically
          single-unit properties, so they can have only one tenant. After a new
          house property is created, it is marked as vacant. If the property is
          rented, a tenant can be added to it.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>5. Property Creation for Apartment Buildings</h4>
        <StyledParagraph>
          For apartment buildings, users can add property details, leading to a
          form where they can create apartments. Each apartment&lsquo;s name,
          rental cost, and occupancy status can be specified. The system
          automatically calculates rental income when apartments are filled.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>6. Managing Apartment Details</h4>
        <StyledParagraph>
          When detailing apartments, users can input tenant information for
          occupied apartments, including tenant details and paid amount. Users
          can also manage vacant apartments, filling them with tenants whenever
          needed.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>7. Tenant Management</h4>
        <StyledParagraph>
          For both houses and apartments, tenants can be added to vacant
          properties. However, tenants cannot be removed from occupied
          properties until their lease expires. Lease renewal and updating rent
          are only possible when the property is vacant or the lease term is
          over.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>8. Property Details Modification</h4>
        <StyledParagraph>
          Users retain the flexibility to edit property information. This
          includes updating the property name, address, amenities, and images.
          Additionally, users can delete properties they no longer manage.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>9. Income Comparison</h4>
        <StyledParagraph>
          Each property&lsquo;s detailed view showcases the total expected
          rental income compared against the actual rental income generated.
          This feature provides a comprehensive understanding of the
          property&lsquo;s financial performance.
        </StyledParagraph>
      </Section>
      <Section>
        <StyledParagraph>
          Neighbourly streamlines property management by facilitating property
          addition, tenant management, and comprehensive property tracking. This
          robust tool helps you effectively manage a diverse range of
          residential properties, optimizing your management efficiency.
        </StyledParagraph>
      </Section>
    </StyledContent>
  );
}

export default PropertiesOverview;
