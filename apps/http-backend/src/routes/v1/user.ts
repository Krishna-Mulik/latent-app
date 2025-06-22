import { PrismaClient } from "@repo/db/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWt_PASSWORD } from "../../config";
import { getToken, verifyToken } from "../../utils/totp";

const router: Router = Router();
const client = new PrismaClient();

router.post('/signup', async (req, res) => {
    const number = String(req.body.phoneNumber);

    const totp = getToken(number, 'AUTH');

    const user = await client.user.upsert({
        where: {
            number
        },
        create: {
            number,
            name: ""
        },
        update: {}
    })

    // sendEmail("krishmulik22@gmail.com", `your otp is ${totp}`)

    console.log(user);

    res.json({ "otp": totp, "id": user.id });
});

router.post('/signup/verify', async (req, res) => {
    const number = String(req.body.phoneNumber);
    const name = req.body.name;
    const otp = req.body.otp;

    if (process.env.NODE_ENV === "production" && !verifyToken(number, "AUTH", otp)) {
        res.status(401).json({
            "message": "Invalid Token"
        })

        return;
    }

    const user = await client.user.update({
        where: {
            number
        },
        data: {
            name,
            verified: true
        }
    })

    const jwtToken = jwt.sign({
        userId: user.id
    }, JWt_PASSWORD);

    res.json({
        "token": jwtToken
    });
});

router.post('/signin', async (req, res) => {
    const number = String(req.body.phoneNumber);

    try {

        const user = await client.user.findFirstOrThrow({
            where: {
                number
            }
        })

        const totp = getToken(number, "AUTH");
        // sendEmail("krishmulik22@gmail.com", `your otp is ${totp}`)

        res.json({
            "otp": totp,
            "id": 2,
            "message": "otp send"
        });
    } catch (e) {
        res.status(404).json({
            message: "User does not exists"
        })
    }
});

router.post('/signin/verify', async (req, res) => {
    const number = req.body.phoneNumber;
    const otp = req.body.otp;

    if (process.env.NODE_ENV === "production" && !verifyToken(number, "AUTH", otp)) {
        res.status(401).json({
            "message": "Invalid Token"
        })

        return;
    }

    const user = await client.user.findFirstOrThrow({
        where: {
            number
        }
    })

    const jwtToken = jwt.sign({
        userId: user.id
    }, JWt_PASSWORD);

    res.json({
        "token": jwtToken
    });
});

export default router;

