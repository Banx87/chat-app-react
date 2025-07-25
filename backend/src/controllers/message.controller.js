import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		// Logic to fetch users for the sidebar
		const loggedInUserId = req.user._id;
		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId }, // Exclude the logged-in user
		}).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSideBar:", error.message);
		res.status(500).json({ message: "Error fetching users" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const myId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: userToChatId },
				{ senderId: userToChatId, receiverId: myId },
			],
		});

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages:", error.message);
		res.status(500).json({ message: "Error fetching messages" });
	}
};

export const sendMessage = async (req, res) => {
	try {
		const { text, image } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let imageUrl;
		if (image) {
			// Upload base64 image to cloudinary.
			const uploadResponse = await cloudinary.uploader.upload(image);
			imageUrl = uploadResponse.secure_url;
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			text,
			image: imageUrl,
		});

		await newMessage.save();

		// TODO: Realtime funciotnality to messaging. => socket.io

		res.status(200).json({
			newMessage,
		});
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ message: "Internal Server Error---" });
	}
};
