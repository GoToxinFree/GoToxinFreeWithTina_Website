const nodemailer = require('nodemailer');
const path = require('path');

// Load environment variables using built-in Node 20+ feature
const envPath = path.join(__dirname, '../.env');
try {
  process.loadEnvFile(envPath);
} catch (e) {
  console.log("Could not load .env with process.loadEnvFile, trying manually...", e.message);
}

const EMAIL_SERVER = process.env.EMAIL_SERVER;
const EMAIL_FROM = process.env.EMAIL_FROM;

if (!EMAIL_SERVER) {
  console.error("No EMAIL_SERVER found in .env");
  process.exit(1);
}

console.log('Using EMAIL_SERVER:', EMAIL_SERVER.replace(/:([^:]+)@/, ':***@'));
console.log('Using EMAIL_FROM:', EMAIL_FROM);

const transporter = nodemailer.createTransport(EMAIL_SERVER);

async function sendSampleEmail() {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to: 'suthar7777@gmail.com',
      subject: 'Test Email from Go Toxin Free With Tina',
      text: 'Hello! This is a test email sent using the SMTP credentials in your .env file.',
      html: '<h3>Hello!</h3><p>This is a test email sent using the SMTP credentials in your <code>.env</code> file.</p>'
    });

    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendSampleEmail();
