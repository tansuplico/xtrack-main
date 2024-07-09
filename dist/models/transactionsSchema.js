import mongoose, { Schema } from "mongoose";
const individualCategorySchema = new Schema({
    icon: { type: String, required: true },
    color: { type: String, required: true },
    category: { type: String, required: true },
    transactionCount: { type: Number, required: true },
    type: { type: String, required: true },
});
const individualTransactionSchema = new Schema({
    categoryData: { type: individualCategorySchema, required: true },
    amount: { type: Number, required: true },
    date: { type: Date || null, required: true },
    currency: { type: String, required: true },
});
const transactionsSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    history: { type: [individualTransactionSchema], required: true },
});
export const Transactions = mongoose.model("transactions", transactionsSchema);
