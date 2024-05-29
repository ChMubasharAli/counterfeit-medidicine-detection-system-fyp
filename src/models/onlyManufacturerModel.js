
import mongoose from "mongoose";

const manufacturerSchema = new mongoose.Schema({

    medicineName: { type: String, required: true },
    serialNumber: { type: String, required: true },
    dosageForm: { type: String, required: true },
    manufactureDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    quantity: { type: Number, required: true },
    manufacturername: { type: String, required: true },
    manufacturerid: { type: mongoose.Schema.Types.ObjectId, required: true },
    distributerEmail: { type: String, required: true },
    qrImage: {
        type: String,
        required: [true, "Please provide QR Image"],
    },
    // distributerid: { type: mongoose.Schema.Types.ObjectId, required: true }

})

const OnlyManufacturer = mongoose.models.OnlyManufacturer || mongoose.model("OnlyManufacturer", manufacturerSchema);

export default OnlyManufacturer;