import { connectDB } from "../../../helper/connectDB";
import User from "../../../models/userModel";
import { NextResponse } from "next/server";

connectDB()

export async function GET() {
    try {
        const pharmacies = await User.find({ role: "pharmacy" })
        return NextResponse.json({ pharmacies })
    } catch (error) {
        console.log("Error while fetching the Pharmacies: ", error)
        return NextResponse.json({ message: "Failed to get Pharmacies" })
    }
}