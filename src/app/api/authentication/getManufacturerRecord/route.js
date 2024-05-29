import OnlyManufacturer from '../../../../models/onlyManufacturerModel';
import connectDB from '../../../../helper/connectDB'
import { NextResponse } from 'next/server';


connectDB();
export async function POST(request) {

    const reqBody = await request.json();
    const { serialNumber } = reqBody;

    try {
        const manufacturerRecord = await OnlyManufacturer.findOne({ serialNumber })
        return NextResponse.json(manufacturerRecord);

    } catch (error) {
        console.log("Failed to get Manufacturer Record ", error);
        return NextResponse.json({
            message: "Failed to get Manufacturer Record"
        });
    }
}