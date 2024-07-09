import mongoose, { Schema } from "mongoose";
const walletSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    income: { type: Number, required: true },
    expense: { type: Number, required: true },
    balance: { type: Number, required: true },
    incomeChanges: [
        {
            date: { type: Date, required: true },
            value: { type: Number, required: true },
        },
    ],
    currentIncome: { type: Number, default: 0 },
    initialBalance: { type: Number, default: 0 },
});
export const Wallet = mongoose.model("wallet", walletSchema);
