var state = new Array(20);
for (var i = 0; i < state.length; i++) {
	state[i] = new Array(30);
	state[i].fill(0);
}

setState();

function render() {
	project.activeLayer.removeChildren();
	for (var i = 0; i < state.length; i++) {
		for (var j = 0; j < state[i].length; j++) {
			if (state[i][j] === 1) {
				var rect = new Rectangle(new Point(j * 10, i * 10), new Point((j + 1) * 10, (i + 1) * 10));
				var path = new Path.Rectangle(rect);
				path.fillColor = "#f4f4f4";
			}
		}
	}
}

function setState() {
	state[10][10] = 1;
	state[10][11] = 1;
	state[10][12] = 1;
	state[11][10] = 1;
	state[12][10] = 1;
	state[12][11] = 1;
	state[12][12] = 1;
}

function updateState() {
	for (var i = 1; i < state.length - 1; i++) {
		for (var j = 1; j < state[i].length - 1; j++) {
			var neighbors = numNeighbors(i, j);
			if (state[i][j] === 0) {
				if (neighbors === 3) {
					state[i][j] = 1;
				}
			} else {
				if (neighbors < 2 || neighbors > 3) {
					state[i][j] = 0;
				}
			}
		}
	}
}

function numNeighbors(i, j) {
	var x = 0;
	x += state[i - 1][j - 1];
	x += state[i - 1][j];
	x += state[i - 1][j + 1];
	x += state[i][j - 1];
	x += state[i][j + 1];
	x += state[i + 1][j - 1];
	x += state[i + 1][j];
	x += state[i + 1][j + 1];
	return x;
}

function onFrame(event) {
	if (event.count % 16 == 0) {
		updateState();
		render();
	}
}