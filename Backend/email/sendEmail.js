import { transporter } from "./emailConfig.js";
import { Verification_Email_Template } from "./emailTemplate.js";

export const sendVerifiactiponEmail =async(email , verficationCode)=>{
try {
    const response =   await transporter.sendMail({
        from: '"JOBFIT AI" <jobfitai8@gmail.com>',
        to: email,
        subject: "Verify your email",
        text: "Verify your email", // plain‑text body
        html: Verification_Email_Template.replace("{verificationCode}",verficationCode), // HTML body
        });

        if (response) {
            console.log("email sent  sucessfully",response)
            return true
        }
} catch (error) {
    console.log("eror in send verification email",error)
    return false
}

}
