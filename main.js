const startDate = Date.parse(
	document.getElementsByClassName('ContributionCalendar-day')[0]
	.getAttribute('data-date')
) / 8.64e7;
let board = new Array(7).fill(0).map(() => new Array(53).fill(0));
Array.from(document.getElementsByClassName('ContributionCalendar-day'))
	.filter((x) => x.getAttribute('data-date'))
	.map((x) => [
		Date.parse(x.getAttribute('data-date')) / 8.64e7 - startDate,
		x
	])
	.forEach((x) => {board[x[0] % 7][Math.floor(x[0] / 7)] = x[1]});

