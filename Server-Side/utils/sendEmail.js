import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:Number(process.env.SMTP_PORT),
    secure:Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    if (!to || typeof to !== "string") {
        throw new Error("Invalid recipient email");
    }

    await transporter.sendMail({
        from:`smile care <${process.env.ADMIN_MAIL}>`,
        to,
        subject,
        html,
    });
};
