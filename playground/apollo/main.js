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
var state = {anchors: [], paths: []};

$(document).ready(function() {
	for (var i = 0; i < start.length; i++) {
		var point = start[i];
		var path = new Path.Circle(new Point(point.x, convertCartesianToCanvas(point.y)), 5);
		path.fillColor = "green";
		state.anchors.push(path);
	}
	render();
});

function render() {
	var path;
	//triangle
	// path = new Path.Line(state.anchors[0].position, state.anchors[1].position);
	// path.strokeColor = "black";
	// state.paths.push(path);
	// path = new Path.Line(state.anchors[1].position, state.anchors[2].position);
	// path.strokeColor = "black";
	// state.paths.push(path);
	// path = new Path.Line(state.anchors[2].position, state.anchors[0].position);
	// path.strokeColor = "black";
	// state.paths.push(path);

	//angle bisectors
	var p1 = {x: state.anchors[0].position.x, y: convertCanvasToCartesian(state.anchors[0].position.y)};
	var p2 = {x: state.anchors[1].position.x, y: convertCanvasToCartesian(state.anchors[1].position.y)};
	var p3 = {x: state.anchors[2].position.x, y: convertCanvasToCartesian(state.anchors[2].position.y)};
	var ab1 = angleBisector(p1, p2, p3);
	var ab2 = angleBisector(p2, p3, p1);

	//center of inscribed circle
	var p4 = twoLineIntersection(ab1, ab2);
	// path = new Path.Circle(new Point(p4.x, convertCartesianToCanvas(p4.y)), 5);
	// path.fillColor = "red";
	// state.paths.push(path);

	//inscribed circle
	var l1 = line(p1, p2);
	var l2 = perpendicularLine(p4, l1);
	var p5 = twoLineIntersection(l1, l2);
	var r = distance(p4, p5);
	var ic = {center: p4, r: r};
	// path = new Path.Circle(new Point(p4.x, convertCartesianToCanvas(p4.y)), r);
	// path.strokeColor = "black";
	// state.paths.push(path);

	//tangent circles
	l1 = line(p1, p2);
	l2 = line(p2, p3);
	var l3 = line(p3, p1);
	var t1 = circleLineIntersection(ic, l1)[0];
	var c1 = {center: p1, r: distance(p1, t1)};
	path = new Path.Circle(new Point(c1.center.x, convertCartesianToCanvas(c1.center.y)), c1.r);
	path.strokeColor = "black";
	state.paths.push(path);
	var c2 = {center: p2, r: distance(p2, t1)};
	path = new Path.Circle(new Point(c2.center.x, convertCartesianToCanvas(c2.center.y)), c2.r);
	path.strokeColor = "black";
	state.paths.push(path);
	var t2 = circleLineIntersection(ic, l3)[0];
	var c3 = {center: p3, r: distance(p3, t2)};
	path = new Path.Circle(new Point(c3.center.x, convertCartesianToCanvas(c3.center.y)), c3.r);
	path.strokeColor = "black";
	state.paths.push(path);

	//blue lines
	var bl1 = perpendicularLine(p1, l2);
	// path = new Path.Line(new Point(0, convertCartesianToCanvas(bl1.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(bl1.eval(canvasWidth))));
	// path.strokeColor = "blue";
	// state.paths.push(path);
	var bl2 = perpendicularLine(p2, l3);
	// path = new Path.Line(new Point(0, convertCartesianToCanvas(bl2.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(bl2.eval(canvasWidth))));
	// path.strokeColor = "blue";
	// state.paths.push(path);
	var bl3 = perpendicularLine(p3, l1);
	// path = new Path.Line(new Point(0, convertCartesianToCanvas(bl3.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(bl3.eval(canvasWidth))));
	// path.strokeColor = "blue";
	// state.paths.push(path);

	//yellow points
	t1 = circleLineIntersection(ic, l1)[0];
	t2 = circleLineIntersection(ic, l2)[0];
	var t3 = circleLineIntersection(ic, l3)[0];
	// path = new Path.Circle(new Point(t1.x, convertCartesianToCanvas(t1.y)), 5);
	// path.fillColor = "yellow";
	// state.paths.push(path);
	// path = new Path.Circle(new Point(t2.x, convertCartesianToCanvas(t2.y)), 5);
	// path.fillColor = "yellow";
	// state.paths.push(path);
	// path = new Path.Circle(new Point(t3.x, convertCartesianToCanvas(t3.y)), 5);
	// path.fillColor = "yellow";
	// state.paths.push(path);

	//blue points
	var bps = [];
	var temp = circleLineIntersection(c1, bl1);
	for (var i = 0; i < temp.length; i++) {
		bps.push(temp[i]);
	}
	temp = circleLineIntersection(c2, bl2);
	for (var i = 0; i < temp.length; i++) {
		bps.push(temp[i]);
	}
	temp = circleLineIntersection(c3, bl3);
	for (var i = 0; i < temp.length; i++) {
		bps.push(temp[i]);
	}
	// for (var i = 0; i < bps.length; i++) {
	// 	path = new Path.Circle(new Point(bps[i].x, convertCartesianToCanvas(bps[i].y)), 5);
	// 	path.fillColor = "blue";
	// 	state.paths.push(path);
	// }

	//red lines
	var rl1, rl2, rl3, rl4, rl5, rl6;
	rl1 = line(t2, bps[0]);
	rl2 = line(t2, bps[1]);
	rl3 = line(t3, bps[2]);
	rl4 = line(t3, bps[3]);
	rl5 = line(t1, bps[4]);
	rl6 = line(t1, bps[5]);
	// path = new Path.Line(new Point(0, convertCartesianToCanvas(rl1.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(rl1.eval(canvasWidth))));
	// path.strokeColor = "red";
	// state.paths.push(path);
	// path = new Path.Line(new Point(0, convertCartesianToCanvas(rl2.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(rl2.eval(canvasWidth))));
	// path.strokeColor = "red";
	// state.paths.push(path);
	// path = new Path.Line(new Point(0, convertCartesianToCanvas(rl3.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(rl3.eval(canvasWidth))));
	// path.strokeColor = "red";
	// state.paths.push(path);
	// path = new Path.Line(new Point(0, convertCartesianToCanvas(rl4.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(rl4.eval(canvasWidth))));
	// path.strokeColor = "red";
	// state.paths.push(path);
	// path = new Path.Line(new Point(0, convertCartesianToCanvas(rl5.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(rl5.eval(canvasWidth))));
	// path.strokeColor = "red";
	// state.paths.push(path);
	// path = new Path.Line(new Point(0, convertCartesianToCanvas(rl6.eval(0))), new Point(canvasWidth, convertCartesianToCanvas(rl6.eval(canvasWidth))));
	// path.strokeColor = "red";
	// state.paths.push(path);

	//red points
	var rps = [];
	var temp = circleLineIntersection(c1, rl1);
	for (var i = 0; i < temp.length; i++) {
		if (!pointsEqual(temp[i], bps[0])) {
			rps.push(temp[i]);
		}
	}
	temp = circleLineIntersection(c1, rl2);
	for (var i = 0; i < temp.length; i++) {
		if (!pointsEqual(temp[i], bps[1])) {
			rps.push(temp[i]);
		}
	}
	temp = circleLineIntersection(c2, rl3);
	for (var i = 0; i < temp.length; i++) {
		if (!pointsEqual(temp[i], bps[2])) {
			rps.push(temp[i]);
		}
	}
	temp = circleLineIntersection(c2, rl4);
	for (var i = 0; i < temp.length; i++) {
		if (!pointsEqual(temp[i], bps[3])) {
			rps.push(temp[i]);
		}
	}
	temp = circleLineIntersection(c3, rl5);
	for (var i = 0; i < temp.length; i++) {
		if (!pointsEqual(temp[i], bps[4])) {
			rps.push(temp[i]);
		}
	}
	temp = circleLineIntersection(c3, rl6);
	for (var i = 0; i < temp.length; i++) {
		if (!pointsEqual(temp[i], bps[5])) {
			rps.push(temp[i]);
		}
	}
	// for (var i = 0; i < rps.length; i++) {
	// 	path = new Path.Circle(new Point(rps[i].x, convertCartesianToCanvas(rps[i].y)), 5);
	// 	path.fillColor = "red";
	// 	state.paths.push(path);
	// }

	//soddy circles
	var inner = [];
	var outer = [];
	var tc = threePointsToCircle(t1, t2, t3);
	for (var i = 0; i < rps.length; i++) {
		if (pointInCircle(rps[i], tc)) {
			inner.push(rps[i]);
		} else {
			outer.push(rps[i]);
		}
	}
	var isc = threePointsToCircle(inner[0], inner[1], inner[2]);
	var osc = threePointsToCircle(outer[0], outer[1], outer[2]);
	path = new Path.Circle(new Point(isc.center.x, convertCartesianToCanvas(isc.center.y)), isc.r);
	path.strokeColor = "black";
	state.paths.push(path);
	path = new Path.Circle(new Point(osc.center.x, convertCartesianToCanvas(osc.center.y)), osc.r);
	path.strokeColor = "black";
	state.paths.push(path);
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
		for (var i = 0; i < state.paths.length; i++) {
			state.paths[i].remove();
		}
		render();
	}
}

// function onMouseUp(event) {
// 	console.log({x: state.anchors[0].position.x, y: convertCanvasToCartesian(state.anchors[0].position.y)});
// 	console.log({x: state.anchors[1].position.x, y: convertCanvasToCartesian(state.anchors[1].position.y)});
// 	console.log({x: state.anchors[2].position.x, y: convertCanvasToCartesian(state.anchors[2].position.y)});
// }

function convertCartesianToCanvas(y) {
	return canvasHeight - y;
}

function convertCanvasToCartesian(y) {
	return canvasHeight - y;
}

$("#render").click(render);