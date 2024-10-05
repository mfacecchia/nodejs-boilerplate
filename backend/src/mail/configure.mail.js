import nodemailer from 'nodemailer';
import 'dotenv/config';
import { MailingSystemConnectionError } from '../errors/custom.errors.js';


/**
 * Initiates a connection with the mailing system through Email/Password combination.
 * The connection is made through secure TLS over port 465.
 * @returns `transporter` Object
 * @throws Custom `MailingSystemConnectionError` if the client cannot connect to provider
 */
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

/**
 * Checks if the `transporter` Object is ready to send emails
 * @param {object} transporter 
 * @returns a `Promise` that resolves with `true` if ready to send emails, otherwise `false`
 */
export function isMailingSystemReady(transporter){
    return new Promise((resolve, reject) => {
        transporter.verify(function (err, success) {
            if(err) resolve(false)
            else resolve(true)
        });
    });
}