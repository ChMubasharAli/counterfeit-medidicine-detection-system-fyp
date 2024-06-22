import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../../helper/connectDB";
import User from "../../../../../../models/userModel";
import sendVerificationEmail from '../../../../../../helper/sendVerificationEmail'

connectDB();

// This API will responsible for get the particular user and update it as VERIFIED USER 
export async function GET(request: NextRequest, context: any) {
    const { params } = context;
    const userId = params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({
                message: "User not find in database ",
            })
        }

        if (user.isVerified === true) {
            return NextResponse.json({
                message: "User already verified ",
            })
        }

        user.isVerified = true;

        // send Verification email 
        sendVerificationEmail({ email: user.email, name: user.name })
        await user.save();

        return NextResponse.json({
            message: "User verified successfully ",
            userId: params.userId,
        })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to get User ",
        })
    }
}

export async function DELETE(request: NextRequest, context: any) {
    const { params } = context;
    const userId = params.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return NextResponse.json({
                message: "User not find in database ",
            })
        }
        return NextResponse.json({
            message: "User deleted successfully ",
            userId: params.userId,
        })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to delete User ",
        })
    }
}

