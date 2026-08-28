/**
 * Loople Privacy Policy body copy, with internal and provider links.
 */

import {
  LegalH2,
  LegalH3,
  LegalLink,
  LegalList,
  LegalMailLink,
  LegalParagraph,
} from '@/components/legal/LegalProse';

const PROVIDER = {
  supabase: 'https://supabase.com/privacy',
  stripe: 'https://stripe.com/privacy',
  resend: 'https://resend.com/legal/privacy-policy',
  posthog: 'https://posthog.com/privacy',
  vercel: 'https://vercel.com/legal/privacy-policy',
  sentry: 'https://sentry.io/privacy/',
  google: 'https://policies.google.com/privacy',
  googlePermissions: 'https://myaccount.google.com/permissions',
  googleApiPolicy: 'https://developers.google.com/terms/api-services-user-data-policy',
  apple: 'https://www.apple.com/legal/privacy/',
  expo: 'https://expo.dev/privacy',
  openai: 'https://openai.com/policies/privacy-policy',
} as const;

const InformationWeCollect = () => (
  <section aria-labelledby="information-we-collect">
    <LegalH2 id="information-we-collect">1. Information We Collect</LegalH2>
    <LegalParagraph>
      The information we collect depends on how you use Loople, which communities you belong to, and
      which features are used.
    </LegalParagraph>

    <LegalH3 id="account-and-profile">A. Account and Profile Information</LegalH3>
    <LegalParagraph>
      When you create or use a Loople account, we may collect information such as:
    </LegalParagraph>
    <LegalList>
      <li>Name</li>
      <li>Email address</li>
      <li>Display name or handle</li>
      <li>Profile photo or avatar</li>
      <li>Bio or other profile information you choose to provide</li>
      <li>Account identifiers</li>
      <li>Authentication information and login-related records</li>
      <li>Account status and role information</li>
    </LegalList>
    <LegalParagraph>
      Loople currently supports passwordless email authentication using one-time codes,{' '}
      <LegalLink href="#google-sign-in">Google Sign-In</LegalLink>, and{' '}
      <LegalLink href="#sign-in-with-apple">Sign in with Apple</LegalLink> on supported Apple
      devices.
    </LegalParagraph>

    <LegalH3 id="family-and-dependents">B. Family and Dependent Information</LegalH3>
    <LegalParagraph>
      Loople allows parents and guardians to create dependent profiles connected to a family
      account.
    </LegalParagraph>
    <LegalParagraph>
      Depending on how the Services are used, dependent information may include:
    </LegalParagraph>
    <LegalList>
      <li>Name</li>
      <li>Date of birth</li>
      <li>Profile image</li>
      <li>Family or guardian relationship</li>
      <li>Community memberships</li>
      <li>Program participation</li>
      <li>Registration information and answers</li>
      <li>Posts, messages, or other content if the dependent later receives login access</li>
    </LegalList>
    <LegalParagraph>
      A parent or guardian creates the dependent profile and controls whether an eligible teenager
      receives login access.
    </LegalParagraph>
    <LegalParagraph>
      Children under 13 do not receive independent Loople login access in the current product. They
      may exist as dependent profiles managed by a parent or guardian. See{' '}
      <LegalLink href="#childrens-privacy">Children&apos;s Privacy</LegalLink> and{' '}
      <LegalLink href="#teen-accounts">Teen Accounts, Guardians, and Messaging</LegalLink>.
    </LegalParagraph>
    <LegalParagraph>
      Teenagers ages 13 through 17 may receive login access only after a parent or guardian
      explicitly invites or enables them.
    </LegalParagraph>

    <LegalH3 id="community-and-membership">C. Community and Membership Information</LegalH3>
    <LegalParagraph>
      When you join or participate in a community, Loople may process information such as:
    </LegalParagraph>
    <LegalList>
      <li>Community memberships</li>
      <li>Roles within a community</li>
      <li>Program enrollments</li>
      <li>Event participation</li>
      <li>Registration records</li>
      <li>Attendance-related records</li>
      <li>Volunteer signups or activity</li>
      <li>Waiver acceptance</li>
      <li>Payment-related records</li>
      <li>Historical membership status</li>
    </LegalList>
    <LegalParagraph>
      Leaving or being removed from a community does not necessarily delete historical records that
      the organization reasonably needs to retain, such as prior registrations, payments,
      enrollments, volunteer records, or waiver acceptances. See{' '}
      <LegalLink href="#data-retention">Data Retention</LegalLink>.
    </LegalParagraph>

    <LegalH3 id="organization-registration">
      D. Organization-Created Registration Information
    </LegalH3>
    <LegalParagraph>
      Organizations using Loople can create custom registration questions. Depending on the
      organization, those questions may request additional information such as emergency-contact
      information, shirt size, allergies, or other information relevant to the program or activity.
    </LegalParagraph>
    <LegalParagraph>
      Loople does not decide what every organization should ask.{' '}
      <LegalLink href="#how-organizations-use-information">Organizations</LegalLink> are responsible
      for determining whether their custom questions are appropriate, necessary, and lawful.
    </LegalParagraph>
    <LegalParagraph>
      Organizations must not use Loople custom fields to collect passwords, full payment-card
      numbers, Social Security numbers, or unnecessary government identification numbers.
    </LegalParagraph>

    <LegalH3 id="messages-and-content">E. Messages and User-Generated Content</LegalH3>
    <LegalParagraph>
      Loople includes community and communication features. We may process content such as:
    </LegalParagraph>
    <LegalList>
      <li>Community posts</li>
      <li>Comments and replies</li>
      <li>Direct messages</li>
      <li>Group messages</li>
      <li>Profile images</li>
      <li>Photos posted to community feeds</li>
      <li>Files and documents</li>
      <li>Event, program, and community content created by administrators</li>
    </LegalList>
    <LegalParagraph>
      Users and organizations retain ownership of the content they submit, subject to the rights
      needed for Loople to host, process, transmit, display, store, moderate, and otherwise operate
      the Services.
    </LegalParagraph>
    <LegalParagraph>
      Community administrators do not have general access to private direct messages simply because
      they are administrators.
    </LegalParagraph>
    <LegalParagraph>
      Loople may review specific communications or content when reasonably necessary to investigate
      a report, protect users, enforce our <LegalLink href="/terms">Terms</LegalLink>, prevent
      abuse, comply with law, or address a safety concern.
    </LegalParagraph>

    <LegalH3 id="payments-and-transactions">F. Payments and Transaction Information</LegalH3>
    <LegalParagraph>
      Organizations may connect their own Stripe accounts through Stripe Connect. Members may use
      Loople-powered checkout to pay charges such as dues or program registrations.
    </LegalParagraph>
    <LegalParagraph>
      <LegalLink href={PROVIDER.stripe} external>
        Stripe
      </LegalLink>{' '}
      handles payment-card credentials. Loople does not intend to store raw credit-card numbers.
    </LegalParagraph>
    <LegalParagraph>
      Loople may receive and store transaction information needed to operate and support payments,
      such as:
    </LegalParagraph>
    <LegalList>
      <li>Payment identifiers</li>
      <li>Transaction status</li>
      <li>Amounts</li>
      <li>Fees</li>
      <li>Refund information</li>
      <li>Organization and user identifiers associated with the transaction</li>
      <li>Other payment metadata provided by Stripe</li>
    </LegalList>
    <LegalParagraph>
      Loople may collect a platform or service fee on qualifying Stripe Connect transactions.
    </LegalParagraph>

    <LegalH3 id="support-and-communications">G. Support and Communications</LegalH3>
    <LegalParagraph>
      If you contact us, we may collect the information you provide, including:
    </LegalParagraph>
    <LegalList>
      <li>Your name and contact information</li>
      <li>The contents of your message</li>
      <li>Screenshots, files, or other materials you provide</li>
      <li>Information about the issue you are reporting</li>
      <li>Communications between you and Loople</li>
    </LegalList>
    <LegalParagraph>
      You can also reach us through our <LegalLink href="/support">Support</LegalLink> page.
    </LegalParagraph>

    <LegalH3 id="device-usage-and-technical">H. Device, Usage, and Technical Information</LegalH3>
    <LegalParagraph>
      When you use the Services, we and our service providers may process technical and usage
      information such as:
    </LegalParagraph>
    <LegalList>
      <li>IP address</li>
      <li>Device and browser type</li>
      <li>Operating system</li>
      <li>App version</li>
      <li>Pages or screens viewed</li>
      <li>Feature usage</li>
      <li>Clicks and navigation activity</li>
      <li>Session and event data</li>
      <li>Error and crash information</li>
      <li>
        Approximate technical location derived from network information where provided by
        infrastructure services
      </li>
      <li>Push-notification tokens</li>
      <li>Other diagnostic information</li>
    </LegalList>
    <LegalParagraph>
      We currently use{' '}
      <LegalLink href={PROVIDER.posthog} external>
        PostHog
      </LegalLink>{' '}
      for product analytics,{' '}
      <LegalLink href={PROVIDER.vercel} external>
        Vercel Analytics
      </LegalLink>{' '}
      for production web analytics, and{' '}
      <LegalLink href={PROVIDER.sentry} external>
        Sentry
      </LegalLink>{' '}
      for error monitoring. See{' '}
      <LegalLink href="#analytics">Analytics and Similar Technologies</LegalLink>.
    </LegalParagraph>
    <LegalParagraph>
      We do not currently use Google Analytics, Meta Pixel, or advertising retargeting pixels in the
      product described by this policy.
    </LegalParagraph>

    <LegalH3 id="location-information">I. Location Information</LegalH3>
    <LegalParagraph>
      Loople does not continuously track your physical movements or use the Services to follow where
      you go in day-to-day life.
    </LegalParagraph>
    <LegalParagraph>
      The current product does not include GPS-based weather tracking or nearby-community discovery.
    </LegalParagraph>
    <LegalParagraph>
      Organizations may enter location information for programs or events as ordinary content, such
      as a venue name or address.
    </LegalParagraph>
  </section>
);

