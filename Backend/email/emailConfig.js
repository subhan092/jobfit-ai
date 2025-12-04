import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "jobfitai8@gmail.com",
    pass: "ohgi oven jjrz awom",
  },
});

// (async () => {
//   const info = await transporter.sendMail({
//     from: '"JOBFIT AI" <jobfitai8@gmail.com>',
//     to: "subhanzaheer106@gmail.com",
//     subject: "Hello ✔",
//     text: "Hello world?", // plain‑text body
//     html: "<b>Hello world?</b>", // HTML body
//   });

//   console.log("Message sent:", info.messageId);
// })();