import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
	const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
	const { theme, setTheme } = useThemeStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth && !authUser)
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader className="size-10 animate-spin" />
			</div>
		);

	return (
		<div data-theme={theme}>
			<Navbar />

			<Routes>
				<Route
					path="/"
					element={authUser ? <HomePage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/login"
					element={!authUser ? <LoginPage /> : <Navigate to="/" />}
				/>
				<Route
					path="/profile"
					element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
				/>
				<Route path="/settings" element={<SettingsPage />} />
				<Route
					path="/signup"
					element={!authUser ? <SignupPage /> : <Navigate to="/" />}
				/>
			</Routes>

			<Toaster></Toaster>
		</div>
	);
};

export default App;
