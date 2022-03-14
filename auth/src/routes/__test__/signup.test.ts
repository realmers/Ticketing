import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			name: "test",
			lastname: "test",
			email: "test@gmail.com",
			password: "password",
		})
		.expect(201);
});

it("returns a 400 with an invalid email", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			name: "test",
			lastname: "test",
			email: "test",
			password: "password",
		})
		.expect(400);
});
it("returns a 400 with an invalid password", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			name: "test",
			lastname: "test",
			email: "test@gmail.com",
			password: "p",
		})
		.expect(400);
});
it("returns a 400 with invalid name or lastname", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			name: "",
			lastname: "test",
			email: "test",
			password: "password",
		})
		.expect(400);

	await request(app)
		.post("/api/users/signup")
		.send({
			name: "test",
			lastname: "",
			email: "test@gmail.com",
			password: "pass",
		})
		.expect(400);
});

it("Dissalows duplicate emails", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			name: "test",
			lastname: "test",
			email: "test@gmail.com",
			password: "password",
		})
		.expect(201);
	await request(app)
		.post("/api/users/signup")
		.send({
			name: "test",
			lastname: "test",
			email: "test@gmail.com",
			password: "password",
		})
		.expect(400);
});

it("sets a cookie after successful signup", async () => {
    const response = await request(app)
		.post("/api/users/signup")
		.send({
			name: "test",
			lastname: "test",
			email: "test@gmail.com",
			password: "password",
		})
		.expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
})
