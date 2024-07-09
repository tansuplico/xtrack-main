import mongoose, { Schema, Model, Document } from "mongoose";

interface TWallet extends Document {
  id: mongoose.Types.ObjectId;
  income: number;
  expense: number;
  balance: number;
  incomeChanges: Array<{ date: Date; value: number }>;
  currentIncome: number;
  initialBalance: number;
}

const walletSchema: Schema<TWallet> = new Schema({
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

export const Wallet: Model<TWallet> = mongoose.model<TWallet>(
  "wallet",
  walletSchema
);
