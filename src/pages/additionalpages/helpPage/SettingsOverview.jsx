import { StyledContent } from './ui/StyledContent';
import { Title } from './ui/Title';
import { Section } from './ui/Section';
import { StyledParagraph } from './ui/StyledParagraph';
import { useScrollToTop } from '../../../hooks/useScrollToTop';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';

function SettingsOverview() {
  useScrollToTop();
  useDocumentTitle('Getting started with your Settings');
  return (
    <StyledContent>
      <Title>
        <h3>
          <strong>Settings:</strong>
        </h3>
        <StyledParagraph>
          Personalize Your Experience and Manage Account Details
        </StyledParagraph>
      </Title>
      <Section>
        <h4>1. Personalization Options</h4>
        <StyledParagraph>
          Make the app your own by adjusting the display mode. Users have the
          flexibility to toggle between light mode and dark mode, enhancing
          readability and user comfort.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>2. Updating User Profile</h4>
        <StyledParagraph>
          Keep your account information up to date. Users can edit their full
          names, ensuring that their profile accurately reflects their identity.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>3. Avatar Customization</h4>
        <StyledParagraph>
          Add a personal touch to your profile. Neighbourly allows users to
          change their avatars, providing a visual representation that resonates
          with them.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>4. Email Address Management</h4>
        <StyledParagraph>
          Note that Neighbourly prioritizes security. For email addresses linked
          to user accounts, this information is treated as permanent and cannot
          be altered. This ensures the integrity of user accounts.
        </StyledParagraph>
      </Section>
      <Section>
        <h4>5. Password Management</h4>
        <StyledParagraph>
          User password management varies based on sign-up method:
        </StyledParagraph>
        <ul>
          <li>
            <StyledParagraph>
              For users who have registered with their email and password, they
              have the option to update their password if desired. This feature
              empowers them to enhance their account&lsquo;s security.
            </StyledParagraph>
          </li>
          <li>
            <StyledParagraph>
              For users who have chosen to sign up with Google, their password
              is directly linked to their Google account. Consequently, they are
              unable to change their password through the Neighbourly app.
            </StyledParagraph>
          </li>
        </ul>
      </Section>
      <Section>
        <h4>6. Account Management</h4>
        <StyledParagraph>
          Neighbourly&lsquo;s settings offer a space to customize and manage
          your account according to your preferences. These features enable you
          to tailor the app to your liking and ensure that your account
          information remains accurate and up to date.
        </StyledParagraph>
      </Section>
      <Section>
        <StyledParagraph>
          The Settings section is designed to provide users with control over
          their Neighbourly experience, ensuring ease of use and personalized
          interaction with the app.
        </StyledParagraph>
      </Section>
    </StyledContent>
  );
}

export default SettingsOverview;
