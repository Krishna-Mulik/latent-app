import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})

async function sendEmail(sender: string, text: string) {

    const mailOptions = {
        from: process.env.EMAIL,
        to: sender,
        subject: "Test Email from Nodemailer",
        text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

export default sendEmail;
