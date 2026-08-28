/**
 * Loople Terms of Service body copy, with internal and provider links.
 */

import {
  LegalH2,
  LegalLink,
  LegalList,
  LegalMailLink,
  LegalOrderedList,
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
  apple: 'https://www.apple.com/legal/privacy/',
  expo: 'https://expo.dev/privacy',
  openai: 'https://openai.com/policies/privacy-policy',
} as const;

const PlatformAndAccounts = () => (
  <>
    <section aria-labelledby="what-loople-is">
      <LegalH2 id="what-loople-is">1. What Loople Is</LegalH2>
      <LegalParagraph>
        Loople provides software that helps families, members, and community organizations manage
        memberships, programs, events, registrations, payments, communications, volunteer activity,
        community feeds, and related operations.
      </LegalParagraph>
      <LegalParagraph>
        Organizations using Loople may include clubs, teams, leagues, schools, churches,
        recreational organizations, and other membership-based communities.
      </LegalParagraph>
      <LegalParagraph>
        Loople provides the software platform. Loople does not operate or control the real-world
        activities of organizations using the Services.
      </LegalParagraph>
      <LegalParagraph>Organizations remain responsible for their own:</LegalParagraph>
      <LegalList>
        <li>Membership decisions</li>
        <li>Programs and events</li>
        <li>Coaches, employees, volunteers, and staff</li>
        <li>Facilities</li>
        <li>Physical supervision</li>
        <li>Safety procedures</li>
        <li>Waivers and releases</li>
        <li>Refund and cancellation policies</li>
        <li>Eligibility rules</li>
        <li>Custom registration questions</li>
        <li>Compliance with laws applicable to their activities</li>
      </LegalList>
      <LegalParagraph>
        A Loople account belongs to the individual user. A community membership is a relationship
        between that user and an organization. Leaving, suspending, or deleting a community does not
        automatically delete the user&apos;s Loople account. See{' '}
        <LegalLink href="#historical-records">Historical Records and Leaving a Community</LegalLink>
        .
      </LegalParagraph>
    </section>

    <section aria-labelledby="eligibility-and-accounts">
      <LegalH2 id="eligibility-and-accounts">2. Eligibility and Accounts</LegalH2>
      <LegalParagraph>
        You must provide accurate information when creating or using an account and keep your
        information reasonably current.
      </LegalParagraph>
      <LegalParagraph>
        You are responsible for maintaining control of the email account, device, and authentication
        methods used to access Loople.
      </LegalParagraph>
      <LegalParagraph>Loople currently supports:</LegalParagraph>
      <LegalList>
        <li>Passwordless email authentication using one-time codes</li>
        <li>
          <LegalLink href="/privacy#google-sign-in">Google Sign-In</LegalLink>
        </li>
        <li>
          <LegalLink href="/privacy#sign-in-with-apple">Sign in with Apple</LegalLink> on supported
          Apple devices
        </li>
      </LegalList>
      <LegalParagraph>You may not:</LegalParagraph>
      <LegalList>
        <li>Impersonate another person</li>
        <li>Create an account using information you are not authorized to use</li>
        <li>Attempt to access another person&apos;s account</li>
        <li>Share access in a way that creates a security or safety risk</li>
        <li>Circumvent account restrictions or suspensions</li>
      </LegalList>
      <LegalParagraph>
        Loople may require additional verification if we reasonably believe an account may be
        compromised, misused, or associated with fraud or abuse.
      </LegalParagraph>
    </section>

    <section aria-labelledby="family-accounts-and-dependents">
      <LegalH2 id="family-accounts-and-dependents">3. Family Accounts and Dependents</LegalH2>
      <LegalParagraph>
        Loople allows parents and guardians to create dependent profiles connected to a family
        account.
      </LegalParagraph>
      <LegalParagraph>
        A dependent profile may include information such as name, date of birth, community
        participation, program participation, registration information, and other information
        provided by a parent, guardian, or organization.
      </LegalParagraph>
      <LegalParagraph>
        Children under 13 do not receive independent Loople login access in the current product. See
        our <LegalLink href="/privacy#childrens-privacy">Privacy Policy</LegalLink>.
      </LegalParagraph>
      <LegalParagraph>
        Teenagers ages 13 through 17 may receive login access only after a parent or guardian
        explicitly invites or enables them.
      </LegalParagraph>
      <LegalParagraph>
        A parent or guardian is responsible for the dependent information they provide and for
        determining whether granting teen login access is appropriate.
      </LegalParagraph>
      <LegalParagraph>
        Loople may provide guardian controls related to teen account access and{' '}
        <LegalLink href="#teen-messaging">messaging</LegalLink>.
      </LegalParagraph>
      <LegalParagraph>
        At age 18, the Services may treat the user differently for account and guardianship purposes
        based on then-current product functionality and applicable law.
      </LegalParagraph>
      <LegalParagraph>
        Loople may modify dependent and teen account functionality over time to improve safety,
        privacy, and account control.
      </LegalParagraph>
    </section>

    <section aria-labelledby="teen-messaging">
      <LegalH2 id="teen-messaging">4. Teen Messaging and Guardian Controls</LegalH2>
      <LegalParagraph>
        Loople supports communication between members, including communication between adults and
        teenagers where permitted by applicable guardian controls and community context.
      </LegalParagraph>
      <LegalParagraph>Legitimate uses may include communication between:</LegalParagraph>
      <LegalList>
        <li>Coaches and participants</li>
        <li>Directors and members</li>
        <li>Administrators and volunteers</li>
        <li>Program leaders and attendees</li>
        <li>Members coordinating schedules, events, setup, or community activities</li>
      </LegalList>
      <LegalParagraph>
        Guardian-controlled teen messaging settings may restrict messaging to:
      </LegalParagraph>
      <LegalList>
        <li>Disabled</li>
        <li>Family only</li>
        <li>Open with guardian supervision</li>
      </LegalList>
      <LegalParagraph>
        In supervised teen-adult conversations, a guardian may be able to observe the conversation.
        Guardians may also receive notices when a teen begins a conversation with a new adult.
      </LegalParagraph>
      <LegalParagraph>
        Community administrators do not receive blanket access to private direct messages merely
        because they are administrators.
      </LegalParagraph>
      <LegalParagraph>
        Loople may review particular communications when reasonably necessary to:
      </LegalParagraph>
      <LegalList>
        <li>Investigate a safety concern</li>
        <li>Respond to a report</li>
        <li>Enforce these Terms</li>
        <li>Prevent abuse</li>
        <li>Protect users</li>
        <li>Comply with law</li>
      </LegalList>
      <LegalParagraph>
        Loople does not promise that every harmful, inappropriate, unsafe, exploitative, or abusive
        communication will be detected.
      </LegalParagraph>
      <LegalParagraph>
        If you believe a child or teenager may be at risk through Loople, contact <LegalMailLink />.
      </LegalParagraph>
    </section>

    <section aria-labelledby="communities-and-administrators">
      <LegalH2 id="communities-and-administrators">5. Communities and Administrators</LegalH2>
      <LegalParagraph>
        Organizations may create and administer communities through Loople.
      </LegalParagraph>
      <LegalParagraph>
        Authorized community administrators may manage information reasonably necessary to operate
        their organization, including information related to:
      </LegalParagraph>
      <LegalList>
        <li>Membership</li>
        <li>Programs</li>
        <li>Events</li>
        <li>Registrations</li>
        <li>Volunteer activity</li>
        <li>Waivers</li>
        <li>Payments</li>
        <li>Member contact information for operational purposes</li>
      </LegalList>
      <LegalParagraph>
        Community administrators are responsible for acting within the authority granted to them by
        their organization.
      </LegalParagraph>
      <LegalParagraph>
        Community administrators may not use Loople data for unrelated, unlawful, deceptive,
        abusive, or unauthorized purposes.
      </LegalParagraph>
      <LegalParagraph>
        An organization may remove or suspend a person from its own community.
      </LegalParagraph>
      <LegalParagraph>
        Removal from one community does not automatically remove the user from Loople or from other
        communities.
      </LegalParagraph>
      <LegalParagraph>
        Organizations are responsible for their own decisions regarding membership eligibility,
        participation, discipline, refunds, waivers, rules, and real-world operations.
      </LegalParagraph>
    </section>

    <section aria-labelledby="organization-questions">
      <LegalH2 id="organization-questions">
        6. Organization-Created Questions and Data Collection
      </LegalH2>
      <LegalParagraph>
        Organizations may create custom registration or onboarding questions.
      </LegalParagraph>
      <LegalParagraph>
        These questions may request information relevant to the organization&apos;s activities,
        including information such as emergency-contact details, shirt size, allergy information, or
        other operational information.
      </LegalParagraph>
      <LegalParagraph>
        The organization—not Loople—is responsible for determining whether its questions are
        appropriate, necessary, lawful, and consistent with any consent or notice obligations that
        apply to the organization.
      </LegalParagraph>
      <LegalParagraph>Organizations must not use Loople custom fields to collect:</LegalParagraph>
      <LegalList>
        <li>Passwords</li>
        <li>Full payment-card numbers</li>
        <li>Social Security numbers</li>
        <li>Unnecessary government identification numbers</li>
        <li>Information that the organization is not legally permitted to collect</li>
      </LegalList>
      <LegalParagraph>
        Loople may remove, disable, or restrict forms or questions that we reasonably believe create
        legal, privacy, security, or safety risks.
      </LegalParagraph>
    </section>

    <section aria-labelledby="community-rules-waivers">
      <LegalH2 id="community-rules-waivers">7. Community Rules, Waivers, and Agreements</LegalH2>
      <LegalParagraph>
        Organizations may provide their own rules, handbooks, waivers, releases, codes of conduct,
        or other agreements through Loople.
      </LegalParagraph>
      <LegalParagraph>
        Organizations may also require acceptance of certain program-specific waivers or terms
        before enrollment.
      </LegalParagraph>
      <LegalParagraph>
        Unless Loople is expressly identified as a party, those agreements are between the
        organization and the member or participant.
      </LegalParagraph>
      <LegalParagraph>Loople does not:</LegalParagraph>
      <LegalList>
        <li>Draft those agreements on behalf of the organization</li>
        <li>Guarantee that they are enforceable</li>
        <li>Determine whether they satisfy applicable law</li>
        <li>Assume responsibility for the underlying activity</li>
      </LegalList>
      <LegalParagraph>
        Organizations are responsible for determining what agreements, permissions, waivers, or
        releases they need.
      </LegalParagraph>
    </section>
  </>
);

