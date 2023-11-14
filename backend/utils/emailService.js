const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

const sendRegistrationEmail = async (receipientEmail, registrationLink) => {

    const transporter = nodemailer.createTransport({ //create reusable transporter object using the default SMTP transport
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    //email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receipientEmail,
        subject: 'Complete your registration',
        html: `<p>Click <a href="${registrationLink}">here</a> to complete your registration</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (err) {
        console.error('Error sending email: ',err);
    }
 };

module.exports = { sendRegistrationEmail }; 