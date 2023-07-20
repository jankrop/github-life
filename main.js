var g = (x) => x.getAttribute('data-level');
var s = (x, v) => x.setAttribute('data-level', v);
var n = (X, Y) => {
	var c = 0;
	for(var x = X-1; x <= X+1; x++) {
		for(var y = Y-1; y <= Y+1; y++) {
		  	if(x !== X || y !== Y) {
				try {c += parseInt(g(board[y][x])) / 4} catch {}
		  	}
		}
	}
	return c;
}
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
	s(el, 0);
	el.addEventListener('click', (ev) => 
		s(el, g(el) == 0 ? 4 : 0))
}));
document.addEventListener('keypress', (ev) => {
	if (ev.key === 'Enter') {
		setInterval(() => {
			var newBoard = board.map((y) => y.map((x) => g(x)));
			for (var y = 0; y < board.length; y++) {
				for (var x = 0; x < board[y].length; x++) {
					newBoard[y][x] = 4 * (g(board[y][x]) == 4 ? 1 < n(x, y) && n(x, y) < 4 : n(x, y) == 3);
				}
			}
			for (var y = 0; y < board.length; y++) {
				for (var x = 0; x < board[y].length; x++) {
					s(board[y][x], newBoard[y][x])
				}
			}
		}, 300);
	}
});
