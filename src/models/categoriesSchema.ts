import mongoose, { Schema, Model, Document } from "mongoose";

interface TIndividualCategory extends Document {
  color: string;
  icon: string;
  category: string;
  transactionCount: number;
  type: string;
}

interface TCategories extends Document {
  id: mongoose.Types.ObjectId;
  expenses: TIndividualCategory[];
  income: TIndividualCategory[];
}

const individualCategorySchema: Schema<TIndividualCategory> = new Schema({
  color: { type: String, required: true },
  icon: { type: String, required: true },
  category: { type: String, required: true },
  transactionCount: { type: Number, required: true },
  type: { type: String, required: true },
});

const categoriesSchema: Schema<TCategories> = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  expenses: [individualCategorySchema],
  income: [individualCategorySchema],
});

export const Categories: Model<TCategories> = mongoose.model<TCategories>(
  "categories",
  categoriesSchema
);
