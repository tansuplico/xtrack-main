import mongoose, { Schema, Model, Document } from "mongoose";

interface TIndividualCategory extends Document {
  icon: string;
  color: string;
  category: string;
  transactionCount: number;
  type: string;
}

interface TIndividualTransaction extends Document {
  categoryData: TIndividualCategory;
  amount: number;
  date: Date | null;
  currency: string;
}

interface TTransactions extends Document {
  id: mongoose.Types.ObjectId;
  history: TIndividualTransaction[];
}

const individualCategorySchema: Schema<TIndividualCategory> = new Schema({
  icon: { type: String, required: true },
  color: { type: String, required: true },
  category: { type: String, required: true },
  transactionCount: { type: Number, required: true },
  type: { type: String, required: true },
});

const individualTransactionSchema: Schema<TIndividualTransaction> = new Schema({
  categoryData: { type: individualCategorySchema, required: true },
  amount: { type: Number, required: true },
  date: { type: Date || null, required: true },
  currency: { type: String, required: true },
});

const transactionsSchema: Schema<TTransactions> = new Schema({
  id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  history: { type: [individualTransactionSchema], required: true },
});

export const Transactions: Model<TTransactions> = mongoose.model<TTransactions>(
  "transactions",
  transactionsSchema
);
