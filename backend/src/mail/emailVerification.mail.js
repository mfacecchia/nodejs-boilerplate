import { configureMailingSystem } from "./configure.mail.js";
import { renderEjs } from "../utils/ejsRenderer.utility.js";
import 'dotenv/config';
import AppError, { EmailSendError } from "../errors/custom.errors.js";
import { generateCode } from "../utils/codesManagement.utility.js";
import { logError } from "../errors/errorHandler.errors.js";


/**
 * Sends an Email verification mail to the defined `recipient` with the generated `verificationLink`
 * @param {number} userID
 * @param {string} recipient
 * @param {string} firstName
 * @param {string} lastName
 * @throws Custom `EmailSendError`if unable to send email for any reason
 */
export default async function sendEmailVerificationEmail(userID, recipient, firstName, lastName){
    let transporter;
    try{
        const keyName = 'emailVerification';
        transporter = await configureMailingSystem();
        // Generating user email verification code & storing in Redis storage (10' expiry)
        const emailVerificationData = await generateCode(keyName, userID);
        const verificationLink = emailVerificationData.link;
        // Rendering HTML template with all the data passed as function arguments
        const renderedHTMLTemplate = renderEjs(`src/mail/templates/emailVerification.mail.template.ejs`, {firstName: firstName, lastName: lastName, verificationLink: verificationLink});
        transporter.sendMail({
            from: `My new app Mailing System <${process.env.MAILING_SYSTEM_ADDRESS}>`,
            to: recipient,
            subject: "Verify your Email",
            text: `Hello, ${firstName + ' ' + lastName}!\n\nWhat am I receiving this Email for?\nThis Email has been automatically sent by our system after a request from you for a new Email verification code or in case you recently changed your account's Email. If it wasn't you making the request, then you don't have to do anything, otherwise please follow this link to verify your email.\n${verificationLink}\nPlease note that the code is valid for just 10 minutes for security purposes. After the token becomes invalid, you will need to request a new one.\n\nFrom the bottom of our heart 🖤\n- My new application`,
            html: renderedHTMLTemplate,
            attachments: [
                // Add here all your documents and images. For more information visit https://nodemailer.com/message/attachments/
            ]
        }, (err, info) => {
            if(err) throw new EmailSendError("Error while sending verification code Email.");
        });
    }catch(err){
        logError(err);
        if(err instanceof AppError) throw err;
        else throw new EmailSendError("Could not send Email.");
    }finally{
        // Closing connection to avoid memory leaks
        transporter = undefined;
    }
}