const GoogleSignIn = () => (
  <section aria-labelledby="google-sign-in">
    <LegalH2 id="google-sign-in">2. Google Sign-In and Google User Data</LegalH2>
    <LegalParagraph>
      Loople allows users to authenticate using{' '}
      <LegalLink href={PROVIDER.google} external>
        Google Sign-In
      </LegalLink>
      .
    </LegalParagraph>
    <LegalParagraph>
      When you choose Google Sign-In, Google may provide Loople with basic account information made
      available through the authentication flow, such as your name, email address, profile image,
      and a Google account identifier, depending on the information associated with your Google
      account and the permissions presented during authentication.
    </LegalParagraph>
    <LegalParagraph>Loople uses Google Sign-In information to:</LegalParagraph>
    <LegalList>
      <li>Authenticate you</li>
      <li>Create or connect your Loople account</li>
      <li>Maintain your signed-in account experience</li>
      <li>Help prevent unauthorized access and account abuse</li>
      <li>Provide the Services you request</li>
    </LegalList>
    <LegalParagraph>Loople does not sell Google user data.</LegalParagraph>
    <LegalParagraph>
      Loople does not use Google Sign-In data for third-party advertising.
    </LegalParagraph>
    <LegalParagraph>
      Loople does not use Google Sign-In data to train unrelated general-purpose
      artificial-intelligence models.
    </LegalParagraph>
    <LegalParagraph>
      We may store the account information needed to maintain your Loople account in our service
      infrastructure, including our authentication and database provider.
    </LegalParagraph>
    <LegalParagraph>
      We may share Google-derived account information with service providers only as reasonably
      necessary to provide, secure, maintain, or support Loople, or when required by law. See{' '}
      <LegalLink href="#share-with-service-providers">How We Share Personal Information</LegalLink>.
    </LegalParagraph>
    <LegalParagraph>
      Our use and transfer of information received from Google APIs will comply with applicable{' '}
      <LegalLink href={PROVIDER.googleApiPolicy} external>
        Google API Services User Data Policy
      </LegalLink>{' '}
      requirements.
    </LegalParagraph>
    <LegalParagraph>
      You can manage or revoke Loople&apos;s access to your Google account through your{' '}
      <LegalLink href={PROVIDER.googlePermissions} external>
        Google account settings
      </LegalLink>
      . Revoking Google access does not necessarily delete your Loople account or information
      already lawfully retained by Loople.
    </LegalParagraph>
  </section>
);

