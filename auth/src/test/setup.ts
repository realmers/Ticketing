import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";



let mongo: any;
beforeAll(async () => {
	process.env.JWT_KEY = "testingsignature";
	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri);
});
beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});
declare global {
    function signin(): Promise<string[]>;
}

global.signin = async () => {
	const name = "test";
	const lastname = "test";
	const email = "test@gmail.com";
	const password = "password";
	const response = await request(app)
		.post("/api/users/signup")
		.send({
			name,
			lastname,
			email,
			password,
		})
		.expect(201);
    const cookie = response.get('Set-Cookie');

    return cookie;
};

