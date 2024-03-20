import { Client } from "postmark"

export async function customSendVerificationRequest(params: any) {
  const { identifier, url, provider } = params

  const postmarkClient = new Client(process.env.EMAIL_SERVER_PASSWORD as string)
  await postmarkClient.sendEmail({
    "From": process.env.EMAIL_FROM as string,
    "To": identifier,
    "Subject": "Ziggy Magic Link",
    "TextBody": text({ url }),
    "HtmlBody": html({ url })
  })
}

function html(params: { url: string }) {
  const { url } = params

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #ffffff;
          padding: 20px;
        }
        h2, p {
          color: black !important;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #dddddd;
          border-radius: 5px;
        }
        .button {
          background-color: black;
          color: white !important;
          padding: 8px 8px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          margin: 10px 0;
        }
        .footer {
          font-size: 12px;
          text-align: center;
          margin-top: 20px;
        }
        .user-icon {
          display: block;
          margin: 0 auto;
          width: 100px;
          margin-bottom: 50px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>And we meet again,</h2>
        <p><a href="${url}" class="button">Click here to log in</a></p>
        <p>Or, copy and paste this temporary login code:</p>
        <a href="${url}">${url}</a>
        <p class="footer">If you didn't try to login, you can safely ignore this email.</p>
      </div>
    </body>
  </html>
  `
}

function text({ url }: { url: string }) {
  return `Sign in to Ziggy:\n${url}\n\n`
}