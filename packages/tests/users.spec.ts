import axios from 'axios';
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
            "number": PHONE_NUMBER_1
        });

        const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signup/verify`, {
            "name": NAME_1,
            "otp": "0000"
        });

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);
        expect(response1.data.id).toBeTruthy();

        //expect(async () => {
        //    await axios.post(`${BACKEND_URL}/api/v1/signu`, {
        //        "number": PHONE_NUMBER_1
        //    });
        //}).toThrow();

    });
});

