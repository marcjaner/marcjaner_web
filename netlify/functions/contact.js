
// This is the Netlify function that handles the contact form submission

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the JSON body
    const body = JSON.parse(event.body);
    const { name, email, subject, message } = body;

    // Validate the data
    if (!name || !email || !message) {
      return { statusCode: 400, body: 'Please provide name, email, and message' };
    }

    // Here you would typically send an email using a service like SendGrid, Mailgun, etc.
    // For this example, we'll just log the data and return a success message
    console.log('Contact form submission:', { name, email, subject, message });

    // Example for setting up with a service like Nodemailer (you'd need to add this dependency)
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.example.com',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });
    //
    // await transporter.sendMail({
    //   from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    //   to: "marcjanerferrer@gmail.com",
    //   subject: `Contact Form: ${subject || 'New message'}`,
    //   text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
    //   html: `<p><strong>Name:</strong> ${name}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Message:</strong> ${message}</p>`
    // });

    return {
      statusCode: 200,
      body: 'Message sent successfully!'
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error: ' + error.message
    };
  }
};
