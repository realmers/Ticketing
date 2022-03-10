import mongoose from "mongoose";
import { PasswordManager } from "../services/passwordManager";
// Tell typescript that our model requires a name and an email.
interface UserAttrs {
	name: string;
	lastname: string;
	email: string;
	password: string;
}
// An interface that describes the properties that a User model has.
interface UserModel extends mongoose.Model<any> {
	build(attrs: UserAttrs): UserDoc;
}
// An interface that describes the properties that a User model has.
interface UserDoc extends mongoose.Document {
	name: string;
	lastname: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
}, {
	toJSON: {
		transform(doc, ret) {
			ret.id = ret._id;
			delete ret._id;
			delete ret.password;
			delete ret.__v;
		},
	},
});

userSchema.pre("save", async function (done) {
	if (this.isModified("password")) {
		const hashed = await PasswordManager.toHash(this.get("password"));
		this.set("password", hashed);
	}
	done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
const user = User.build({ name: "baby", lastname:"lovelace", email: "test@gmail.com", password: "asafaas" });
export { User };
