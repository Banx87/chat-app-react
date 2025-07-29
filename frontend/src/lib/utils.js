export function formatMessageTime(date) {
	return new Date(date).toLocaleTimeString("fi-FI", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}
