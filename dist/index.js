import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { deserializeUser } from "./middleware/deserializeUser.js";
import { requireUser } from "./middleware/requireUser.js";
import cookieParser from "cookie-parser";
import path from "path";
import { createTransport } from "nodemailer";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoriesRoutes.js";
import transactionRouter from "./routes/transactionsRoutes.js";
import walletRouter from "./routes/walletRoutes.js";
import { fileURLToPath } from "url";
const app = express();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const assetsPath = path.resolve(dirname, "assets");
app.use("/assets", express.static(assetsPath, {
    setHeaders: (res, path) => {
        if (path.endsWith(".svg")) {
            res.setHeader("Content-Type", "image/svg+xml");
        }
    },
}));
// Middleware to serve static assets
app.get("/assets/:image", (req, res) => {
    const { image } = req.params;
    const filePath = path.join(dirname, "assets", image);
    if (filePath.endsWith(".svg")) {
        res.setHeader("Content-Type", "image/svg+xml");
    }
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error serving file: ${filePath}`, err);
            res.status(404).send("File not found");
        }
    });
});
app.use(express.json());
app.use(cors({
    origin: "https://xtrack-main.onrender.com",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(deserializeUser);
app.use((req, res, next) => {
    res.setTimeout(120 * 1000);
    req.setTimeout(120 * 1000);
    next();
});
function sendEmail({ recipient_email, OTP, }) {
    return new Promise((resolve, reject) => {
        var transporter = createTransport({
            service: "gmail",
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });
        const mail_configs = {
            from: process.env.MY_EMAIL,
            to: recipient_email,
            subject: "XTRACK PASSWORD RECOVERY",
            html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">XTRACK</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing XTRACK. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />XTRACK</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>XTRACK Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
        };
        transporter.sendMail(mail_configs, function (error) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
            }
            return resolve({ message: "Email sent succesfuly" });
        });
    });
}
// Auth
app.get("/api/session", requireUser, (req, res) => {
    // @ts-ignore
    if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
    }
    // @ts-ignore
    return res.send(req.user);
});
// User
app.use("/user", userRouter);
app.use("/categories", categoryRouter);
app.use("/transactions", transactionRouter);
app.use("/wallet", walletRouter);
// Email
app.post("/send_recovery_email", (req, res) => {
    sendEmail(req.body)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
});
// Use the client app
app.use(express.static(path.join(dirname, "../client/dist")));
// Render client
app.get("*", (req, res) => res.sendFile(path.join(dirname, "../client/dist/index.html")));
if (!process.env.MONGODB_CONNECTION_STRING) {
    throw new Error("MONGODB_CONNECTION_STRING is not defined in .env file");
}
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
    console.log("MongoDB connected!");
    app.listen(8000, () => {
        console.log("Server is listening to port 8000");
    });
})
    .catch((err) => {
    console.log(err);
});
