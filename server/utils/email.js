const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `Ahmad Mohammadirad <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send actual email
  async send(subject, text) {
    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      'Welcome to The Funtalk Family!',
      `Hi, Dear ${this.name}\nWe are glad you joined our family, hope you have a good time🤗.`
    );
  }

  async sendPasswordReset() {
    await this.send(
      'Your password reset token (valid for 10 only minutes)',
      `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${this.url}\nIf you didn't forget your password, please ignore this email!`
    );
  }
};