const SignInWithApple = () => (
  <section aria-labelledby="sign-in-with-apple">
    <LegalH2 id="sign-in-with-apple">3. Sign in with Apple</LegalH2>
    <LegalParagraph>Users of supported Apple devices may choose Sign in with Apple.</LegalParagraph>
    <LegalParagraph>
      Apple may provide Loople with information necessary to authenticate your account, such as an
      account identifier, name, and email address, depending on your Apple settings and whether you
      use Apple&apos;s private email relay feature. See{' '}
      <LegalLink href={PROVIDER.apple} external>
        Apple&apos;s Privacy Policy
      </LegalLink>
      .
    </LegalParagraph>
    <LegalParagraph>
      We use that information to authenticate you, create or connect your Loople account, maintain
      account security, and provide the Services.
    </LegalParagraph>
  </section>
);

const HowWeUse = () => (
  <section aria-labelledby="how-we-use-personal-information">
    <LegalH2 id="how-we-use-personal-information">4. How We Use Personal Information</LegalH2>
    <LegalParagraph>We may use personal information to:</LegalParagraph>
    <LegalList>
      <li>Create and maintain Loople accounts</li>
      <li>Authenticate users and secure accounts</li>
      <li>Connect family members and dependent profiles</li>
      <li>Manage community memberships</li>
      <li>
        Provide programs, events, registrations, waivers, volunteer tools, and related features
      </li>
      <li>Provide direct and group messaging</li>
      <li>Send community announcements and notifications</li>
      <li>Process payments and refunds through Stripe</li>
      <li>Provide community administration tools</li>
      <li>Maintain historical community records where appropriate</li>
      <li>Provide customer support</li>
      <li>Troubleshoot bugs and technical problems</li>
      <li>Analyze product usage and improve the user experience</li>
      <li>
        Detect, investigate, and respond to fraud, abuse, security incidents, or violations of our{' '}
        <LegalLink href="/terms">Terms</LegalLink>
      </li>
      <li>Protect minors and other users when a safety concern is reported or identified</li>
      <li>Enforce account, community, and platform restrictions</li>
      <li>Communicate about product features, changes, and updates</li>
      <li>Send marketing communications where permitted</li>
      <li>Comply with legal, tax, accounting, regulatory, and law-enforcement obligations</li>
      <li>Establish, exercise, or defend legal claims</li>
      <li>Protect Loople, our users, organizations, and the public</li>
    </LegalList>
    <LegalParagraph>
      We may also use information in aggregated or de-identified form where it can no longer
      reasonably identify an individual.
    </LegalParagraph>
  </section>
);

const HowOrganizationsUse = () => (
  <section aria-labelledby="how-organizations-use-information">
    <LegalH2 id="how-organizations-use-information">5. How Organizations Use Information</LegalH2>
    <LegalParagraph>Organizations use Loople to operate their own communities.</LegalParagraph>
    <LegalParagraph>
      Depending on the organization and your relationship with it, an authorized organization
      administrator may access information reasonably necessary to manage that community, such as:
    </LegalParagraph>
    <LegalList>
      <li>Your name and profile</li>
      <li>Your email address for administrative purposes</li>
      <li>Membership status</li>
      <li>Program participation</li>
      <li>Registration responses</li>
      <li>Payment status</li>
      <li>Volunteer activity</li>
      <li>Waiver acceptance</li>
      <li>Other information submitted to that organization</li>
    </LegalList>
    <LegalParagraph>
      Your email address is not displayed to ordinary members in the community directory.
    </LegalParagraph>
    <LegalParagraph>Age and date of birth are not publicly displayed by default.</LegalParagraph>
    <LegalParagraph>
      Organizations are responsible for their own membership decisions, programs, rules, waivers,
      safety procedures, staff, volunteers, refunds, custom questions, and real-world activities.
    </LegalParagraph>
    <LegalParagraph>
      If an authorized organization administrator exports information from Loople, such as a program
      roster or finance transaction report, the organization is responsible for the exported copy
      once it leaves Loople.
    </LegalParagraph>
    <LegalParagraph>
      If you have questions about why a particular organization collected information from you, you
      may need to contact that organization directly.
    </LegalParagraph>
  </section>
);

const TeenAccounts = () => (
  <section aria-labelledby="teen-accounts">
    <LegalH2 id="teen-accounts">6. Teen Accounts, Guardians, and Messaging</LegalH2>
    <LegalParagraph>
      Loople is designed to support family and community participation while giving parents and
      guardians control over teen access.
    </LegalParagraph>
    <LegalParagraph>In the current product:</LegalParagraph>
    <LegalList>
      <li>Dependents under 13 remain profile-only and cannot independently log in.</li>
      <li>
        Teenagers ages 13–17 may receive login access only after a parent or guardian explicitly
        enables or invites them.
      </li>
      <li>Guardian-controlled messaging settings may restrict teen messaging.</li>
      <li>
        Depending on the guardian&apos;s selected settings, teen messaging may be disabled, limited
        to family, or open with guardian supervision.
      </li>
      <li>
        In supervised teen-adult conversations, a guardian may be able to observe the conversation.
      </li>
      <li>Guardians may receive a notice when a teen begins a conversation with a new adult.</li>
    </LegalList>
    <LegalParagraph>
      Adults and teenagers may communicate for legitimate community purposes, including
      communication between coaches, directors, administrators, volunteers, and participants.
    </LegalParagraph>
    <LegalParagraph>
      Community administrators do not receive blanket access to private messages.
    </LegalParagraph>
    <LegalParagraph>
      Loople may review particular communications when reasonably necessary for safety
      investigations, abuse reports, legal obligations, or enforcement. We do not promise that every
      harmful, inappropriate, or unsafe communication will be detected.
    </LegalParagraph>
    <LegalParagraph>
      If you believe a child or teenager may be at risk through Loople, contact <LegalMailLink />.
    </LegalParagraph>
  </section>
);

