function formatDate(date) {
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	};
	return date.toLocaleDateString([], options);
}

function formatTime(date) {
	const options = {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	};
	return date.toLocaleTimeString([], options);
}

export { formatDate, formatTime };

