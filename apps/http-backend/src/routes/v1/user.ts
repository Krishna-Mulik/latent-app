import express, { Router } from "express";
import authenticator from "authenticator";

const router: Router = express.Router();

router.post('/signup', (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    const totp = authenticator.generateToken(phoneNumber + "SignUP");
    res.json({ "otp": totp, "id": 2 });
});

router.post('/signup/verify', (req, res) => {
    res.json({});
});

export default router;

