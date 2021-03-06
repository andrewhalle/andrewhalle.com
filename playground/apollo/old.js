//starting state
var circles = [
	{
		center: {x: 350, y: 250},
		radius: 100
	},
	{
		center: {x: 550, y: 250},
		radius: 100
	},
	{
		center: {x: 450, y: (100 * Math.tan(60 * Math.PI / 180)) + 250},
		radius: 100
	}
];
//generateGasket(circles, 1);

//draw circles
for (var i = 0; i < circles.length; i++) {
	var circle = new Path.Circle(new Point(circles[i].center.x, circles[i].center.y), circles[i].radius);
	circle.strokeColor = "black";
}
var reds = outerRed(circles[2], circles[0], circles[1]);
for (var i = 0; i < reds.length; i++) {
	var circle = new Path.Circle(new Point(reds[i].x, reds[i].y), 5);
	circle.fillColor = "red";
}

function distance(p1, p2) {
	//Euclidean distance between p1 and p2
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function reflectPoint(p, c) {
	//returns p', the reflection of p through c
	var angle = Math.atan2(c.center.y - p.y, p.x - c.center.x);
	var length = Math.pow(c.radius, 2) / distance(p, c.center);
	return {x: c.center.x + length * Math.cos(angle), y: c.center.y - length * Math.sin(angle)};
}

function reflectCircle(c1, c2) {
	//returns c3, the reflection of c1 through c2
	var p1 = c1.center;
	var p2 = {x: c1.center.x + c1.radius, y: c1.center.y};
	var c3 = {};
	c3.center = reflectPoint(p1, c2);
	var pointOnCircle = reflectPoint(p2, c2);
	c3.radius = distance(c3.center, pointOnCircle);
	return c3;
}

function threePointsToCircle(p1, p2, p3) {
	//returns c, the circle passing through points p1, p2, and p3
	var A = math.det([[p1.x, p1.y, 1], [p2.x, p2.y, 1], [p3.x, p3.y, 1]]);
	var B = -1 * math.det([[Math.pow(p1.x, 2) + Math.pow(p1.y, 2), p1.y, 1], [Math.pow(p2.x, 2) + Math.pow(p2.y, 2), p2.y, 1], [Math.pow(p3.x, 2) + Math.pow(p3.y, 2), p3.y, 1]]);
	var C = math.det([[Math.pow(p1.x, 2) + Math.pow(p1.y, 2), p1.x, 1], [Math.pow(p2.x, 2) + Math.pow(p2.y, 2), p2.x, 1], [Math.pow(p3.x, 2) + Math.pow(p3.y, 2), p3.x, 1]]);
	var D = -1 * math.det([[Math.pow(p1.x, 2) + Math.pow(p1.y, 2), p1.x, p1.y], [Math.pow(p2.x, 2) + Math.pow(p2.y, 2), p2.x, p2.y], [Math.pow(p3.x, 2) + Math.pow(p3.y, 2), p3.x, p3.y]]);

	var x = (-B) / (2 * A);
	var y = (-C) / (2 * A);
	var r = Math.sqrt((Math.pow(B, 2) + Math.pow(C, 2) - 4 * A * D) / (4 * Math.pow(A, 2)));

	return {center: {x: x, y: y}, radius: r};
}

function circleLineIntersection(c, p1, p2) {
	//returns a list of points of intersection between the circle c and the line defined by the two points p1 and p2
	//shifting to origin
	p1.x -= c.center.x;
	p2.x -= c.center.x;
	p1.y -= c.center.y;
	p2.y -= c.center.y;

	var d_x = p2.x - p1.x;
	var d_y = p1.y - p2.y;
	var d_r = Math.sqrt(Math.pow(d_x, 2) + Math.pow(d_y, 2));
	var D = p1.x * p2.y - p2.x * p1.y
	var delta = Math.pow(c.radius, 2) * Math.pow(d_r, 2) - Math.pow(D, 2);

	var x1 = (D * d_y + Math.sign(d_y) * d_x * Math.sqrt(delta)) / (Math.pow(d_r, 2));
	var x2 = (D * d_y - Math.sign(d_y) * d_x * Math.sqrt(delta)) / (Math.pow(d_r, 2));
	var y1 = (-D * d_x + Math.abs(d_y) * Math.sqrt(delta)) / (Math.pow(d_r, 2));
	var y2 = (-D * d_x + Math.abs(d_y) * Math.sqrt(delta)) / (Math.pow(d_r, 2));
	if (delta > 0) {
		return [{x: x1 + c.center.x, y: y1 + c.center.y}, {x: x2 + c.center.x, y: y2 + c.center.y}];
	} else if (delta == 0) {
		return [{x: x1 + c.center.x, y: y1 + c.center.y}];
	} else {
		return [];
	}
}

function outerRed(c1, c2, c3) {
	//returns p, the outer red point of c1 with respect to the triplet of circles c1, c2, and c3
	var angle1 = Math.atan2(c2.center.y - c3.center.y, c3.center.x - c2.center.x);
	var angle2 = Math.atan2(c3.center.y - c2.center.y, c2.center.x - c3.center.x);
	var yellow = {x: c2.center.x + c2.radius * Math.cos(angle1), y: c2.center.y - c2.radius * Math.sin(angle1)};
	//blue point
	var blue1 = {x: c1.center.x + c1.radius * Math.cos(Math.PI / 2 - angle1), y: c1.center.y + c1.radius * Math.sin(Math.PI / 2 - angle1)};
	var blue2 = {x: c1.center.x + c1.radius * Math.cos(Math.PI / 2 - angle2), y: c1.center.y + c1.radius * Math.sin(Math.PI / 2 - angle2)};
	//red point
	var reds1 = circleLineIntersection(c1, yellow, blue1);
	var reds2 = circleLineIntersection(c1, yellow, blue2);
	var reds = [];
	console.log(reds1);
	if (!((reds1[0].x == blue1.x) && (reds1[0].y == blue1.y))) {
		reds.push(reds1[0]);
	}
	if (!((reds1[1].x == blue1.x && reds1[1].y == blue1.y))) {
		reds.push(reds1[1]);
	}
	if (!((reds2[0].x == blue2.x && reds2[0].y == blue2.y))) {
		reds.push(reds2[0]);
	}
	if (!((reds2[1].x == blue2.x && reds2[1].y == blue2.y))) {
		reds.push(reds2[1]);
	}
	return reds;
}

function outerSoddyCircle(c1, c2, c3) {
	//returns c, the outer soddy circle for 3 mutually tangent circles
	return threePointsToCircle(outerRed(c1, c2, c3), outerRed(c2, c1, c3), outerRed(c3, c1, c2));
}

function innerSoddyCircle(c1, c2, c3) {
	//returns c, the inner soddy circle for 3 mutually tangent circles
}

function generateGasketHelper(circles, queue, limit) {
	//implement this
}

function generateGasket(circles, limit) {
	circles.push(outerSoddyCircle(circles[0], circles[1], circles[2]));
	circles.push(innerSoddyCircle(circles[0], circles[1], circles[2]));

	//set up the queue with 4 and 5, its very similar to depth-first search
	if (limit > 1) {
		var queue = [];
		generateGasketHelper(circles, queue, limit);
	}
}