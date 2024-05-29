import Distributor from "../../../../models/distributorModel";
import { connectDB } from "../../../../helper/connectDB";
import { NextResponse } from "next/server";


connectDB()

// Ye function uss data ko show kary ga jo k aik manufacturer nay distributer ko send kia tha 
export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { pharmacyId } = reqBody;
        console.log("Pharmact id is : ", pharmacyId)
        const response = await Distributor.find({
            pharmacyid: pharmacyId
        })
        return NextResponse.json({
            response: response
        })
    } catch (error) {
        console.log("Failed to get Distributor Data in Pharmacy : ", error)
        return NextResponse.json({
            message: "Failed to get Data"
        })
    }
}