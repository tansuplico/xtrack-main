import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User } from "../models/userSchema.js";
import { Wallet } from "../models/walletSchema.js";
import { Transactions } from "../models/transactionsSchema.js";
import { Categories } from "../models/categoriesSchema.js";
import { expenseData } from "../api/defaultExp.js";
import { incomeData } from "../api/defaultInc.js";
import { createSession, invalidateSession } from "../db/index.js";
import { signJWT } from "../utils/jwt.utils.js";
export const signUp = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ error: "Incomplete input" });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // Check existing user
    const checkExistingUser = await User.findOne({ email });
    // Validations
    if (checkExistingUser) {
        res.status(400).json({ error: "Email is already registered" });
        return;
    }
    if (username.length > 12) {
        res
            .status(400)
            .json({ error: "Username must be less than 12 characters" });
        return;
    }
    if (password.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters" });
        return;
    }
    if (!email.includes("@gmail")) {
        res.status(400).json({ error: "Email is not valid" });
        return;
    }
    const user = await User.create({
        username,
        email,
        password: hash,
        image: "/male-one.svg",
    });
    if (user) {
        const createWallet = await Wallet.create({
            id: user._id,
            income: 0,
            expense: 0,
            balance: 0,
            incomeChanges: [],
            currentIncome: 0,
            initialBalance: 0,
        });
        if (!createWallet) {
            res.status(404).json({ error: "Error creating user wallet" });
            return;
        }
        const createTransactions = await Transactions.create({
            id: user._id,
            history: [],
        });
        if (!createTransactions) {
            res.status(404).json({ error: "Error creating user transactions" });
            return;
        }
        const createCategories = await Categories.create({
            id: user._id,
            expenses: expenseData,
            income: incomeData,
        });
        if (!createCategories) {
            res.status(404).json({ error: "Error creating user transactions" });
            return;
        }
        const session = createSession(user.email, user.username);
        const accessToken = signJWT({
            id: user._id,
            email: user.email,
            sessionId: session.sessionId,
        }, "15m");
        const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");
        res.cookie("accessToken", accessToken, {
            maxAge: 900000,
            httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, {
            maxAge: 3.1536e10,
            httpOnly: true,
        });
        res.send(session);
        return;
    }
});
export const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Incomplete input" });
        return;
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
        res.status(404).json({ error: "Email not registered" });
        return;
    }
    const validatePassword = await bcrypt.compare(password, findUser.password);
    if (!validatePassword) {
        res.status(401).json({ error: "Password is incorrect" });
        return;
    }
    const session = createSession(email, findUser.username);
    const accessToken = signJWT({ id: findUser._id, email: findUser.email, sessionId: session.sessionId }, "15m");
    const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");
    res.cookie("accessToken", accessToken, {
        maxAge: 900000,
        httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
        maxAge: 3.1536e10,
        httpOnly: true,
    });
    res.send(session);
    return;
});
export const logout = (req, res) => {
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
    });
    res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
    });
    // @ts-ignore
    const session = invalidateSession(req.user.sessionId);
    res.send(session);
};
export const fetchUser = expressAsyncHandler(async (req, res) => {
    // @ts-ignore
    const user = req.user;
    const findUser = await User.find({ _id: user.id });
    if (!findUser) {
        res.status(403).send({ error: "Unauthorized" });
        return;
    }
    res.status(200).json(findUser);
});
export const changePassword = expressAsyncHandler(async (req, res) => {
    const { password, repassword, email } = req.body;
    if (!email) {
        res.status(400).send({ error: "Cannot find user" });
        return;
    }
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
    const findUser = await User.find({ email: email });
    if (!findUser) {
        res.status(403).send({ error: "Unauthorized" });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const updatedUser = await User.findOneAndUpdate({ email: email }, { $set: { password: hash } }, { new: true });
    if (!updatedUser) {
        res.status(400).send({ error: "Failed to change password" });
        return;
    }
    res.status(200).send({ message: "Password successfully changed" });
});
