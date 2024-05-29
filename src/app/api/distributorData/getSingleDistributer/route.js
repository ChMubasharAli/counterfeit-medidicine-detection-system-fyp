import connectDB from "../../../../helper/connectDB";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { distributerid } = reqBody;
        const distributer = await User.findById(distributerid)
        if (!distributer) {
            console.log("No user found:: /api/distributorData/getSingleDistributer ")
            return NextResponse.json({
                message: "No Distributer found"
            })
        }

        return NextResponse.json({
            distributer: distributer,
        })
    } catch (error) {
        console.log("Error accure in :: /api/distributorData/getSingleDistributer ")
        return NextResponse.json({
            message: "Failed to get Distributer"
        })
    }
}