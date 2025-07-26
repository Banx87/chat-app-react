import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
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
export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "Invalid credentials." });
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(400).json({ message: "Invalid credentials." });
		}

		generateToken(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller: ", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};
export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", {
			expires: new Date(0),
			httpOnly: true,
			sameSite: "strict",
		});
		res.status(200).json({ message: "Logged out successfully!" });
	} catch (error) {
		console.log("Error in logout controller: ", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { profilePic } = req.body;
		const userId = req.user._id;

		if (!profilePic) {
			return res.status(400).json({ message: "Profile picture is required" });
		}

		const uploadResponse = await cloudinary.uploader.upload(profilePic);
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ profilePic: uploadResponse.secure_url },
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		const { password, ...userWithoutPassword } = updatedUser._doc;
		res.status(200).json(userWithoutPassword);
	} catch (error) {
		console.error("Error updating profile:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const checkAuth = (req, res) => {
	try {
		// console.log(res.body);
		// console.log(req.body);
		res.status(200).json(req.user);
	} catch (error) {
		console.error("Error in checkAuth controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
