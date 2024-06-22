import nodemailer from 'nodemailer';

export const sendEmailToDistributor = async ({ email, manufacturer, distributor }) => {
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
            subject: `${manufacturer} send you some medicines`,
            html: `<p> <span>Hello ${distributor}",</span> 
                        <br>
                        ${manufacturer} send you some Medicine data. Kindly login into your account and check the details.
                        <br>
                          
                        <span>Thank You !</span> 
                    </p>`
        }

        await transport.sendMail(mailOptions)
        console.log("Send Email to Distributor successfully")

    } catch (error) {
        console.log("Error while sendigng Email to Distributor :: ", error)
    }
}