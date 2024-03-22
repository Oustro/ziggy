import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Priacy Policy | Ziggy",
}

export default function Legal() {

  const privacy = [
    {
      title: "Introduction",
      content: [
        'Welcome to Ziggy, a product developed and operated by Oustro, LLC ("Oustro", "we", "us", or "our"). Ziggy is an AI-powered tool designed to facilitate the gathering of feedback through unstructured feedback and discovery interviews and provides analytical tools to help teams understand this data.',
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

  return (
    <main className="px-8 sm:px-24">
      <h1 className="text-4xl sm:text-5xl font-semibold text-center mt-12">Privacy Policy</h1>
      <p className="text-slate-600 mt-6 text-center">Effective date: 3/8/2024</p>
      {privacy.map((section, index) => (
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