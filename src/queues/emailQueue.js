import nodemailer from "nodemailer";
import Queue from "bull";

const emailQueue = new Queue("email", {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
});

emailQueue.process(async (job, done) => {
  const { to, html, subject } = job.data;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to,
    subject,
    html,
  });

  done();

  return info;
});

export default emailQueue;
