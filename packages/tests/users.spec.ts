import axios from './axios';
import { describe, expect, it, test } from 'vitest'

test('adds 1 + 2 to equal 3', () => {
    expect(2 + 1).toBe(3)
})

const BACKEND_URL = `http://localhost:8080`;

const NAME_1 = "krishna"
const PHONE_NUMBER_1 = "1234123412"

describe('Signup endpoints', () => {
    it("Double sign up doesn't work'", async () => {

        const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
            "phoneNumber": PHONE_NUMBER_1
        });

        const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signup/verify`, {
            "phoneNumber": PHONE_NUMBER_1,
            "name": NAME_1,
            "otp": "0000"
        });

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1.data.id).toBeTruthy();
        expect(response2.data.token).toBeTruthy();

    });
});

describe('Signin endpoints', () => {
    it("Sigin works has expected", async () => {

        const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
            "phoneNumber": PHONE_NUMBER_1
        });

        const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signin/verify`, {
            "name": NAME_1,
            "otp": "0000"
        });

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1.data.id).toBeTruthy();
        expect(response2.data.token).toBeTruthy();

        //expect(async () => {
        //    await axios.post(`${BACKEND_URL}/api/v1/signu`, {
        //        "number": PHONE_NUMBER_1
        //    });
        //}).toThrow();

    });


    it("Sign doesn't work for user who doesn't exist in db", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
            "phoneNumber": PHONE_NUMBER_1 + 123,
        })
        expect(response.status).toBe(404);
    })
});
