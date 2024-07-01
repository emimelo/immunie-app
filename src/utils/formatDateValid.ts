function formatDateValid(dateStr: string): string {
	const date = new Date(dateStr);

	date.setFullYear(date.getFullYear() + 1);

	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	};

	return date.toLocaleDateString('pt-BR', options);
}

export default formatDateValid;
