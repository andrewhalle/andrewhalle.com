var canvasWidth = 1000;
var canvasHeight = 700;
var start = [
	{
		x: 100,
		y: 100
	},
	{
		x: 200,
		y: 100
	},
	{
		x: 300,
		y: 100
	}
];
var state = {paths: [], rendered: false};

for (var i = 0; i < start.length; i++) {
	var point = start[i]
	var c = new Path.Circle(new Point(point.x, convertCartesianToCanvas(point.y)), 5);
	c.fillColor = "green";
	state.paths.push(c);
}

function render() {
	if (state.rendered) {
		return;
	}
	state.rendered = true;
	var c = Path.Circle(new Point(100, 500), 10);
	c.fillColor = "red";
}

var path_hit;
function onMouseDown(event) {
	path_hit = null;
	var hitResult = project.hitTest(event.point);
	if (!hitResult) {
		return;
	} else {
		path_hit = hitResult.item;
	}
}

function onMouseDrag(event) {
	if (path_hit && !state.rendered) {
		path_hit.position += event.delta;
	}
}

function convertCartesianToCanvas(y) {
	return canvasHeight - y;
}

$("#render").click(render);