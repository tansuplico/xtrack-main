import expressAsyncHandler from "express-async-handler";
import { Wallet } from "../models/walletSchema.js";
import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
export const fetchWallet = expressAsyncHandler(async (req, res) => {
    // @ts-ignore
    const user = req.user;
    const wallet = await Wallet.find({ id: user.id });
    if (!wallet) {
        res.status(404).json({ error: "No transaction data found" });
        return;
    }
    res.status(200).json(wallet);
});
export const updateWallet = expressAsyncHandler(async (req, res) => {
    // @ts-ignore
    const user = req.user;
    const { balance, income } = req.body;
    const wallet = await Wallet.find({ id: user.id });
    if (!wallet) {
        res.status(404).json({ error: "No wallet data found" });
        return;
    }
    const updatedWallet = await Wallet.findOneAndUpdate({ id: user.id }, { $set: { income: income, balance: balance } }, { new: true });
    if (!updatedWallet) {
        res.status(400).json({ error: "Failed to update wallet" });
        return;
    }
    res.status(200).json({ message: "Wallet successfully updated" });
    return;
});
export const updateIncome = expressAsyncHandler(async (req, res) => {
    // @ts-ignore
    const user = req.user;
    const { income, changeData } = req.body;
    const wallet = await Wallet.find({ id: user.id });
    if (!wallet) {
        res.status(404).json({ error: "No wallet data found" });
        return;
    }
    const updatedWallet = await Wallet.findOneAndUpdate({ id: user.id }, {
        $set: { income: income, currentIncome: income },
        $push: { incomeChanges: changeData },
    }, { new: true });
    if (!updatedWallet) {
        res.status(400).json({ error: "Failed to update wallet" });
        return;
    }
    res.status(200).json({ message: "Income successfully updated" });
    return;
});
export const updateBalance = expressAsyncHandler(async (req, res) => {
    // @ts-ignore
    const user = req.user;
    const { balance } = req.body;
    const wallet = await Wallet.find({ id: user.id });
    if (!wallet) {
        res.status(404).json({ error: "No wallet data found" });
        return;
    }
    const updatedWallet = await Wallet.findOneAndUpdate({ id: user.id }, { $set: { balance: balance, initialBalance: balance } }, { new: true });
    if (!updatedWallet) {
        res.status(400).json({ error: "Failed to update wallet" });
        return;
    }
    res.status(200).json({ message: "Balance successfully updated" });
    return;
});
export const updateProfile = expressAsyncHandler(async (req, res) => {
    // @ts-ignore
    const user = req.user;
    const { username, image } = req.body;
    const findUser = await User.findOne({ _id: user.id });
    if (!findUser) {
        res.status(404).send({ error: "User doesn't exist" });
        return;
    }
    if (username.length > 12) {
        res
            .status(400)
            .json({ error: "Username must be less than 12 characters" });
        return;
    }
    const updatedUser = await User.findOneAndUpdate({ _id: user.id }, { $set: { username: username, image: image } }, { new: true });
    if (!updatedUser) {
        res.status(404).send({ error: "Failed to update username" });
        return;
    }
    res.status(200).send({ message: "Username successfully updated" });
});
export const updatePassword = expressAsyncHandler(async (req, res) => {
    // @ts-ignore
    const user = req.user;
    const { password, repassword } = req.body;
    if (!password || !repassword) {
        res.status(400).send({ error: "Incomplete input" });
        return;
    }
    if (password !== repassword) {
        res.status(400).send({ error: "Passwords doesn't match" });
        return;
    }
    if (password.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters" });
        return;
    }
    const findUser = await User.find({ _id: user.id });
    if (!findUser) {
        res.status(403).send({ error: "Unauthorized" });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const updatedUser = await User.findOneAndUpdate({ _id: user.id }, { $set: { password: hash } }, { new: true });
    if (!updatedUser) {
        res.status(400).send({ error: "Failed to change password" });
        return;
    }
    res.status(200).send({ message: "Password successfully changed" });
});
export const updateIncomeChanges = expressAsyncHandler(async (req, res) => {
    // @ts-ignore
    const user = req.user;
    const { newIncome, changeData } = req.body;
    if (!user) {
        res.status(404).send({ error: "User not found" });
        return;
    }
    const findUser = await Wallet.findOneAndUpdate({ email: user.email }, {
        $set: { currentIncome: newIncome },
        $push: { incomeChanges: changeData },
    }, { new: true });
    if (!findUser) {
        res.status(404).send({ error: "Failed to update income changes" });
        return;
    }
    res.status(200).send({ message: "Successfully updated income changes" });
    return;
});