const HowWeShare = () => (
  <section aria-labelledby="how-we-share-personal-information">
    <LegalH2 id="how-we-share-personal-information">7. How We Share Personal Information</LegalH2>
    <LegalParagraph>
      We may disclose personal information in the following circumstances.
    </LegalParagraph>

    <LegalH3 id="share-with-organizations">A. With Organizations You Participate In</LegalH3>
    <LegalParagraph>
      We share information with organizations as necessary to provide the community features you or
      the organization use. See{' '}
      <LegalLink href="#how-organizations-use-information">
        How Organizations Use Information
      </LegalLink>
      .
    </LegalParagraph>

    <LegalH3 id="share-with-other-users">B. With Other Users</LegalH3>
    <LegalParagraph>
      Information may be visible to other users when you choose to make it available through your
      profile, community participation, posts, comments, messages, or other social features.
    </LegalParagraph>
    <LegalParagraph>
      Member directories are designed to expose limited profile information rather than private
      account information.
    </LegalParagraph>

    <LegalH3 id="share-with-service-providers">C. With Service Providers</LegalH3>
    <LegalParagraph>
      We use third-party providers to operate Loople. Current providers include:
    </LegalParagraph>
    <LegalList>
      <li>
        <LegalLink href={PROVIDER.supabase} external>
          Supabase
        </LegalLink>{' '}
        for authentication, database services, and file storage
      </li>
      <li>
        <LegalLink href={PROVIDER.stripe} external>
          Stripe and Stripe Connect
        </LegalLink>{' '}
        for payments and community billing
      </li>
      <li>
        <LegalLink href={PROVIDER.resend} external>
          Resend
        </LegalLink>{' '}
        for transactional email
      </li>
      <li>
        <LegalLink href={PROVIDER.posthog} external>
          PostHog
        </LegalLink>{' '}
        for product analytics
      </li>
      <li>
        <LegalLink href={PROVIDER.vercel} external>
          Vercel
        </LegalLink>{' '}
        for hosting and production web analytics
      </li>
      <li>
        <LegalLink href={PROVIDER.sentry} external>
          Sentry
        </LegalLink>{' '}
        for error monitoring
      </li>
      <li>
        <LegalLink href={PROVIDER.google} external>
          Google
        </LegalLink>{' '}
        for Google Sign-In
      </li>
      <li>
        <LegalLink href={PROVIDER.apple} external>
          Apple
        </LegalLink>{' '}
        for Sign in with Apple and Apple push-notification infrastructure
      </li>
      <li>
        <LegalLink href={PROVIDER.expo} external>
          Expo
        </LegalLink>{' '}
        for mobile application and push-notification infrastructure
      </li>
      <li>
        <LegalLink href={PROVIDER.openai} external>
          OpenAI
        </LegalLink>{' '}
        for optional <LegalLink href="#avatar-generation">avatar image generation</LegalLink>
      </li>
    </LegalList>
    <LegalParagraph>
      These providers process information on our behalf or as necessary to provide their services to
      us.
    </LegalParagraph>

    <LegalH3 id="avatar-generation">D. Avatar Generation Using OpenAI</LegalH3>
    <LegalParagraph>
      Loople includes an optional feature that can create a stylized avatar from a photo you
      provide.
    </LegalParagraph>
    <LegalParagraph>
      If you use this feature, the photo you choose is sent to{' '}
      <LegalLink href={PROVIDER.openai} external>
        OpenAI
      </LegalLink>{' '}
      for image processing and generation.
    </LegalParagraph>
    <LegalParagraph>
      We use that processing to provide the avatar feature you requested. Private community messages
      and posts are not sent to OpenAI for general-purpose model training as part of this feature.
    </LegalParagraph>
    <LegalParagraph>
      If you do not use the avatar-generation feature, Loople does not need to send a photo to
      OpenAI for that purpose.
    </LegalParagraph>

    <LegalH3 id="legal-safety-enforcement">E. Legal, Safety, and Enforcement Reasons</LegalH3>
    <LegalParagraph>
      We may disclose information if we reasonably believe disclosure is necessary to:
    </LegalParagraph>
    <LegalList>
      <li>Comply with law, regulation, subpoena, court order, or legal process</li>
      <li>Respond to lawful government requests</li>
      <li>Investigate fraud, abuse, or security incidents</li>
      <li>
        Protect the rights, safety, or property of Loople, our users, organizations, or others
      </li>
      <li>
        Address suspected exploitation, grooming, harassment, threats, or other safety concerns
      </li>
      <li>
        Enforce our <LegalLink href="/terms">Terms</LegalLink> or other agreements
      </li>
    </LegalList>

    <LegalH3 id="business-transfers">F. Business Transfers</LegalH3>
    <LegalParagraph>
      If Loople is involved in a merger, acquisition, financing, reorganization, sale of assets, or
      similar transaction, personal information may be transferred as part of that transaction,
      subject to applicable law.
    </LegalParagraph>
  </section>
);

