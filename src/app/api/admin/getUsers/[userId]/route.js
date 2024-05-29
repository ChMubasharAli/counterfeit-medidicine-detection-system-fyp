import User from "../../../../../models/userModel";
import { connectDB } from "../../../../../helper/connectDB";
import { NextResponse } from "next/server";


connectDB();


export async function DELETE(request, { params }) {

    const { userId } = params;
    try {
        await User.findByIdAndDelete({ _id: userId })
        return NextResponse.json({
            message: "Deleted successfully",
            success: true,
        })
    } catch (error) {
        console.log("Error in Deleting data in route /api/admin/getPharmacy/[pharmacyId] : ", error)
        return NextResponse.json({
            message: "Deletion Failed!",
            success: false,
        })
    }
}
