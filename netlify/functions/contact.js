
// This is the Netlify function that handles the contact form submission

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the JSON body
    const body = JSON.parse(event.body);
    const { name, email, subject, message, formType } = body;

    // Validate the data based on form type
    if (formType === 'contact' && (!name || !email || !message)) {
      return { statusCode: 400, body: 'Please provide name, email, and message' };
    } else if (formType === 'newsletter' && !email) {
      return { statusCode: 400, body: 'Please provide email' };
    }

    // Log based on form type
    if (formType === 'contact') {
      console.log('Contact form submission:', { name, email, subject, message });
      
      // Here you would configure your email service to send a notification
      // Examples below using a service like Nodemailer or a transactional email service

      /*
      // Example with Nodemailer (you'd need to add this dependency)
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      await transporter.sendMail({
        from: `"Contact Form" <${process.env.EMAIL_USER}>`,
        to: "marcjanerferrer@gmail.com",
        subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong> ${message}</p>`
      });
      */

      /*
      // Alternative with AWS SES:
      const AWS = require('aws-sdk');
      const ses = new AWS.SES({ region: 'your-region' });
      
      await ses.sendEmail({
        Source: 'your-verified-email@example.com',
        Destination: { ToAddresses: ['marcjanerferrer@gmail.com'] },
        Message: {
          Subject: { Data: `New Contact Form Submission: ${subject || 'No Subject'}` },
          Body: {
            Text: { Data: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}` },
            Html: { Data: `<p><strong>Name:</strong> ${name}</p>
                          <p><strong>Email:</strong> ${email}</p>
                          <p><strong>Message:</strong> ${message}</p>` }
          }
        }
      }).promise();
      */
      
    } else if (formType === 'newsletter') {
      console.log('Newsletter subscription:', { email });
      
      // Similar email sending code for newsletter notifications
      /*
      // Example with Nodemailer
      await transporter.sendMail({
        from: `"Newsletter" <${process.env.EMAIL_USER}>`,
        to: "marcjanerferrer@gmail.com",
        subject: `New Newsletter Subscription`,
        text: `Email: ${email} has subscribed to your newsletter.`,
        html: `<p><strong>Email:</strong> ${email} has subscribed to your newsletter.</p>`
      });
      */
    }

    // Return success
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: formType === 'contact' 
          ? 'Your message has been sent successfully!' 
          : 'Thank you for subscribing to the newsletter!'
      })
    };
  } catch (error) {
    console.error('Error processing form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error: ' + error.message })
    };
  }
};
