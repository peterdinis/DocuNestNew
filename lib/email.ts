import nodemailer from 'nodemailer';

// Set up Mailtrap SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export async function sendInvitationEmail(email: string, workspaceId: string) {
  const mailOptions = {
    from: '"Workspace Invite" <no-reply@yourapp.com>',
    to: email,
    subject: 'You have been invited to a workspace',
    html: `<p>You have been invited to join a workspace. <a href="${process.env.NEXT_PUBLIC_APP_URL}/workspace/${workspaceId}">Click here</a> to access the workspace.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Invitation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending invitation email:', error);
  }
}