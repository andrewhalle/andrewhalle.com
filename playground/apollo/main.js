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
	},
];
generateGasket(circles, 1);

//draw circles
for (var i = 0; i < circles.length; i++) {
	var circle = new Path.Circle(new Point(circles[i].center.x, circles[i].center.y), circles[i].radius);
	circle.strokeColor = "black";
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

function outerSoddyCircle(c1, c2, c3) {
	//returns c, the outer soddy circle for 3 mutually tangent circles
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
	var queue = [];
	generateGasketHelper(circles, queue, limit);
}