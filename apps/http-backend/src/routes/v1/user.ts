import express, { Router } from "express";
import authenticator, { verifyToken } from "authenticator";
import client from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWt_PASSWORD } from "../../config";

const router: Router = express.Router();

router.post('/signup', (req, res) => {
    const number = req.body.phoneNumber;

    const totp = authenticator.generateToken(number + "SignUP");

    const user = client.user.upsert({
        where: {
            number
        },
        create: {
            number,
            name: ""
        },
        update: {}
    })

    res.json({ "otp": totp, "id": 2 });
});

router.post('/signup/verify', (req, res) => {
    const number = req.body.phoneNumber;
    const name = req.body.name;

    if (!verifyToken(number + "SignUP", req.body.otp)) {
        res.status(401).json({
            "message": "Invalid Token"
        })

        return;
    }

    const userId = client.user.update({
        where: {
            number
        },
        data: {
            name,
            verified: true
        }
    })

    const jwtToken = jwt.sign({
        userId
    }, JWt_PASSWORD);

    res.json({
        jwtToken
    });
});

export default router;

