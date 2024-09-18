import nodemailer from 'nodemailer';
import 'dotenv/config';
import { MailingSystemConnectionError } from '../errors/custom.errors.js';


export async function configureMailingSystem(){
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });
    if(!(await isMailingSystemReady(transporter))) throw new MailingSystemConnectionError('Failed connection to mailing system service.');
    return transporter;
}

export function isMailingSystemReady(transporter){
    return new Promise((resolve, reject) => {
        transporter.verify(function (err, success) {
            if(err) resolve(false)
            else resolve(true)
        });
    });
}