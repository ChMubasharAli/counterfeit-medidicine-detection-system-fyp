import nodemailer from 'nodemailer';

export const sendVerificationEmail = async ({ email, name }) => {
    try {


        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "sherijatt68@gmail.com",
                pass: "gwea pukb cywn ecfe"
            }
        });


        const mailOptions = {
            from: "sherijatt68@gmail.com",
            to: email,
            subject: "Verification Email send successfully",
            html: `<p> <span>Hello "${name}",</span> 
                        <br>
                        Your signup request has been successfully verified by the admin. You can now log in to your account.
                    </p>`
        }

        await transport.sendMail(mailOptions)
        console.log("Verification email send successfully")

    } catch (error) {
        console.log("Error while sendigng Verification Email :: ", error)
    }
}

export default sendVerificationEmail;