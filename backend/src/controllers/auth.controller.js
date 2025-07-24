import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
	console.log(req);
	const { fullName, email, password, profilePic } = req.body;
	try {
		if (!fullName || !email || !password) {
			return res.status(400).json({ message: "Please fill all the fields" });
		}
		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters long" });
		}

		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
			profilePic: profilePic || "",
		});

		if (newUser) {
			// Generate jwt token here
			generateToken(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				email: newUser.email,
				profilePic: newUser.profilePic,
			});

			// return res.status(201).json({ message: "User created successfully" });
		} else {
			console.log("error in signup controller: ", error.message);
			return res.status(500).json({ message: "Internal server error" });
		}
	} catch (error) {
		console.error("Signup error:", error);
		res.status(500).send("Internal Server Error");
	}
};
export const login = (req, res) => {
	res.send("login route");
};
export const logout = (req, res) => {
	res.send("logout route");
};
