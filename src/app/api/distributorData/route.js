import { connectDB } from "../../../helper/connectDB";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Distributor from "../../../models/distributorModel";


connectDB()


// This function will be responsible for data insertion into the database related to the particular Manufacturer 
export async function POST(request) {
    try {

        // getting data from the frond end which is user information {name,email, password, ...}
        const reqBody = await request.json()
        const { distributedQuantity, distributerEmail, serialNumber, pharmacyEmail, medicineName, qrImage, expiryDate, manufactureDate, dosageForm } = reqBody

        console.log("Req body of Distributed Data", reqBody);


        const newItem = new Distributor({
            distributedQuantity, distributerEmail, serialNumber, dosageForm, pharmacyEmail, medicineName, qrImage, expiryDate, manufactureDate,
        })

        await newItem.save()


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








