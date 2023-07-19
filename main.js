document.body.innerHTML += '<style>.ContributionCalendar-day{opacity: 1 !important}</style>';
var startDate = Date.parse(
	document.getElementsByClassName('ContributionCalendar-day')[0]
	.getAttribute('data-date')
) / 8.64e7;
var board = new Array(7).fill(0).map(() => new Array(53).fill(0));
Array.from(document.getElementsByClassName('ContributionCalendar-day'))
	.filter((x) => x.getAttribute('data-date'))
	.map((x) => [
		Date.parse(x.getAttribute('data-date')) / 8.64e7 - startDate,
		x
	])
	.forEach((x) => {board[x[0] % 7][Math.floor(x[0] / 7)] = x[1]})
board = board.map((x) => x.filter((el) => el));
board.forEach((y) => y.forEach((el) => {
	el.setAttribute('data-level', 0);
	el.addEventListener('click', (ev) => 
		el.setAttribute('data-level', el.getAttribute('data-level') == 0 ? 4 : 0))
}));
