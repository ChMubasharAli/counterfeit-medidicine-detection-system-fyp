import Distributor from '../../../models/distributorModel'
import { connectDB } from '../../../helper/connectDB';
import { NextResponse } from 'next/server';


connectDB();

export async function POST(request) {
    const { distributorEmail } = await request.json();


    try {
        const distributedRecord = await Distributor.find({ distributerEmail: distributorEmail });
        return NextResponse.json({
            success: "true",
            distributedRecord

        })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to get Distributed Data",
            success: "false",

        })
    }

}