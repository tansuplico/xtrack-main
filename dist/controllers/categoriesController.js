import expressAsyncHandler from "express-async-handler";
import { Categories } from "../models/categoriesSchema.js";
export const fetchCategories = expressAsyncHandler(async (req, res) => {
    try {
        // @ts-ignore
        const user = req.user;
        const category = await Categories.find({ id: user.id });
        if (!category) {
            res.status(404).json({ error: "No category data found" });
            return;
        }
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ error: `A server error has occured: ${err}` });
        return;
    }
});
export const modifyCategories = expressAsyncHandler(async (req, res) => {
    try {
        // @ts-ignore
        const user = req.user;
        const { type, category, existing, newName, newColor, newIcon } = req.body;
        const userCategory = await Categories.findOne({ id: user.id });
        if (!userCategory) {
            res.status(404).json({ error: "User categories not found" });
            return;
        }
        if (type === "Expenses") {
            const find = userCategory?.expenses.find((c) => c.category === category);
            if (!find) {
                res.status(404).json({ error: "Category doesn't exist" });
                return;
            }
            if (newName.length > 18) {
                res.status(404).json({ error: "Category name: 18 characters max." });
                return;
            }
            const similarExp = userCategory?.expenses.find((d) => d.category === newName);
            const similarInc = userCategory?.income.find((d) => d.category === newName);
            if (similarExp || similarInc) {
                res.status(400).json({ error: "Category name already exist" });
                return;
            }
            const updatedCategory = await Categories.findOneAndUpdate({ id: user.id, "expenses.category": category }, {
                $set: {
                    "expenses.$.color": newColor ? newColor : existing.color,
                    "expenses.$.icon": newIcon ? newIcon : existing.icon,
                    "expenses.$.category": newName ? newName : existing.category,
                },
            }, { new: true });
            if (!updatedCategory) {
                res.status(400).json({ error: "Category failed to update" });
                return;
            }
            res.status(200).json({ message: "Category modified" });
            return;
        }
        else if (type === "Income") {
            const find = userCategory?.income.find((c) => c.category === category);
            if (!find) {
                res.status(404).json({ error: "Category doesn't exist" });
                return;
            }
            if (newName.length > 18) {
                res.status(404).json({ error: "Category name: 18 characters max." });
                return;
            }
            const similarExp = userCategory?.expenses.find((d) => d.category === newName);
            const similarInc = userCategory?.income.find((d) => d.category === newName);
            if (similarExp || similarInc) {
                res.status(400).json({ error: "Category name already exist" });
                return;
            }
            const updatedCategory = await Categories.findOneAndUpdate({ id: user.id, "income.category": category }, {
                $set: {
                    "income.$.color": newColor ? newColor : existing.color,
                    "income.$.icon": newIcon ? newIcon : existing.icon,
                    "income.$.category": newName ? newName : existing.category,
                },
            }, { new: true });
            if (!updatedCategory) {
                res.status(400).json({ error: "Category failed to update" });
                return;
            }
            res.status(200).json({ message: "Category modified" });
            return;
        }
    }
    catch (err) {
        res.status(500).json({ error: `A server error has occured: ${err}` });
        return;
    }
});
export const createCategories = expressAsyncHandler(async (req, res) => {
    try {
        // @ts-ignore
        const user = req.user;
        const { colorPicked, iconPicked, categoryName, typePicked } = req.body;
        const userCategory = await Categories.findOne({ id: user.id });
        if (!userCategory) {
            res.status(404).json({ error: "User categories not found" });
            return;
        }
        const categoryData = {
            color: colorPicked,
            icon: iconPicked,
            category: categoryName,
            transactionCount: 0,
            type: typePicked,
        };
        if (!categoryName) {
            res.status(404).json({ error: "Missing category name" });
            return;
        }
        if (categoryName.length > 18) {
            res.status(404).json({ error: "Category name: 18 characters max." });
            return;
        }
        const similarExp = userCategory?.expenses.find((d) => d.category === categoryName);
        const similarInc = userCategory?.income.find((d) => d.category === categoryName);
        if (similarExp || similarInc) {
            res.status(404).json({ error: "Category name already exist." });
            return;
        }
        if (typePicked === "Expenses") {
            const updatedCategory = await Categories.findOneAndUpdate({ id: user.id }, { $push: { expenses: categoryData } }, { new: true });
            if (!updatedCategory) {
                res.status(400).json({ error: "Failed to add category" });
                return;
            }
        }
        else if (typePicked === "Income") {
            const updatedCategory = await Categories.findOneAndUpdate({ id: user.id }, { $push: { income: categoryData } }, { new: true });
            if (!updatedCategory) {
                res.status(400).json({ error: "Failed to add category" });
                return;
            }
        }
        res.status(201).json({ message: "Category successfully created" });
        return;
    }
    catch (err) {
        res.status(500).json({ error: `A server error has occured: ${err}` });
        return;
    }
});
export const deleteCategories = expressAsyncHandler(async (req, res) => {
    try {
        //@ts-ignore
        const user = req.user;
        const { categoryName, type } = req.body;
        const userCategory = await Categories.findOne({ id: user.id });
        if (!userCategory) {
            res.status(404).json({ error: "User categories not found" });
            return;
        }
        if (type === "Expenses") {
            const updated = await Categories.findOneAndUpdate({ id: user.id }, {
                $pull: { expenses: { category: categoryName } },
            }, { new: true });
            if (!updated) {
                res
                    .status(400)
                    .json({ error: "An error has occured while deleting" });
                return;
            }
        }
        else if (type === "Income") {
            const updated = await Categories.findOneAndUpdate({ id: user.id }, {
                $pull: { income: { category: categoryName } },
            }, { new: true });
            if (!updated) {
                res
                    .status(400)
                    .json({ error: "An error has occured while deleting" });
                return;
            }
        }
        res.status(200).json({ message: "Category successfully deleted" });
        return;
    }
    catch (err) {
        res.status(500).json({ error: `A server error has occured: ${err}` });
        return;
    }
});
