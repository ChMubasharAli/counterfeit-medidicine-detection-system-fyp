import nodemailer from 'nodemailer';

export const sendRegistrationEmail = async ({ email, name }) => {
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
            subject: "Signup request send successfully",
            html: `<p> <span>Hello "${name}",</span> 
                        <br>
                        Your signup request has been successfully sent to the admin. Once the admin verifies it, you will be able to log in.    
                    </p>`
        }

        await transport.sendMail(mailOptions)
        console.log("Registration email send successfully")

    } catch (error) {
        console.log("Error while sendigng Registraion Email :: ", error)
    }
}