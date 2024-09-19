import { configureMailingSystem } from "./configure.mail.js";
import { renderEjs } from "../utils/ejsRenderer.utility.js";
import 'dotenv/config';
import AppError, { EmailSendError } from "../errors/custom.errors.js";
import { generateCode } from "../utils/codesManagement.utility.js";
import { logError } from "../errors/errorHandler.errors.js";


export default async function sendWelcomeEmail(userID, recipient, firstName, lastName){
    let transporter;
    try{
        const keyName = 'emailVerification';
        transporter = await configureMailingSystem();
        // Generating user email verification code & storing in Redis storage (10' expiry)
        const emailVerificationData = await generateCode(keyName, userID);
        const verificationLink = emailVerificationData.link
        // Rendering HTML template with all the data passed as function arguments
        const renderedHTMLTemplate = renderEjs(`src/mail/templates/welcome.mail.template.ejs`, {firstName: firstName, lastName: lastName, appDomain: `${process.env.FRONTEND_ADDRESS}:${process.env.FRONTEND_PORT}`, verificationLink: verificationLink});
        transporter.sendMail({
            from: `My new app Mailing System <${process.env.MAILING_SYSTEM_ADDRESS}>`,
            to: recipient,
            subject: "Welcome to My new app!",
            text: `Welcome aboard, ${firstName + ' ' + lastName}!\n\nImportant notice:\nIn order to be able to access all application's functionalities, the system requires each user to verify the registered email. Please follow this link to verify your email => ${verificationLink}\nPlease note that the code is valid for just 10 minutes for security purposes. After the token becomes invalid, you will need to request a new one.\n\nFrom the bottom of our heart 🖤\n- My new app`,
            html: renderedHTMLTemplate,
            attachments: [
                
            ]
        }, (err, info) => {
            if(err) throw new EmailSendError("Error while sending welcome email.");
        });
    }catch(err){
        if(err instanceof AppError) throw err;
        else throw new EmailSendError("Could not send email.");
    }finally{
        // Closing connection to avoid memory leaks
        transporter = undefined;
    }
}