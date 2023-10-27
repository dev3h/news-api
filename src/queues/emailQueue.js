import nodemailer from "nodemailer";
import Queue from "bull";

const emailQueue = new Queue("email", {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
});

emailQueue.process(async (job, done) => {
  const { email, html, subject } = job.data;

  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to: email,
    subject,
    html,
  });

  done();

  return info;
});

export default emailQueue;
