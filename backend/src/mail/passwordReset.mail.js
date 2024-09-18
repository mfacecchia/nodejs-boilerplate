import { configureMailingSystem } from "./configure.mail.js";
import { renderEjs } from "../utils/ejsRenderer.utility.js";
import 'dotenv/config';
import AppError, { EmailSendError } from "../errors/custom.errors.js";
import { generateCode } from "../utils/codesManagement.utility.js";
import { logError } from "../errors/errorHandler.errors.js";


export default async function sendPasswordResetEmail(userID, recipient, firstName, lastName){
    let transporter;
    try{
        const keyName = 'passwordReset';
        transporter = await configureMailingSystem();
        // Generating user email verification code & storing in Redis storage (10' expiry)
        const passwordResetData = await generateCode(keyName, userID);
        const resetLink = passwordResetData.link;
        // Rendering HTML template with all the data passed as function arguments
        const renderedHTMLTemplate = renderEjs(`src/mail/templates/passwordReset.mail.template.ejs`, {firstName: firstName, lastName: lastName, resetLink: resetLink});
        transporter.sendMail({
            from: `My new app Mailing System <${process.env.MAILING_SYSTEM_ADDRESS}>`,
            to: recipient,
            subject: "Reset your password",
            text: `Hello, ${firstName + ' ' + lastName}!\n\nWhat am I receiving this Email for?\nThis Email has been automatically sent by our system after a request from you for a new password reset code. If it wasn't you making the request, then you don't have to do anything, otherwise please follow this link to reset your password.\n${resetLink}\nPlease note that the code is valid for just 10 minutes for security purposes. After the token becomes invalid, you will need to request a new one.\n\nFrom the bottom of our heart 🖤\n- My new application`,
            html: renderedHTMLTemplate,
            attachments: [
                
            ]
        }, (err, info) => {
            if(err) throw new EmailSendError("Error while sending reset code Email.");
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