const RemainingSections = () => (
  <>
    <section aria-labelledby="do-not-sell">
      <LegalH2 id="do-not-sell">8. We Do Not Sell Personal Information</LegalH2>
      <LegalParagraph>
        Loople does not sell personal information to third parties for money.
      </LegalParagraph>
      <LegalParagraph>We do not sell private community content or messages.</LegalParagraph>
      <LegalParagraph>
        We do not use private community content or messages to train unrelated general-purpose AI
        models.
      </LegalParagraph>
      <LegalParagraph>
        We may use product analytics and service data to improve Loople and may tell existing users
        about Loople features or services.
      </LegalParagraph>
    </section>

    <section aria-labelledby="analytics">
      <LegalH2 id="analytics">9. Analytics and Similar Technologies</LegalH2>
      <LegalParagraph>
        We use analytics and diagnostic tools to understand how Loople is used, identify bugs,
        improve performance, and make product decisions.
      </LegalParagraph>
      <LegalParagraph>
        Current tools include{' '}
        <LegalLink href={PROVIDER.posthog} external>
          PostHog
        </LegalLink>
        ,{' '}
        <LegalLink href={PROVIDER.vercel} external>
          Vercel Analytics
        </LegalLink>
        , and{' '}
        <LegalLink href={PROVIDER.sentry} external>
          Sentry
        </LegalLink>
        .
      </LegalParagraph>
      <LegalParagraph>
        These services may process device, usage, session, event, and diagnostic information as
        configured in our implementation.
      </LegalParagraph>
      <LegalParagraph>
        We do not currently use Google Analytics, Meta Pixel, or advertising-retargeting pixels in
        the product covered by this policy.
      </LegalParagraph>
      <LegalParagraph>
        If we materially change our advertising or tracking practices, we will update this Privacy
        Policy and implement any consent or preference controls required by applicable law. See{' '}
        <LegalLink href="#changes">Changes to This Privacy Policy</LegalLink>.
      </LegalParagraph>
    </section>

    <section aria-labelledby="communications-and-notifications">
      <LegalH2 id="communications-and-notifications">10. Communications and Notifications</LegalH2>
      <LegalParagraph>Loople may send you:</LegalParagraph>
      <LegalList>
        <li>Authentication and security emails</li>
        <li>Login codes and account invitations</li>
        <li>Payment and registration-related communications</li>
        <li>Community announcements</li>
        <li>In-app notifications</li>
        <li>Push notifications for messages, alerts, events, and social activity</li>
        <li>Product and service updates</li>
        <li>Occasional marketing communications</li>
      </LegalList>
      <LegalParagraph>
        You can control supported push-notification categories through Loople or your device
        settings.
      </LegalParagraph>
      <LegalParagraph>
        You may opt out of marketing emails, but we may still send essential transactional, account,
        security, legal, and service-related communications.
      </LegalParagraph>
      <LegalParagraph>
        SMS is not part of Loople&apos;s current launch communications.
      </LegalParagraph>
    </section>

    <section aria-labelledby="data-retention">
      <LegalH2 id="data-retention">11. Data Retention</LegalH2>
      <LegalParagraph>
        We retain personal information for as long as reasonably necessary for the purposes
        described in this Privacy Policy, including to:
      </LegalParagraph>
      <LegalList>
        <li>Provide the Services</li>
        <li>Maintain accounts and community records</li>
        <li>Process transactions</li>
        <li>Meet legal, tax, accounting, and regulatory obligations</li>
        <li>Resolve disputes</li>
        <li>Prevent fraud</li>
        <li>Investigate abuse and safety incidents</li>
        <li>Enforce platform restrictions</li>
        <li>Protect the security and integrity of Loople</li>
      </LegalList>
      <LegalParagraph>
        The appropriate retention period depends on the type of information and why it was
        collected.
      </LegalParagraph>
      <LegalParagraph>
        Leaving a community does not automatically erase historical records created while you were a
        member.
      </LegalParagraph>
      <LegalParagraph>
        If an account is deleted, some information may be deleted or de-identified while other
        limited information may be retained where reasonably necessary for legal obligations, fraud
        prevention, safety enforcement, financial records, dispute resolution, security, or
        legitimate historical organization records.
      </LegalParagraph>
      <LegalParagraph>
        Information may also remain for a limited period in backups and disaster-recovery systems
        before being removed through normal backup rotation.
      </LegalParagraph>
    </section>

    <section aria-labelledby="your-choices-and-privacy-rights">
      <LegalH2 id="your-choices-and-privacy-rights">12. Your Choices and Privacy Rights</LegalH2>
      <LegalParagraph>
        Depending on your relationship with Loople and where you live, you may have the right to
        request access to, correction of, or deletion of personal information.
      </LegalParagraph>
      <LegalParagraph>
        You may contact <LegalMailLink /> to make a privacy request.
      </LegalParagraph>
      <LegalParagraph>
        We may need to verify your identity before completing a request.
      </LegalParagraph>
      <LegalParagraph>
        Certain information may not be deleted immediately or completely where retention is
        reasonably necessary or legally required, including for:
      </LegalParagraph>
      <LegalList>
        <li>Financial and tax records</li>
        <li>Security and fraud prevention</li>
        <li>Abuse and safety investigations</li>
        <li>Enforcement records</li>
        <li>Disputes and legal claims</li>
        <li>Historical organization records</li>
        <li>Legal obligations</li>
      </LegalList>
      <LegalParagraph>You may also:</LegalParagraph>
      <LegalList>
        <li>Edit supported profile information</li>
        <li>Manage supported push-notification settings</li>
        <li>Unsubscribe from marketing email</li>
        <li>
          Revoke <LegalLink href="#google-sign-in">Google</LegalLink> or{' '}
          <LegalLink href="#sign-in-with-apple">Apple</LegalLink> authentication permissions through
          the applicable provider
        </li>
        <li>
          Contact an organization directly regarding information that organization collected through
          Loople
        </li>
      </LegalList>
      <LegalParagraph>
        Residents of Canada may request information about the existence, use, and disclosure of
        their personal information and may challenge its accuracy and completeness, subject to
        applicable law.
      </LegalParagraph>
      <LegalParagraph>
        Depending on where you live in the United States, additional privacy rights may apply. We
        will honor verified requests as required by applicable law.
      </LegalParagraph>
    </section>

    <section aria-labelledby="security">
      <LegalH2 id="security">13. Security</LegalH2>
      <LegalParagraph>
        We use reasonable administrative, technical, and organizational safeguards designed to
        protect personal information appropriate to the nature of the Services and the information
        we process.
      </LegalParagraph>
      <LegalParagraph>
        No online service, database, transmission method, or storage system can be guaranteed to be
        completely secure. We therefore cannot promise absolute security.
      </LegalParagraph>
      <LegalParagraph>
        You are responsible for taking reasonable steps to protect access to your own devices, email
        accounts, and authentication methods.
      </LegalParagraph>
    </section>

    <section aria-labelledby="international-processing">
      <LegalH2 id="international-processing">14. International and Cross-Border Processing</LegalH2>
      <LegalParagraph>
        Loople initially serves users and organizations in the United States and Canada.
      </LegalParagraph>
      <LegalParagraph>
        Loople and our service providers may process or store information in the United States or
        other countries where we or our providers operate.
      </LegalParagraph>
      <LegalParagraph>
        As a result, personal information may be subject to the laws of the jurisdiction where it is
        processed and may be accessible to courts, law-enforcement authorities, or government
        agencies in accordance with applicable law.
      </LegalParagraph>
      <LegalParagraph>
        Where required, we take reasonable steps to use service providers and safeguards appropriate
        to cross-border processing.
      </LegalParagraph>
    </section>

    <section aria-labelledby="childrens-privacy">
      <LegalH2 id="childrens-privacy">15. Children&apos;s Privacy</LegalH2>
      <LegalParagraph>
        Loople supports communities that frequently include children and teenagers.
      </LegalParagraph>
      <LegalParagraph>
        The current product does not permit children under 13 to create independent login accounts.
      </LegalParagraph>
      <LegalParagraph>
        A parent or guardian may create a dependent profile for a child under 13 and provide
        information about that child as part of the family&apos;s use of Loople and participation in
        a community.
      </LegalParagraph>
      <LegalParagraph>
        Teenagers ages 13–17 may receive login access only after a parent or guardian explicitly
        enables or invites them. See{' '}
        <LegalLink href="#teen-accounts">Teen Accounts, Guardians, and Messaging</LegalLink>.
      </LegalParagraph>
      <LegalParagraph>
        Organizations may also process information about children and dependents through
        registrations, programs, and other community activities. Organizations are responsible for
        the information they choose to request and for obtaining any permissions or consents
        required for their activities.
      </LegalParagraph>
      <LegalParagraph>
        Parents and guardians who have questions about information associated with a dependent may
        contact us at <LegalMailLink />.
      </LegalParagraph>
      <LegalParagraph>
        If we learn that personal information has been collected in a manner inconsistent with
        applicable child-privacy requirements, we may take appropriate steps to restrict, delete, or
        otherwise address that information.
      </LegalParagraph>
    </section>

    <section aria-labelledby="changes">
      <LegalH2 id="changes">16. Changes to This Privacy Policy</LegalH2>
      <LegalParagraph>
        We may update this Privacy Policy from time to time as Loople changes.
      </LegalParagraph>
      <LegalParagraph>
        If we make material changes, we may provide notice through the Services, by email, or by
        another reasonable method.
      </LegalParagraph>
      <LegalParagraph>
        The “Effective Date” at the top of this policy indicates when the current version became
        effective.
      </LegalParagraph>
    </section>

    <section aria-labelledby="contact-us">
      <LegalH2 id="contact-us">17. Contact Us</LegalH2>
      <LegalParagraph>For privacy questions, requests, or complaints, contact:</LegalParagraph>
      <LegalParagraph>
        <strong className="font-semibold text-ds-foreground">Privacy Lead</strong>
        <br />
        <strong className="font-semibold text-ds-foreground">Loople, Inc.</strong>
        <br />
        Michigan, United States
        <br />
        <LegalMailLink />
      </LegalParagraph>
      <LegalParagraph>
        We will review privacy inquiries and respond as required by applicable law. You can also
        visit <LegalLink href="/support">Support</LegalLink> or read our{' '}
        <LegalLink href="/terms">Terms</LegalLink>.
      </LegalParagraph>
    </section>
  </>
);

