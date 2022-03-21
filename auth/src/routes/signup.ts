import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
// import 'dotenv/config'
import { validateRequest, BadRequestError  } from "@adbiljett/common"
import jwt from "jsonwebtoken";
import { User } from "../models/user";
const router = express.Router();
router.post(
	"/api/users/signup",
	[
		body("name").trim().notEmpty().withMessage("Name is required"),
		body("lastname").trim().notEmpty().withMessage("Lastname is required"),
		body("email").isEmail().normalizeEmail().withMessage("Email must be valid"),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage("Password must be between 4 and 20 characters"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { name, lastname, email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError("Email in use");
		}

		const user = User.build({ name, lastname, email, password });
		await user.save();

		// Generate JWT
		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.JWT_KEY!
		);
		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(user);
	}
);

export { router as signupRouter };
