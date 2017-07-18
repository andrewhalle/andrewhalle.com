var canvasWidth = 1000;
var canvasHeight = 700;
var start = [
	{
		x: 300,
		y: 400
	},
	{
		x: 400,
		y: 550
	},
	{
		x: 700,
		y: 600
	}
];
var state = {paths: [], rendered: false};

for (var i = 0; i < start.length; i++) {
	var point = start[i];
	var path = new Path.Circle(new Point(point.x, convertCartesianToCanvas(point.y)), 5);
	path.fillColor = "green";
	state.paths.push(path);
}

function render() {
	if (state.rendered) {
		return;
	}
	state.rendered = true;
	var path;
	//triangle
	path = new Path.Line(state.paths[0].position, state.paths[1].position);
	path.strokeColor = "black";
	path = new Path.Line(state.paths[1].position, state.paths[2].position);
	path.strokeColor = "black";
	path = new Path.Line(state.paths[2].position, state.paths[0].position);
	path.strokeColor = "black";

	//angle bisectors
	p1 = {x: state.paths[0].position.x, y: convertCanvasToCartesian(state.paths[0].position.y)};
	p2 = {x: state.paths[1].position.x, y: convertCanvasToCartesian(state.paths[1].position.y)};
	p3 = {x: state.paths[2].position.x, y: convertCanvasToCartesian(state.paths[2].position.y)};
	ab1 = angleBisector(p1, p2, p3);
	ab2 = angleBisector(p2, p3, p1);
	path = new Path.Line(new Point(0, convertCartesianToCanvas(ab1.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(ab1.eval(canvasWidth))));
	path.strokeColor = "black";
	path = new Path.Line(new Point(0, convertCartesianToCanvas(ab2.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(ab2.eval(canvasWidth))));
	path.strokeColor = "black";
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

function convertCanvasToCartesian(y) {
	return canvasHeight - y;
}

$("#render").click(render);