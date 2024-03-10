export default function Legal() {

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
      <h1 className="text-4xl sm:text-5xl font-semibold text-center mt-12">Terms of Service</h1>
      <p className="text-slate-600 mt-6 text-center">Effective date: 3/8/2024</p>
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