import Manufacturer from '../../../../models/manufacturerModel'
import connectDB from '../../../../helper/connectDB';
import { NextResponse } from 'next/server';


connectDB();

export async function GET(request) {

    try {
        const data = await Manufacturer.find();
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('query')
        const filteredData = data.filter((medicine) => {
            return medicine.medicineName.toLowerCase().includes(query.toLowerCase());
        })
        return NextResponse.json(filteredData);
    } catch (error) {
        console.log("Failed to get All the Medicines", error);
        return NextResponse.json({
            message: "Failed to find the Medicines",
            success: false,
        })
    }
}