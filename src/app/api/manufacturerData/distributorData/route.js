import Manufacturer from "../../../../models/manufacturerModel";
import { connectDB } from "../../../../helper/connectDB";
import { NextResponse } from "next/server";


connectDB()

// Ye function uss data ko show kary ga jo k aik manufacturer nay distributer ko send kia tha 
export async function POST(request) {


    try {
        const reqBody = await request.json()
        console.log(reqBody);
        const { distributorEmail } = reqBody;
        console.log("Distributor Email is : ", distributorEmail)
        const response = await Manufacturer.find({ distributerEmail: distributorEmail })
        return NextResponse.json({
            response: response
        })
    } catch (error) {
        console.log("Failed to get Manufacturer Data in Distributer : ", error)
        return NextResponse.json({
            message: "Failed to get Data"
        })
    }
}