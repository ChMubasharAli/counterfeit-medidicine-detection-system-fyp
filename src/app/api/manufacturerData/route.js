import manufacturer from "../../pages/manufacturer/page";
import { connectDB } from "../../../helper/connectDB";
import Manufacturer from "../../../models/manufacturerModel";
import OnlyManufacturer from "../../../models/onlyManufacturerModel";
import { NextResponse } from "next/server";



connectDB()


// This function will be responsible for data insertion into the database related to the particular Manufacturer 
export async function POST(request) {
    try {

        // getting data from the frond end which is user information {name,email, password, ...}
        const reqBody = await request.json()
        const {
            medicineName,
            serialNumber,
            dosageForm,
            expiryDate,
            manufactureDate,
            quantity,
            qrImage,
            distributerEmail,
            manufacturerid,
            manufacturername,
        } = reqBody

        console.log(reqBody);

        //check if user already exists

        const newItem = new Manufacturer({
            medicineName,
            serialNumber,
            dosageForm,
            expiryDate,
            manufactureDate,
            quantity,
            qrImage,
            manufacturerid,
            distributerEmail,
            manufacturername
        })



        const item = new OnlyManufacturer({
            medicineName,
            serialNumber,
            dosageForm,
            expiryDate,
            manufactureDate,
            quantity,
            qrImage,
            manufacturerid,
            distributerEmail,
            manufacturername
        })

        await item.save();
        await newItem.save()
        // console.log(savedItem);


        return NextResponse.json({
            message: "Data Saved successfully",
            success: true,
        })




    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 })

    }
}

// This function will update the medicine quantity when the distributer will distribute the quantity of the medicine 

export async function PUT(request) {
    try {
        // getting data from the front end which is user information {name, email, password, ...}
        const reqBody = await request.json();
        const { _id, distributedQuantity } = reqBody;

        // Check if the medicine exists
        const medicine = await Manufacturer.findOne({ _id });
        if (medicine) {
            // Convert quantities to numbers
            const medicineQuantity = Number(medicine.quantity);
            const distQuantity = Number(distributedQuantity);

            // Check types after conversion
            console.log("Quantity Types are: ", typeof medicineQuantity, typeof distQuantity);

            // Perform the subtraction
            const updatedQuantity = medicineQuantity - distQuantity;

            // Optionally, update the medicine's quantity in the database
            medicine.quantity = updatedQuantity.toString(); // Convert back to string if needed
            await medicine.save();

            return NextResponse.json({
                message: "Quantity updated successfully",
                success: true,
                updatedQuantity,
            });
        } else {
            return NextResponse.json({
                message: "Medicine not found",
                success: false,
            }, { status: 404 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}