const ContentPaymentsAndRecords = () => (
  <>
    <section aria-labelledby="user-generated-content">
      <LegalH2 id="user-generated-content">8. User-Generated Content</LegalH2>
      <LegalParagraph>
        Users and organizations may submit or create content through the Services, including:
      </LegalParagraph>
      <LegalList>
        <li>Posts</li>
        <li>Comments</li>
        <li>Replies</li>
        <li>Direct messages</li>
        <li>Group messages</li>
        <li>Profile images</li>
        <li>Feed photos</li>
        <li>Files</li>
        <li>Documents</li>
        <li>Event content</li>
        <li>Program content</li>
        <li>Community content</li>
      </LegalList>
      <LegalParagraph>You retain ownership of content you submit.</LegalParagraph>
      <LegalParagraph>
        By submitting content to Loople, you grant Loople a non-exclusive, worldwide, royalty-free
        license to host, store, reproduce, process, resize, transmit, display, back up, moderate,
        and otherwise use that content as reasonably necessary to operate, secure, improve, and
        provide the Services.
      </LegalParagraph>
      <LegalParagraph>
        This license does not transfer ownership of your content to Loople.
      </LegalParagraph>
      <LegalParagraph>
        You represent that you have the rights necessary to submit the content you provide.
      </LegalParagraph>
      <LegalParagraph>
        You are responsible for obtaining any permissions, releases, or consents required for
        content you upload, including photos or information involving minors.
      </LegalParagraph>
      <LegalParagraph>
        Loople may remove, restrict, or disable access to content that we reasonably believe:
      </LegalParagraph>
      <LegalList>
        <li>Violates these Terms</li>
        <li>Violates law</li>
        <li>Infringes intellectual-property rights</li>
        <li>Creates a safety risk</li>
        <li>Is abusive, exploitative, harassing, deceptive, or fraudulent</li>
        <li>Sexualizes or endangers minors</li>
        <li>Interferes with the Services</li>
        <li>Creates material risk to users, organizations, or Loople</li>
      </LegalList>
    </section>

    <section aria-labelledby="avatar-generation">
      <LegalH2 id="avatar-generation">9. Optional Avatar Generation</LegalH2>
      <LegalParagraph>
        Loople may offer an optional feature that creates a stylized avatar from a photo you
        provide.
      </LegalParagraph>
      <LegalParagraph>
        If you choose to use this feature, your selected image may be sent to{' '}
        <LegalLink href={PROVIDER.openai} external>
          OpenAI
        </LegalLink>{' '}
        for image processing and generation.
      </LegalParagraph>
      <LegalParagraph>
        By using the avatar feature, you authorize Loople and its service providers to process the
        selected image for that purpose.
      </LegalParagraph>
      <LegalParagraph>You must have the right to use any image you submit.</LegalParagraph>
      <LegalParagraph>
        Private community messages and posts are not submitted to OpenAI for unrelated
        general-purpose model training as part of the avatar-generation feature. See our{' '}
        <LegalLink href="/privacy#avatar-generation">Privacy Policy</LegalLink>.
      </LegalParagraph>
    </section>

    <section aria-labelledby="payments-to-organizations">
      <LegalH2 id="payments-to-organizations">10. Payments to Organizations</LegalH2>
      <LegalParagraph>
        Organizations may connect their own Stripe accounts through Stripe Connect.
      </LegalParagraph>
      <LegalParagraph>
        Members may use Loople-powered checkout to pay organization charges such as:
      </LegalParagraph>
      <LegalList>
        <li>Dues</li>
        <li>Program registrations</li>
        <li>Event-related charges</li>
        <li>Other organization-defined fees</li>
      </LegalList>
      <LegalParagraph>
        <LegalLink href={PROVIDER.stripe} external>
          Stripe
        </LegalLink>{' '}
        handles payment-card credentials.
      </LegalParagraph>
      <LegalParagraph>Loople does not intend to store raw payment-card numbers.</LegalParagraph>
      <LegalParagraph>
        Loople may receive and store transaction identifiers, payment status, amounts, fee
        information, refund information, and other metadata needed to operate and support the
        payment flow.
      </LegalParagraph>
      <LegalParagraph>
        Loople may charge a platform or service fee on qualifying Loople-powered Stripe Connect
        transactions.
      </LegalParagraph>
      <LegalParagraph>
        The default platform fee may vary by organization or commercial arrangement.
      </LegalParagraph>
      <LegalParagraph>
        Loople does not claim a fee on unrelated payment activity conducted independently by an
        organization outside the Loople-powered payment flow.
      </LegalParagraph>
    </section>

    <section aria-labelledby="refunds-and-disputes">
      <LegalH2 id="refunds-and-disputes">11. Refunds and Disputes for Organization Charges</LegalH2>
      <LegalParagraph>
        Organizations establish and control their own refund and cancellation policies for purchases
        made from them.
      </LegalParagraph>
      <LegalParagraph>
        If you request a refund for dues, registrations, programs, or similar organization charges,
        the organization is generally responsible for deciding whether the refund will be granted.
      </LegalParagraph>
      <LegalParagraph>
        Authorized organization administrators may be able to process eligible refunds through
        Loople.
      </LegalParagraph>
      <LegalParagraph>
        Loople is not responsible for an organization&apos;s independent refund decision unless the
        disputed amount was paid directly to Loople. See{' '}
        <LegalLink href="#community-pro-and-fees">Community Pro and Fees Paid to Loople</LegalLink>.
      </LegalParagraph>
      <LegalParagraph>
        Payment disputes and chargebacks may also be subject to Stripe&apos;s rules and the policies
        of the card issuer or financial institution involved.
      </LegalParagraph>
    </section>

    <section aria-labelledby="community-pro-and-fees">
      <LegalH2 id="community-pro-and-fees">12. Community Pro and Fees Paid to Loople</LegalH2>
      <LegalParagraph>
        Organizations may purchase paid Loople plans, including Community Pro subscriptions.
      </LegalParagraph>
      <LegalParagraph>
        Current Community Pro plans are billed monthly through Stripe unless a different commercial
        arrangement is expressly agreed.
      </LegalParagraph>
      <LegalParagraph>
        Paid features, pricing, limits, and plan names may change over time. See{' '}
        <LegalLink href="/pricing">Pricing</LegalLink>.
      </LegalParagraph>
      <LegalParagraph>If an organization fails to pay amounts due, Loople may:</LegalParagraph>
      <LegalList>
        <li>Restrict paid features</li>
        <li>Suspend access to paid functionality</li>
        <li>Suspend or downgrade the organization&apos;s paid plan</li>
        <li>Take other reasonable steps related to nonpayment</li>
      </LegalList>
      <LegalParagraph>
        Suspending or canceling an organization&apos;s paid Loople plan does not automatically
        delete individual Loople user accounts.
      </LegalParagraph>
      <LegalParagraph>Loople controls refunds of amounts paid directly to Loople.</LegalParagraph>
      <LegalParagraph>
        Any separately negotiated commercial agreement between Loople and an organization may
        supplement or override these Terms for that organization where expressly stated.
      </LegalParagraph>
    </section>

    <section aria-labelledby="historical-records">
      <LegalH2 id="historical-records">13. Historical Records and Leaving a Community</LegalH2>
      <LegalParagraph>
        Leaving or being removed from a community does not automatically erase records created while
        you participated in that community.
      </LegalParagraph>
      <LegalParagraph>
        Organizations may retain legitimate historical records such as:
      </LegalParagraph>
      <LegalList>
        <li>Membership history</li>
        <li>Program enrollments</li>
        <li>Registrations</li>
        <li>Payments</li>
        <li>Volunteer signups</li>
        <li>Waiver acceptances</li>
        <li>Other operational records</li>
      </LegalList>
      <LegalParagraph>
        Historical membership should be treated as inactive or former participation rather than
        current membership.
      </LegalParagraph>
      <LegalParagraph>
        A user may continue using Loople through other communities even after one community
        relationship ends.
      </LegalParagraph>
    </section>

    <section aria-labelledby="data-exports">
      <LegalH2 id="data-exports">14. Data Exports</LegalH2>
      <LegalParagraph>
        Authorized organization administrators may export certain information from Loople, including
        program rosters and finance transaction data where those features are available.
      </LegalParagraph>
      <LegalParagraph>
        Once an organization exports information from Loople, the organization is responsible for
        how that exported copy is stored, shared, secured, retained, and deleted.
      </LegalParagraph>
      <LegalParagraph>
        Loople remains responsible for information that remains within Loople&apos;s systems as
        described in our <LegalLink href="/privacy">Privacy Policy</LegalLink>.
      </LegalParagraph>
    </section>

    <section aria-labelledby="notifications-and-communications">
      <LegalH2 id="notifications-and-communications">15. Notifications and Communications</LegalH2>
      <LegalParagraph>
        Loople may send communications related to your use of the Services, including:
      </LegalParagraph>
      <LegalList>
        <li>Authentication and security emails</li>
        <li>Login codes</li>
        <li>Account invitations</li>
        <li>Community announcements</li>
        <li>In-app notifications</li>
        <li>Push notifications</li>
        <li>Payment-related notices</li>
        <li>Registration-related notices</li>
        <li>Product and service updates</li>
        <li>Marketing communications where permitted</li>
      </LegalList>
      <LegalParagraph>
        Supported push-notification categories may be controlled through Loople or your device
        settings.
      </LegalParagraph>
      <LegalParagraph>
        You may opt out of marketing communications, but you may still receive transactional, legal,
        account, security, and service-related communications.
      </LegalParagraph>
      <LegalParagraph>
        SMS is not part of Loople&apos;s current launch communications.
      </LegalParagraph>
    </section>
  </>
);

