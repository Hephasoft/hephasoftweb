// src/app/api/contact/route.ts

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, company, phone, message, budget } =
      await request.json()

    const emailContent = `
Přišla vám nová zpráva z kontaktního formuláře na webu Hephasoftu:

Jméno: ${name || 'N/A'}
E-mail: ${email || 'N/A'}
Společnost: ${company || 'N/A'}
Telefon: ${phone || 'N/A'}
Budget: ${budget || 'N/A'}

Zpráva:
${message || 'N/A'}
    `

    // Create a Nodemailer transporter using Gmail's SMTP server
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // vbobek@vmark.cc
        pass: process.env.GMAIL_PASS, // your Google App Password
      },
    })

    // Set up mail options.
    // Use the Gmail account as the sender and set replyTo to the user's email.
    const mailOptions = {
      from: process.env.GMAIL_USER, // must be your Gmail account
      replyTo: email, // so replies go to the user who submitted the form
      to: 'tomas@hephasoft.cz', // recipient address
      subject: 'Nová příchozí zpráva z kontaktního formuláře na webu Hephasoft',
      text: emailContent,
      // If you prefer HTML, you can include an html field:
      // html: `<pre>${emailContent}</pre>`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { success: true, message: 'Email byl úspěšně odeslán.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, error: 'Chyba při odesílání emailu.' },
      { status: 500 },
    )
  }
}
