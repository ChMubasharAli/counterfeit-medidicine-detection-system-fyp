import Distributor from '../../../../../models/distributorModel'
import { connectDB } from '../../../../../helper/connectDB';
import { NextResponse } from 'next/server';


connectDB();

export async function POST(request) {
    const { email } = await request.json();


    try {
        const pharmacyRecord = await Distributor.find({ pharmacyEmail: email });
        return NextResponse.json({
            success: "true",
            pharmacyRecord

        })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to get Pharmacy Data",
            success: "false",

        })
    }

}