/**
 * Full Privacy Policy article body.
 * @returns Linked privacy policy sections.
 */
export const PrivacyPolicyContent = () => (
  <>
    <LegalParagraph>
      Loople, Inc. (“Loople,” “we,” “us,” or “our”) provides software that helps families, members,
      and community organizations manage memberships, programs, events, registrations, payments,
      communications, and related community activities.
    </LegalParagraph>
    <LegalParagraph>
      This Privacy Policy explains how we collect, use, disclose, and protect personal information
      when you use Loople&apos;s websites, mobile applications, and related services (collectively,
      the “Services”).
    </LegalParagraph>
    <LegalParagraph>
      This Privacy Policy applies to Loople&apos;s own handling of personal information.{' '}
      <LegalLink href="#how-organizations-use-information">Organizations that use Loople</LegalLink>
      —such as clubs, teams, leagues, schools, churches, and other membership-based communities—may
      also collect and use information through the Services for their own purposes. In those
      situations, the organization is responsible for the information it chooses to collect and how
      it uses that information, and Loople processes the information as needed to provide the
      Services.
    </LegalParagraph>
    <LegalParagraph>
      If you have questions about this Privacy Policy or Loople&apos;s privacy practices, contact us
      at <LegalMailLink />.
    </LegalParagraph>

    <InformationWeCollect />
    <GoogleSignIn />
    <SignInWithApple />
    <HowWeUse />
    <HowOrganizationsUse />
    <TeenAccounts />
    <HowWeShare />
    <RemainingSections />
  </>
);
