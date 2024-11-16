import nodemailer from "nodemailer";

type emailDetails = {
    myBody: string;
    myEmail: string;
};

const sendMail = async ({ myBody, myEmail }: emailDetails) => {
  try {
  const { EmailAuth, EmailAuthAPassword } = process.env;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EmailAuth,
      pass: EmailAuthAPassword,
    },
  });
  
  
  const info = await transporter.sendMail({
    from: '"Oluyemi 👻" <adedokunoluyemi1@gmail.com>',
    to: myEmail,
    subject: "Email Confirmation",
    html: myBody,
  });
  console.log("Message sent: %s", info.messageId);
} catch (error) {
    console.log(error);
    
}
}

export default sendMail;
