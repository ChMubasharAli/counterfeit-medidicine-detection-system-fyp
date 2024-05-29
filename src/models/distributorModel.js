import mongoose from "mongoose";
import { BsDatabaseExclamation } from "react-icons/bs";

const distributorSchema = new mongoose.Schema({



    distributedQuantity: { type: String, required: true },

    distributerEmail: { type: String, required: true },

    serialNumber: { type: String, required: true },

    dosageForm: { type: String, required: true },

    pharmacyEmail: { type: String, required: true },

    medicineName: { type: String, required: true },

    qrImage: { type: String, required: true },

    manufactureDate: { type: Date, required: true },

    expiryDate: { type: Date, required: true },
    // pharmacyid: { type: mongoose.Schema.Types.ObjectId, required: true }

})

const Distributor = mongoose.models.distributorData || mongoose.model("distributorData", distributorSchema);

export default Distributor;