import { connectDB } from "../../../helper/connectDB";
import User from "../../../models/userModel";
import { NextResponse } from "next/server";

connectDB()

export async function GET() {
    try {
        const distirbutors = await User.find({ role: "distributor" })
        return NextResponse.json({ distirbutors })
    } catch (error) {
        console.log("Error while fetching the Distributors: ", error)
        return NextResponse.json({ message: "Failed to get distibutors" })
    }
}