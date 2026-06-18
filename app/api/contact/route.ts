import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // This is a default sending address for the free tier
      to: ["skasifahmedofficial@gmail.com"],
      subject: `New message from ${name}`,
      html: `
        <h2>New message from your portfolio contact form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error sending email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}