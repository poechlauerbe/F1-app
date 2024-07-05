function formatDate(date) {
	newDate = new Date(date);
	const day = String(newDate.getDate());
    const month = String(newDate.getMonth() + 1); // Months are zero-indexed
    const year = newDate.getFullYear();

    return `${day}.${month}.${year}`;
}

export function formatTime(dateString) {
	const date = new Date(dateString);

	const options = {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	};

	return date.toLocaleTimeString([], options);
}

// export function formatTime(date) {
// 	newDate = new Date(date);
// 	const options = {
// 		hour: '2-digit',
// 		minute: '2-digit',
// 		second: '2-digit',
// 		hour12: false
// 	};
// 	return newDate.toLocaleTimeString([], options);
// }
