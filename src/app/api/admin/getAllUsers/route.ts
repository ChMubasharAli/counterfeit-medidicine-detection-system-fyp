import { connectDB } from "../../../../helper/connectDB";
import { NextResponse } from "next/server";
import User from "../../../../models/userModel";

connectDB();

export async function GET() {
    try {
        const users = await User.find();
        return NextResponse.json({
            users: users,
        })
    } catch (error: any) {
        return NextResponse.json({
            message: "Failed to get Users"
        })
    }
}