const UseEnforcementAndProviders = () => (
  <>
    <section aria-labelledby="acceptable-use">
      <LegalH2 id="acceptable-use">16. Acceptable Use</LegalH2>
      <LegalParagraph>You may not use Loople to:</LegalParagraph>
      <LegalList>
        <li>Harass, threaten, intimidate, or abuse another person</li>
        <li>Groom, exploit, sexualize, or endanger a minor</li>
        <li>Facilitate sexual exploitation or abuse</li>
        <li>Engage in fraud or deception</li>
        <li>Impersonate another person or organization</li>
        <li>Violate law</li>
        <li>Send spam or unauthorized bulk communications</li>
        <li>Distribute malware or malicious code</li>
        <li>Attempt to bypass security controls</li>
        <li>Probe, scan, or test systems without authorization</li>
        <li>Scrape or harvest information except as expressly permitted</li>
        <li>Interfere with or disrupt the Services</li>
        <li>Attempt to gain unauthorized access to accounts, systems, or data</li>
        <li>Circumvent suspensions, bans, or restrictions</li>
        <li>Collect sensitive information through custom fields in violation of these Terms</li>
        <li>Use Loople in a manner that materially harms users, organizations, or the platform</li>
      </LegalList>
      <LegalParagraph>
        Loople may investigate suspected violations and take{' '}
        <LegalLink href="#platform-enforcement">appropriate action</LegalLink>.
      </LegalParagraph>
    </section>

    <section aria-labelledby="platform-enforcement">
      <LegalH2 id="platform-enforcement">17. Platform Enforcement</LegalH2>
      <LegalParagraph>
        Loople may suspend, restrict, or permanently terminate access to the Services if we
        reasonably believe a user:
      </LegalParagraph>
      <LegalList>
        <li>Violated these Terms</li>
        <li>Engaged in fraud</li>
        <li>Created a security risk</li>
        <li>Abused another user</li>
        <li>Endangered or exploited a minor</li>
        <li>Used the Services unlawfully</li>
        <li>Repeatedly violated community or platform rules</li>
        <li>Created material risk to Loople, users, or organizations</li>
      </LegalList>
      <LegalParagraph>
        Communities may independently suspend or remove users from their own communities.
      </LegalParagraph>
      <LegalParagraph>Loople may retain information reasonably necessary to:</LegalParagraph>
      <LegalList>
        <li>Prevent fraud</li>
        <li>Investigate abuse</li>
        <li>Enforce safety restrictions</li>
        <li>Resolve disputes</li>
        <li>Meet legal obligations</li>
        <li>Maintain security</li>
        <li>Enforce platform restrictions</li>
      </LegalList>
      <LegalParagraph>
        Termination of access does not require Loople to erase records we are legally permitted or
        reasonably required to retain. See <LegalLink href="#termination">Termination</LegalLink>.
      </LegalParagraph>
    </section>

    <section aria-labelledby="intellectual-property">
      <LegalH2 id="intellectual-property">18. Intellectual Property</LegalH2>
      <LegalParagraph>
        The Loople name, software, design, logos, trademarks, interfaces, code, and other materials
        provided by Loople are owned by Loople or its licensors and are protected by
        intellectual-property laws.
      </LegalParagraph>
      <LegalParagraph>
        These Terms do not grant you ownership of Loople&apos;s software or intellectual property.
      </LegalParagraph>
      <LegalParagraph>
        Subject to these Terms, Loople grants you a limited, personal, revocable, non-exclusive,
        non-transferable right to use the Services for their intended purpose.
      </LegalParagraph>
      <LegalParagraph>
        You may not copy, reverse engineer, resell, sublicense, or commercially exploit the Services
        except as permitted by law or authorized by Loople.
      </LegalParagraph>
    </section>

    <section aria-labelledby="copyright-complaints">
      <LegalH2 id="copyright-complaints">
        19. Copyright and Intellectual-Property Complaints
      </LegalH2>
      <LegalParagraph>
        If you believe content on Loople infringes your copyright or other intellectual-property
        rights, contact:
      </LegalParagraph>
      <LegalParagraph>
        <LegalMailLink />
      </LegalParagraph>
      <LegalParagraph>
        Please include enough information for us to understand the claim, identify the material at
        issue, and contact you.
      </LegalParagraph>
      <LegalParagraph>
        Loople may remove or restrict access to allegedly infringing material where appropriate.
      </LegalParagraph>
      <LegalParagraph>
        We may request additional information before acting on a complaint.
      </LegalParagraph>
    </section>

    <section aria-labelledby="third-party-services">
      <LegalH2 id="third-party-services">20. Third-Party Services</LegalH2>
      <LegalParagraph>
        Loople relies on third-party services to operate parts of the platform, including services
        for:
      </LegalParagraph>
      <LegalList>
        <li>Authentication</li>
        <li>Hosting</li>
        <li>Database infrastructure</li>
        <li>File storage</li>
        <li>Payments</li>
        <li>Email</li>
        <li>Analytics</li>
        <li>Error monitoring</li>
        <li>Push notifications</li>
        <li>Optional avatar generation</li>
      </LegalList>
      <LegalParagraph>Current providers include:</LegalParagraph>
      <LegalList>
        <li>
          <LegalLink href={PROVIDER.supabase} external>
            Supabase
          </LegalLink>
        </li>
        <li>
          <LegalLink href={PROVIDER.stripe} external>
            Stripe
          </LegalLink>
        </li>
        <li>
          <LegalLink href={PROVIDER.resend} external>
            Resend
          </LegalLink>
        </li>
        <li>
          <LegalLink href={PROVIDER.posthog} external>
            PostHog
          </LegalLink>
        </li>
        <li>
          <LegalLink href={PROVIDER.vercel} external>
            Vercel
          </LegalLink>
        </li>
        <li>
          <LegalLink href={PROVIDER.sentry} external>
            Sentry
          </LegalLink>
        </li>
        <li>
          <LegalLink href={PROVIDER.google} external>
            Google
          </LegalLink>
        </li>
        <li>
          <LegalLink href={PROVIDER.apple} external>
            Apple
          </LegalLink>
        </li>
        <li>
          <LegalLink href={PROVIDER.expo} external>
            Expo
          </LegalLink>
        </li>
        <li>
          <LegalLink href={PROVIDER.openai} external>
            OpenAI
          </LegalLink>
        </li>
      </LegalList>
      <LegalParagraph>
        Your use of certain features may also be subject to the terms and privacy practices of those
        providers.
      </LegalParagraph>
      <LegalParagraph>
        Loople is not responsible for third-party services outside our reasonable control.
      </LegalParagraph>
    </section>

    <section aria-labelledby="privacy">
      <LegalH2 id="privacy">21. Privacy</LegalH2>
      <LegalParagraph>
        Our collection and use of personal information is described in the Loople{' '}
        <LegalLink href="/privacy">Privacy Policy</LegalLink>.
      </LegalParagraph>
      <LegalParagraph>
        By using Loople, you acknowledge that you have read the Privacy Policy.
      </LegalParagraph>
      <LegalParagraph>
        The Privacy Policy is incorporated into these Terms by reference.
      </LegalParagraph>
    </section>

    <section aria-labelledby="service-availability">
      <LegalH2 id="service-availability">22. Service Availability</LegalH2>
      <LegalParagraph>
        Loople does not guarantee uninterrupted, error-free, or continuously available service.
      </LegalParagraph>
      <LegalParagraph>The Services may experience:</LegalParagraph>
      <LegalList>
        <li>Maintenance</li>
        <li>Outages</li>
        <li>Bugs</li>
        <li>Delays</li>
        <li>Technical failures</li>
        <li>Third-party service interruptions</li>
      </LegalList>
      <LegalParagraph>
        We may modify, suspend, limit, or discontinue features or portions of the Services.
      </LegalParagraph>
      <LegalParagraph>
        Where practical, Loople may provide reasonable notice of material changes affecting paid
        customers.
      </LegalParagraph>
      <LegalParagraph>
        No public uptime guarantee or service-level agreement applies unless Loople expressly agrees
        otherwise in a separate written agreement.
      </LegalParagraph>
    </section>

    <section aria-labelledby="changes-to-the-services">
      <LegalH2 id="changes-to-the-services">23. Changes to the Services</LegalH2>
      <LegalParagraph>
        Loople may add, modify, restrict, replace, or discontinue features over time.
      </LegalParagraph>
      <LegalParagraph>
        We may also change technical requirements, plan limits, pricing, or product functionality.
      </LegalParagraph>
      <LegalParagraph>
        We will use reasonable efforts to avoid unnecessarily disrupting paid users, but we do not
        guarantee that every feature will remain available indefinitely.
      </LegalParagraph>
    </section>
  </>
);

