import { connectDB } from "../../../helper/connectDB";
import { NextResponse } from "next/server";
import User from "../../../models/userModel"
import { sendEmailToPharmacy } from "../../../helper/sendEmailToPharmacy";
import Distributor from "../../../models/distributorModel";


connectDB()


// This function will be responsible for data insertion into the database related to the particular Manufacturer 
export async function POST(request) {
    try {

        // getting data from the frond end which is user information {name,email, password, ...}
        const reqBody = await request.json()
        const { distributedQuantity, distributerEmail, serialNumber, pharmacyEmail, medicineName, qrImage, expiryDate, manufactureDate, dosageForm } = reqBody

        console.log("Req body of Distributed Data", reqBody);


        // finding the pharmacy and distributor details from the database 
        const pharmacy = await User.findOne({ email: pharmacyEmail });
        const distributor = await User.findOne({ email: distributerEmail });

        const newItem = new Distributor({
            distributedQuantity, distributerEmail, serialNumber, dosageForm, pharmacyEmail, medicineName, qrImage, expiryDate, manufactureDate,
        })

        await newItem.save()
        sendEmailToPharmacy({ email: pharmacy.email, distributor: distributor.name, pharmacy: pharmacy.name });


        return NextResponse.json({
            message: "Data Distributed successfully",
            success: true,
        })




    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 })

    }
}

// This function will get the distributed data and show on the Frontend 








