import mongoose, { Schema } from "mongoose";
const individualCategorySchema = new Schema({
    color: { type: String, required: true },
    icon: { type: String, required: true },
    category: { type: String, required: true },
    transactionCount: { type: Number, required: true },
    type: { type: String, required: true },
});
const categoriesSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true },
    expenses: [individualCategorySchema],
    income: [individualCategorySchema],
});
export const Categories = mongoose.model("categories", categoriesSchema);
