export default function Legal() {

  const privacy = [
    {
      title: "Introduction",
      content: [
        'Welcome to Ziggy, a product developed and operated by Oustro, LLC ("Oustro", "we", "us", or "our"). Ziggy is an AI-powered tool designed to facilitate the gathering of feedback through unstructured feedback interviews and provides analytical tools to help teams understand this data.',
        'This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Ziggy service (the "Service"). By using the Service, you consent to the collection and use of information in accordance with this policy.'
      ]
    },
    {
      title: "Information Collection and Use",
      content: [
        'We collect several different types of information for various purposes to provide and improve our Service to you. The types of data collected include:',
        'While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:',
        '• Email address',
        '• First name and last name',
        '• Team names and logos',
        '• Interview transcripts',
        '• Interviewee emails',
        '• Team purposes',
        'We collect information directly from you when you provide it to us explicitly on our Site. We do not use third-party cookies on our Site.'
      ]
    },
    {
      title: "Use of Data",
      content: [
        'Oustro, LLC uses the collected data for various purposes:',
        '• To provide and maintain our Service',
        '• To notify you about changes to our Service',
        '• To allow you to participate in interactive features of our Service when you choose to do so',
        '• To provide customer support',
        '• To gather analysis or valuable information so that we can improve our Service',
        '• To monitor the usage of our Service',
        '• To detect, prevent and address technical issues'
      ]
    },
    {
      title: "Disclosure of Data",
      content: [
        'Oustro, LLC may disclose your Personal Data in the good faith belief that such action is necessary to:',
        '• To comply with a legal obligation',
        '• To protect and defend the rights or property of Oustro, LLC',
        '• To prevent or investigate possible wrongdoing in connection with the Service',
        '• To protect the personal safety of users of the Service or the public',
        '• To protect against legal liability',
      ]
    },
    {
      title: "Security of Data",
      content: [
        'The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.',
        'We use encryption to protect your data and regularly monitor our systems for possible vulnerabilities and attacks.'
      ]
    },
    {
      title: "Your Rights and Choices",
      content: [
        'You can access, update, or request deletion of your personal information through your account settings.'
      ]
    },
    {
      title: 'Changes to This Privacy Policy',
      content: [
        'We reserve the right to modify this privacy policy at any time. Changes will be posted on this page with an updated revision date.'
      ]
    },
    {
      title: 'Contact Us',
      content: [
        'If you have any questions about this Privacy Policy, please contact us at support@oustro.xyz.'
      ]
    }
  ]

  const tos = [
    {
      title: "Introduction and Description of Services",
      content: [
        'Welcome to Ziggy, a product developed and operated by Oustro, LLC ("Oustro", "we", "us", or "our"). Ziggy is an AI-powered tool designed to facilitate the gathering of feedback through unstructured feedback interviews and provides analytical tools to help teams understand this data.',
        'This Terms of Service agreement ("Agreement") is a legal agreement between you and Oustro, LLC and governs your use of the Ziggy service (the "Service").',
        'Services may be updated or modified from time to time at our discretion.'
      ]
    },
    {
      title: "Acceptance of Terms",
      content: [
        'By accessing or using the Service, you agree to be bound by this Agreement.'
      ]
    },
    {
      title: 'User Accounts',
      content: [
        '• You must register an account and provide certain information about yourself to access the full functionality of the platform.',
        '• You agree to provide accurate and complete information and keep this information updated.',
        '• You are responsible for maintaining the confidentiality of your account and password and for all activities that occur under your account.',
        '• You agree to notify us immediately of any unauthorized use of your account or password or any other breach of security.',
        '• You are at least 13 years of age.'
      ]
    },
    {
      title: 'User Conduct',
      content: [
        '• You agree not to use the platform in any unlawful manner or in any way that could damage, disable, overburden, or impair the platform.',
        '• You agree not to upload, post, transmit, or share content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.',
        '• You agree not to infringe on the intellectual property rights of others.'
      ]
    },
    {
      title: 'Content Ownership and Intellectual Property Rights',
      content: [       
        '• You retain ownership of the content you submit to the platform.',
        '• By submitting content to the platform, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the content in connection with the Service and our business.'
      ]
    },
    {
      title: 'Termination',
      content: [
        'We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Agreement.'
      ]
    },
    {
      title: 'Disclaimers',
      content: [
        'The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.'
      ]
    },
    {
      title: 'Limitation of Liability',
      content: [
        'Oustro, LLC shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from the use or inability to use the service.'
      ]
    },
    {
      title: 'Changes to This Terms of Service',
      content: [
        'We reserve the right to modify this terms of service at any time. Changes will be posted on this page with an updated revision date.'
      ]
    },
    {
      title: 'Governing Law',
      content: [
        'These terms shall be governed by the laws of the jurisdiction in which Oustro, LLC is established, without regard to its conflict of law provisions.'
      ]
    },
    {
      title: 'Contact Us',
      content: [
        'If you have any questions about this Terms of Service, please contact us at support@oustro.xyz'
      ]
    }
  ]

  return (
    <main className="px-24">
      <h2 className="mt-12 text-4xl font-semibold">Privacy Policy</h2>
      <h3 className="text-slate-600 mt-2">Effective date: 3/8/2024</h3>
      {privacy.map((section, index) => (
        <section key={index} className="mt-8">
          <h4 className="text-2xl font-semibold">{section.title}</h4>
          {section.content.map((paragraph, index) => (
            <p key={index} className="mt-3">{paragraph}</p>
          ))}
        </section>
      ))}
      <h2 className="mt-12 text-4xl font-semibold pt-12 border-t">Terms of Service</h2>
      <h3 className="text-slate-600 mt-2">Effective date: 3/8/2024</h3>
      {tos.map((section, index) => (
        <section key={index} className="mt-8">
          <h4 className="text-2xl font-semibold">{section.title}</h4>
          {section.content.map((paragraph, index) => (
            <p key={index} className="mt-3">{paragraph}</p>
          ))}
        </section>
      ))}
    </main>
  )
}