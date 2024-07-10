import expressAsyncHandler from "express-async-handler";
import { Transactions } from "../models/transactionsSchema.js";
import { Request, Response } from "express";
import { Categories } from "../models/categoriesSchema.js";
import { Wallet } from "../models/walletSchema.js";

export const fetchTransactions = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const user = req.user;
      const transactions = await Transactions.find({ id: user.id });

      if (!transactions) {
        res.status(404).json({ error: "No transaction data found" });
        return;
      }

      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json({ error: `A server error has occured: ${err}` });
      return;
    }
  }
);

export const addTransactions = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const user = req.user;
      const { data } = req.body;

      if (!data) {
        res.status(404).json({ error: "No transaction data found" });
        return;
      }

      if (!data.categoryData.icon) {
        res.status(404).json({ error: "Error: No category assigned" });
        return;
      } else if (!data.amount) {
        res.status(404).json({ error: "Error: Amount is not valid" });
        return;
      }

      const transaction = await Transactions.findOne({ id: user.id });
      const wallet = await Wallet.findOne({ id: user.id });

      if (!transaction) {
        res.status(404).json({ error: "Transaction data doesn't exist" });
        return;
      }

      if (!wallet) {
        res.status(404).json({ error: "Wallet data doesn't exist" });
        return;
      }

      const updatedTransaction = await Transactions.findOneAndUpdate(
        { id: user.id },
        {
          $push: { history: data },
        },
        { new: true }
      );

      if (data.categoryData.type === "Expenses") {
        await Categories.updateOne(
          { id: user.id, "expenses.category": data.categoryData.category },
          { $inc: { "expenses.$.transactionCount": 1 } },
          { new: true }
        );
      } else if (data.categoryData.type === "Income") {
        await Categories.updateOne(
          { id: user.id, "income.category": data.categoryData.category },
          { $inc: { "income.$.transactionCount": 1 } },
          { new: true }
        );
      }

      if (!updatedTransaction) {
        res.status(400).json({ error: "Failed to add transaction" });
        return;
      }

      let newExpense = wallet.expense;

      if (data.categoryData.type === "Expenses") {
        newExpense += data.amount;
      }

      const updatedWallet = await Wallet.findOneAndUpdate(
        { id: user.id },
        {
          $set: { expense: newExpense },
        },
        { new: true }
      );

      if (!updatedWallet) {
        res.status(400).json({ error: "Failed to update wallet" });
        return;
      }

      res.status(201).json({ message: "Transaction successfully created" });
    } catch (err) {
      res.status(500).json({ error: `A server error has occured: ${err}` });
      return;
    }
  }
);

export const clearHistory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const user = req.user;

      const updatedTransaction = await Transactions.findOneAndUpdate(
        { id: user.id },
        { $set: { history: [] } },
        { new: true }
      );

      const updatedWallet = await Wallet.findOneAndUpdate(
        { id: user.id },
        { $set: { expense: 0 } },
        { new: true }
      );

      await Categories.updateOne(
        { id: user.id },
        {
          $set: {
            "expenses.$[].transactionCount": 0,
            "income.$[].transactionCount": 0,
          },
        },
        { new: true }
      );

      if (!updatedTransaction || !updatedWallet) {
        res.status(400).json({ error: "Failed to clear transaction history" });
        return;
      }

      res.status(200).json({ message: "History successfully updated" });
      return;
    } catch (err) {
      res.status(500).json({ error: `A server error has occured: ${err}` });
      return;
    }
  }
);

export const removeTransactions = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const user = req.user;
      const { id, type, category } = req.body;

      const transaction = await Transactions.findOne({ id: user.id });

      if (!transaction) {
        res.status(404).json({ error: "No transaction data found" });
        return;
      }

      const transactionToRemove = transaction.history.find(
        (tr) => String(tr._id) === id
      );

      if (type === "Expenses") {
        await Categories.updateOne(
          { id: user.id, "expenses.category": category },
          {
            $inc: { "expenses.$.transactionCount": -1 },
          },
          { new: true }
        );
      } else if (type === "Income") {
        await Categories.updateOne(
          { id: user.id, "income.category": category },
          {
            $inc: { "income.$.transactionCount": -1 },
          },
          { new: true }
        );
      }

      if (!transactionToRemove) {
        res.status(404).json({ error: "Transaction not found in history" });
        return;
      }

      const updatedTransaction = await Transactions.findOneAndUpdate(
        { id: user.id },
        { $pull: { history: { _id: id } } },
        { new: true }
      );

      if (!updatedTransaction) {
        res.status(400).json({ error: "Failed to update transaction" });
        return;
      }

      const wallet = await Wallet.findOne({ id: user.id });

      if (!wallet) {
        res.status(404).json({ error: "Wallet not found" });
        return;
      }

      if (transactionToRemove.categoryData.type === "Expenses") {
        wallet.expense -= transactionToRemove.amount;
      } else {
      }

      await wallet.save();

      res.status(200).send({ message: "Transaction removed" });
    } catch (err) {
      res.status(500).json({ error: `A server error has occured: ${err}` });
      return;
    }
  }
);
