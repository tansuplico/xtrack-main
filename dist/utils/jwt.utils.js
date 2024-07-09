import jwt from "jsonwebtoken";
import crypto from "crypto";
// Generate a new RSA private key with a key size of 2048 bits
const genPrivateKey = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "spki",
        format: "pem",
    },
    privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
    },
});
// Extract the private key and public key from the generated key pair
const privateKey = genPrivateKey.privateKey;
const publicKey = genPrivateKey.publicKey;
// sign jwt
export function signJWT(payload, expiresIn) {
    return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn });
}
// verify jwt
export function verifyJWT(token) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}
