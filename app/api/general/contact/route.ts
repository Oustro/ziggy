import { NextResponse, NextRequest } from 'next/server'

import { Client } from "postmark"


export async function POST(request: NextRequest) {
  const contactInfo = await request.json() as { name: string, email: string, reason: string }

  try {

    const postmarkClient = new Client(process.env.EMAIL_SERVER_PASSWORD as string)
    await postmarkClient.sendEmail({
      "From": process.env.EMAIL_FROM as string,
      "To": "support@useziggy.com",
      "Subject": "Contact Us: " + contactInfo.reason,
      "TextBody": "Name: " + contactInfo.name + "\nEmail: " + contactInfo.email + "\nReason: " + contactInfo.reason
    })


    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}