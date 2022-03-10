import express, { Response, Request} from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { PasswordManager } from "../services/passwordManager";

import { User } from "../models/user";
const router = express.Router();

router.post("/api/users/signin",
[
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("You must supply a password"),
], validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser) {
        throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await PasswordManager.compare(existingUser.password, password);
    if(!passwordsMatch) {
        throw new BadRequestError("Invalid credentials");
    }
    // Generate JWT
		const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
        },
        process.env.JWT_KEY!);
    req.session = {
        jwt: userJwt,
    };

    res.status(200).send(existingUser);
});

export { router as signinRouter };
