import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

import {
	MessageSquare,
	User,
	Mail,
	Eye,
	EyeOff,
	Lock,
	Loader2,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
const SignupPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const { signup, isSigningUp } = useAuthStore();

	const validateForm = () => {};
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="min-h-screen grid lg:grid-cols-2">
			{/* Left side: Image or illustration can go here */}
			<div className="flex flex-col justify-center items-center gap-6 p-6 sm-p-12">
				<div className="w-full max-w-md space-y-8">
					<div className="flex flex-col items-center gap-2 group">
						<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
							<MessageSquare className="size-6 text-primary" />
						</div>
						<h1 className="text-2xl font-bold mt-2">Create Account</h1>
						<p className="text-base-content/60">
							Get started with your free account
						</p>
					</div>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					<div className="form-control">
						<label htmlFor="name" className="label">
							<span className="label-text font-medium">Full Name</span>
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none w-lg">
								<User className="size-5 text-base-content/40" />
							</div>
							<input
								type="text"
								className={`input input-bordered w-md pl-10 bg-transparent`}
								placeholder="Your Name"
								value={formData.fullName}
								onChange={(e) =>
									setFormData({ ...formData, fullName: e.target.value })
								}
								id="name"
								autoComplete="off"
							/>
						</div>
					</div>
					<div className="form-control">
						<label htmlFor="email" className="label">
							<span className="label-text font-medium">Email</span>
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Mail className="size-5 text-base-content/40" />
							</div>
							<input
								type="text"
								className={`input input-bordered w-md pl-10 bg-transparent`}
								placeholder="You@example.com"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								id="email"
								autoComplete="off"
							/>
						</div>
					</div>
					<div className="form-control">
						<label htmlFor="password" className="label">
							<span className="label-text font-medium">password</span>
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="size-5 text-base-content/40" />
							</div>
							<input
								type={showPassword ? "text" : "password"}
								className={`input input-bordered w-md pl-10 bg-transparent`}
								placeholder="●●●●●●●●●●●"
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
								id="password"
								autoComplete="off"
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}
							>
								{/* Password Icon  */}
								{showPassword ? (
									<EyeOff
										className="size-5 text-base-content/40"
										onClick={() => setShowPassword(false)}
									/>
								) : (
									<Eye
										className="size-5 text-base-content/40"
										onClick={() => setShowPassword(true)}
									/>
								)}
							</button>
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-primary w-full"
						disabled={isSigningUp}
					>
						{isSigningUp ? (
							<>
								<Loader2 className="size-5 animate-spin" />
								Loading...
							</>
						) : (
							"Create Account"
						)}
					</button>
				</form>
				<div className="text-center">
					<p className="text-base-content/60">
						Already have an account?{" "}
						<Link to="/login" className="link link-primary">
							Sign in
						</Link>
					</p>
				</div>
			</div>
			{/* Right side: Signup form */}
			<AuthImagePattern
				title="Join our community"
				subtitle="Connect woth friends, share moments, and stay in touch with your loved ones."
			/>
		</div>
	);
};
export default SignupPage;
