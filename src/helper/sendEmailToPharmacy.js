import nodemailer from 'nodemailer';

export const sendEmailToPharmacy = async ({ email, distributor, pharmacy }) => {
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
            subject: `${distributor} send you some medicines`,
            html: `<p> <span>Hello ${pharmacy}",</span> 
                        <br>
                        ${distributor} send you some Medicine data. Kindly login into your account and check the details.
                        <br>
                          
                        <span>Thank You !</span> 
                    </p>`
        }

        await transport.sendMail(mailOptions)
        console.log("Send Email to Pharmacy successfully")

    } catch (error) {
        console.log("Error while sendigng Email to Pharmacy :: ", error)
    }
}