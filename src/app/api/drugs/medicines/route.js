import Manufacturer from '../../../../models/manufacturerModel'
import connectDB from '../../../../helper/connectDB';
import { NextResponse } from 'next/server';


connectDB();

export async function GET() {

    try {
        const data = await Manufacturer.find();
        return NextResponse.json(data);
    } catch (error) {
        console.log("Failed to get All the Medicines", error);
        return NextResponse.json({
            message: "Failed to find the Medicines",
            success: false,
        })
    }
}