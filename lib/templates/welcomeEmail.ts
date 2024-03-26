export function html() {
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
          line-height: 30px;
          margin-top: 35px;
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
        .promo {
          padding: 4px;
          border-radius: 5px;
          background-color: #E5E7EB; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Ziggy!</h1>
        <p>
         My name is Jacob, and I am the founder of Ziggy. I just wanted to reach out to you and be the first to welcome you to Ziggy!
        </p>
        <p>
         We're thrilled that you're here and to celebrate, we want to offer you 200 free Ziggy interviews. Simply use the promo code <span class="promo">LAUNCH</span> at the checkout when upgrading or creating your team.
        </p>
        <p>During this time, you may encounter some bugs and we're working hard to fix all of them, so if you complete this <span><a href="https://www.useziggy.com/zy/MtAp-d7ebzylr">feedback</a></span> interview with Ziggy we would really appreciate it.</p>
        
        <p>If you need anything, please feel free to contact us at howdy@useziggy.com or set up a 15-minute meeting with me to discuss any plans or get a demo of Ziggy <span><a href="https://cal.com/ziggy">here.</a></span></p>
        <p>Thanks,</p>
        <p>Jacob<br /> Founder, CEO</p>
        <p class="footer">© 2024 Oustro, LLC</p>
      </div>
    </body>
  </html>
  `
}

export function text() {
  return `
  Welcome to Ziggy!

  My name is Jacob, and I am the founder of Ziggy. I just wanted to reach out to you and be the first to welcome you to Ziggy!

  We're thrilled that you're here and to celebrate, we want to offer you 200 free Ziggy interviews. Simply use the promo code LAUNCH at the checkout when upgrading or creating your team.

  During this time, you may encounter some bugs and we're working hard to fix all of them, so if you complete this feedback interview with Ziggy we would really appreciate it. This can be found on the dashboard page under FEEDBACK.

  If you need anything, please feel free to contact us at howdy@useziggy.com or set up a 15-minute meeting with me to discuss any plans or get a demo of Ziggy https://cal.com/ziggy.

  Thanks,

  Jacob
  Founder, CEO
  `
}