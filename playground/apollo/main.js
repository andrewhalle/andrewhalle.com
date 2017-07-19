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
	var p1 = {x: state.paths[0].position.x, y: convertCanvasToCartesian(state.paths[0].position.y)};
	var p2 = {x: state.paths[1].position.x, y: convertCanvasToCartesian(state.paths[1].position.y)};
	var p3 = {x: state.paths[2].position.x, y: convertCanvasToCartesian(state.paths[2].position.y)};
	var ab1 = angleBisector(p1, p2, p3);
	var ab2 = angleBisector(p2, p3, p1);

	//center of inscribed circle
	var p4 = twoLineIntersection(ab1, ab2);
	path = new Path.Circle(new Point(p4.x, convertCartesianToCanvas(p4.y)), 5);
	path.fillColor = "red";

	//inscribed circle
	var l1 = line(p1, p2);
	var l2 = perpendicularLine(p4, l1);
	var p5 = twoLineIntersection(l1, l2);
	var r = distance(p4, p5);
	var ic = {center: p4, r: r};
	path = new Path.Circle(new Point(p4.x, convertCartesianToCanvas(p4.y)), r);
	path.strokeColor = "black";

	//tangent circles
	l1 = line(p1, p2);
	l2 = line(p2, p3);
	var l3 = line(p3, p1);
	var t1 = circleLineIntersection(ic, l1)[0];
	console.log(t1);
	var c1 = {center: p1, r: distance(p1, t1)};
	path = new Path.Circle(new Point(c1.center.x, convertCartesianToCanvas(c1.center.y)), c1.r);
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