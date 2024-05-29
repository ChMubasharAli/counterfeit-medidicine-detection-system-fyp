import Distributor from '../../../../models/distributorModel'
import connectDB from '../../../../helper/connectDB'
import { NextResponse } from 'next/server';


connectDB();
export async function POST(request) {

    const reqBody = await request.json();
    const { distributorEmail } = reqBody;
    // console.log(distributorEmail)

    try {
        const distributerRecord = await Distributor.find({ distributerEmail: distributorEmail })
        return NextResponse.json(distributerRecord);
    } catch (error) {
        console.log("Failed to get Distributer Record ", error);
        return NextResponse.json({
            message: "Failed to get Distributer Record"
        });
    }
}