const LegalRiskAndClosing = () => (
  <>
    <section aria-labelledby="disclaimers">
      <LegalH2 id="disclaimers">24. Disclaimers</LegalH2>
      <LegalParagraph>
        THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS TO THE MAXIMUM EXTENT
        PERMITTED BY LAW.
      </LegalParagraph>
      <LegalParagraph>
        LOOPLE DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, COMPLETELY
        SECURE, OR SUITABLE FOR EVERY ORGANIZATION OR ACTIVITY.
      </LegalParagraph>
      <LegalParagraph>LOOPLE DOES NOT CONTROL OR GUARANTEE:</LegalParagraph>
      <LegalList>
        <li>THE CONDUCT OF USERS</li>
        <li>THE CONDUCT OF ORGANIZATIONS</li>
        <li>THE SAFETY OF REAL-WORLD EVENTS OR ACTIVITIES</li>
        <li>THE QUALIFICATIONS OF COACHES, STAFF, VOLUNTEERS, OR ADMINISTRATORS</li>
        <li>THE ACCURACY OF ORGANIZATION-CREATED CONTENT</li>
        <li>THE ENFORCEABILITY OF ORGANIZATION WAIVERS OR RULES</li>
        <li>THE DETECTION OF EVERY SAFETY OR ABUSE CONCERN</li>
      </LegalList>
      <LegalParagraph>
        TO THE EXTENT PERMITTED BY LAW, LOOPLE DISCLAIMS IMPLIED WARRANTIES INCLUDING
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
      </LegalParagraph>
      <LegalParagraph>
        Some jurisdictions do not allow certain warranty exclusions, so some of the above may not
        apply to you.
      </LegalParagraph>
    </section>

    <section aria-labelledby="limitation-of-liability">
      <LegalH2 id="limitation-of-liability">25. Limitation of Liability</LegalH2>
      <LegalParagraph>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOOPLE AND ITS OFFICERS, DIRECTORS, EMPLOYEES,
        CONTRACTORS, AFFILIATES, AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
        SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, REVENUE,
        DATA, GOODWILL, OR BUSINESS OPPORTUNITY ARISING FROM OR RELATED TO THE SERVICES.
      </LegalParagraph>
      <LegalParagraph>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOOPLE&apos;S TOTAL LIABILITY ARISING OUT OF OR
        RELATING TO THE SERVICES OR THESE TERMS WILL NOT EXCEED THE GREATER OF:
      </LegalParagraph>
      <LegalOrderedList>
        <li>
          THE AMOUNTS YOU PAID DIRECTLY TO LOOPLE DURING THE TWELVE MONTHS BEFORE THE EVENT GIVING
          RISE TO THE CLAIM; OR
        </li>
        <li>ONE HUNDRED U.S. DOLLARS (US $100).</li>
      </LegalOrderedList>
      <LegalParagraph>
        This limitation does not apply where applicable law prohibits such a limitation.
      </LegalParagraph>
    </section>

    <section aria-labelledby="indemnification">
      <LegalH2 id="indemnification">26. Indemnification by Organizations and Users</LegalH2>
      <LegalParagraph>
        To the extent permitted by law, you agree to indemnify and hold harmless Loople and its
        officers, directors, employees, contractors, and affiliates from claims, liabilities,
        losses, damages, and reasonable expenses arising out of or relating to:
      </LegalParagraph>
      <LegalList>
        <li>Your violation of these Terms</li>
        <li>Your misuse of the Services</li>
        <li>Content you submit</li>
        <li>Your violation of another person&apos;s rights</li>
        <li>Your unlawful conduct</li>
      </LegalList>
      <LegalParagraph>
        If you use Loople on behalf of an organization, the organization also agrees to indemnify
        Loople from claims arising from or related to the organization&apos;s:
      </LegalParagraph>
      <LegalList>
        <li>Programs</li>
        <li>Events</li>
        <li>Facilities</li>
        <li>Coaches</li>
        <li>Employees</li>
        <li>Volunteers</li>
        <li>Membership decisions</li>
        <li>Waivers</li>
        <li>Refund decisions</li>
        <li>Custom data collection</li>
        <li>Real-world operations</li>
        <li>Violation of applicable law</li>
      </LegalList>
      <LegalParagraph>
        This section applies only to the extent permitted by applicable law.
      </LegalParagraph>
    </section>

    <section aria-labelledby="governing-law">
      <LegalH2 id="governing-law">27. Governing Law and Venue</LegalH2>
      <LegalParagraph>
        These Terms are governed by the laws of the State of Michigan, without regard to
        conflict-of-law rules.
      </LegalParagraph>
      <LegalParagraph>
        There is no mandatory arbitration requirement under these Terms.
      </LegalParagraph>
      <LegalParagraph>
        To the extent a dispute must be brought in court, the parties agree that courts located in
        Michigan may exercise jurisdiction where legally permitted.
      </LegalParagraph>
      <LegalParagraph>
        Nothing in this section limits rights that cannot lawfully be waived under applicable
        consumer-protection or privacy laws.
      </LegalParagraph>
    </section>

    <section aria-labelledby="changes-to-these-terms">
      <LegalH2 id="changes-to-these-terms">28. Changes to These Terms</LegalH2>
      <LegalParagraph>We may update these Terms from time to time.</LegalParagraph>
      <LegalParagraph>
        If we make material changes, we may provide notice through the Services, by email, or by
        another reasonable method.
      </LegalParagraph>
      <LegalParagraph>
        Your continued use of the Services after updated Terms take effect constitutes acceptance of
        the updated Terms where permitted by law.
      </LegalParagraph>
      <LegalParagraph>
        If you do not agree to updated Terms, you should stop using the Services.
      </LegalParagraph>
      <LegalParagraph>
        The “Effective Date” at the top identifies the current version.
      </LegalParagraph>
    </section>

    <section aria-labelledby="termination">
      <LegalH2 id="termination">29. Termination</LegalH2>
      <LegalParagraph>You may stop using Loople at any time.</LegalParagraph>
      <LegalParagraph>
        Loople may suspend or terminate access as permitted by these Terms.
      </LegalParagraph>
      <LegalParagraph>Termination does not automatically eliminate:</LegalParagraph>
      <LegalList>
        <li>Historical community records</li>
        <li>Payment records</li>
        <li>Safety or abuse records</li>
        <li>Fraud-prevention information</li>
        <li>Legal records</li>
        <li>Other information Loople or an organization is permitted or required to retain</li>
      </LegalList>
      <LegalParagraph>
        Sections that by their nature should survive termination remain in effect, including
        provisions concerning intellectual property, payments, disclaimers, limitation of liability,
        indemnification, governing law, and enforcement.
      </LegalParagraph>
    </section>

    <section aria-labelledby="general-terms">
      <LegalH2 id="general-terms">30. General Terms</LegalH2>
      <LegalParagraph>
        These Terms, together with the <LegalLink href="/privacy">Privacy Policy</LegalLink> and any
        applicable written commercial agreement, form the agreement between you and Loople regarding
        the Services.
      </LegalParagraph>
      <LegalParagraph>
        If any provision is found unenforceable, the remaining provisions remain in effect.
      </LegalParagraph>
      <LegalParagraph>
        Loople&apos;s failure to enforce a provision does not waive our right to enforce it later.
      </LegalParagraph>
      <LegalParagraph>
        You may not assign these Terms without Loople&apos;s consent. Loople may assign these Terms
        in connection with a merger, acquisition, reorganization, financing, sale of assets, or
        similar transaction.
      </LegalParagraph>
      <LegalParagraph>
        Headings are for convenience only and do not affect interpretation.
      </LegalParagraph>
    </section>

    <section aria-labelledby="contact">
      <LegalH2 id="contact">31. Contact</LegalH2>
      <LegalParagraph>Questions about these Terms may be sent to:</LegalParagraph>
      <LegalParagraph>
        <strong className="font-semibold text-ds-foreground">Loople, Inc.</strong>
        <br />
        Michigan, United States
        <br />
        <LegalMailLink />
      </LegalParagraph>
      <LegalParagraph>
        You can also visit <LegalLink href="/support">Support</LegalLink> or read our{' '}
        <LegalLink href="/privacy">Privacy Policy</LegalLink>.
      </LegalParagraph>
    </section>
  </>
);

/**
 * Full Terms of Service article body.
 * @returns Linked terms sections.
 */
export const TermsOfServiceContent = () => (
  <>
    <LegalParagraph>
      These Terms of Service (“Terms”) govern your access to and use of Loople&apos;s websites,
      mobile applications, and related services (collectively, the “Services”).
    </LegalParagraph>
    <LegalParagraph>
      The Services are operated by{' '}
      <strong className="font-semibold text-ds-foreground">Loople, Inc.</strong>, a Michigan company
      (“Loople,” “we,” “us,” or “our”).
    </LegalParagraph>
    <LegalParagraph>
      By creating an account, accessing the Services, joining a community, administering a
      community, or otherwise using Loople, you agree to these Terms.
    </LegalParagraph>
    <LegalParagraph>If you do not agree to these Terms, do not use the Services.</LegalParagraph>
    <LegalParagraph>
      Questions about these Terms may be sent to <LegalMailLink />. Our collection and use of
      personal information is described in the <LegalLink href="/privacy">Privacy Policy</LegalLink>
      .
    </LegalParagraph>

    <PlatformAndAccounts />
    <ContentPaymentsAndRecords />
    <UseEnforcementAndProviders />
    <LegalRiskAndClosing />
  </>
);
