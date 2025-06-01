const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: 'gmail',
            auth: {
                user: process.env.YOUR_EMAIL,
                pass: process.env.YOUR_APP_PASSWORD
            }
        });
    }

    async sendVerificationCode(email, code) {
        const mailOptions = {
            from: `"Task Management System" <${process.env.YOUR_EMAIL}>`,
            to: email,
            subject: 'Password Reset Verification Code',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Password Reset</title>
                <style>
                    body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    }
                    .email-container {
                    max-width: 600px;
                    margin: 30px auto;
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    }
                    .email-header {
                    text-align: center;
                    color: #333;
                    }
                    .email-body {
                    margin-top: 20px;
                    font-size: 16px;
                    color: #555;
                    }
                    .code-box {
                    font-size: 28px;
                    font-weight: bold;
                    color: #2a9d8f;
                    background-color: #e0f7f5;
                    padding: 12px;
                    border-radius: 6px;
                    text-align: center;
                    letter-spacing: 4px;
                    margin: 20px auto;
                    width: fit-content;
                    }
                    .footer {
                    margin-top: 30px;
                    font-size: 14px;
                    color: #999;
                    text-align: center;
                    }
                </style>
                </head>
                <body>
                <div class="email-container">
                    <div class="email-header">
                    <h2>Reset Your Password</h2>
                    </div>
                    <div class="email-body">
                    <p>Hello,</p>
                    <p>You requested to reset your password. Use the verification code below:</p>
                    <div class="code-box">${code}</div>
                    <p>This code will expire in <strong>10 minutes</strong>.</p>
                    <p>If you did not request this, please ignore this email or contact our support team.</p>
                    </div>
                </div>
                </body>
                </html>
            `
        };

        await this.transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailService;