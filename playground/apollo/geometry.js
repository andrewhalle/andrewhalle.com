function line(p1, p2) {
	//returns the Line defined by the two points p1, p2
	var m = (p2.y - p1.y) / (p2.x - p1.x);
	var b = p1.y - m * p1.x;
	return {
		m: m,
		b: b,
		eval: function(x) {
			return this.m * x + this.b
		}
	};
}

function angleBisector(p1, p2, p3) {
	x1 = p1.x - p2.x;
	y1 = p1.y - p2.y;
	x3 = p3.x - p2.x;
	y3 = p3.y - p2.y;

	var angle = (Math.atan2(y1, x1) + Math.atan2(y3, x3)) / 2;
	var m = Math.tan(angle);
	var b = p2.y - m * p2.x;
	return {
		m: m,
		b: b,
		eval: function(x) {
			return this.m * x + this.b
		}
	};
}

function twoLineIntersection(l1, l2) {
	//returns the intersection point of two lines l1 and l2
	var x = (l2.b - l1.b) / (l1.m - l2.m);
	var y = l1.m * x + l1.b;
	return {x: x, y: y};
}

function perpendicularLine(p, l) {
	//returns a line perpendicular to l through p
	var m = -(1 / l.m);
	var b = p.y + (p.x / l.m);
	return {
		m: m,
		b: b,
		eval: function(x) {
			return this.m * x + this.b
		}
	};
}

function distance(p1, p2) {
	//returns Euclidean distance between two points
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function circleLineIntersection(c, l) {
	//returns a list of points at which a line and circle intersect, or an empty list if they do not intersect
	p1 = {x: 0 - c.center.x, y: l.eval(0) - c.center.y};
	p2 = {x: 1 - c.center.x, y: l.eval(1) - c.center.y};
	d_x = p2.x - p1.x;
	d_y = p2.y - p1.y;
	d_r = Math.sqrt(Math.pow(d_x, 2) + Math.pow(d_y, 2));
	D = p1.x * p2.y - p2.x * p1.y;
	delta = Math.pow(c.r, 2) * Math.pow(d_r, 2) - Math.pow(D, 2);
	if (Math.abs(delta) < 1e-7) {
		delta = 0;
		x = (D * d_y + Math.sign(d_y) * d_x * Math.sqrt(delta)) / (Math.pow(d_r, 2));
		y = (-D * d_x + Math.abs(d_y) * Math.sqrt(delta)) / (Math.pow(d_r, 2));
		return [{x: x + c.center.x, y: y + c.center.y}];
	} else if (delta > 0) {
		x1 = (D * d_y + Math.sign(d_y) * d_x * Math.sqrt(delta)) / (Math.pow(d_r, 2));
		y1 = (-D * d_x + Math.abs(d_y) * Math.sqrt(delta)) / (Math.pow(d_r, 2));
		x2 = (D * d_y - Math.sign(d_y) * d_x * Math.sqrt(delta)) / (Math.pow(d_r, 2));
		y2 = (-D * d_x - Math.abs(d_y) * Math.sqrt(delta)) / (Math.pow(d_r, 2));
		return [{x: x1 + c.center.x, y: y1 + c.center.y}, {x: x2 + c.center.x, y: y2 + c.center.y}];
	} else {
		return [];
	}
}

function pointBetween(p, p1, p2) {
	//returns true if p is on the line segment defined by p1 and p2
	var l = line(p1, p2);
	if (p.y == l.eval(p1.x)) {
		if (p2.x >= p1.x) {
			return p.x > p1.x && p.x < p2.x;
		} else {
			return p.x > p2.x && p.x < p1.x;
		}
	}
}

function pointsEqual(p1, p2) {
	//returns true if p1 and p2 are equal to some tolerance
	xDiff = p1.x - p2.x;
	yDiff = p1.y - p2.y;
	return Math.abs(xDiff) < 1e-7 && Math.abs(yDiff) < 1e-7
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

	return {center: {x: x, y: y}, r: r};
}

function pointInCircle(p, c) {
	//returns true if point is within bounds of circle
	var dist = distance(p, c.center);
	return dist < c.r;
}

function twoCircleTangent(c1, c2) {
	//returns the point of tangency between two circles c1 and c2
	if (c2.center.x < c1.center.x) {
		return twoCircleTangent(c2, c1);
	}
	if (pointInCircle(c1.center, c2)) {
		var angle = Math.atan2(c2.center.y - c1.center.y, c2.center.x - c1.center.x);
		return {x: c1.center.x - c1.r * Math.cos(angle), y: c1.center.y - c1.r * Math.sin(angle)};
	} else if (pointInCircle(c2.center, c1)) {
		var angle = Math.atan2(c2.center.y - c1.center.y, c2.center.x - c1.center.x);
		return {x: c2.center.x + c2.r * Math.cos(angle), y: c2.center.y + c2.r * Math.sin(angle)};
	} else {
		var angle = Math.atan2(c2.center.y - c1.center.y, c2.center.x - c1.center.x);
		return {x: c1.center.x + c1.r * Math.cos(angle), y: c1.center.y + c1.r * Math.sin(angle)};
	}
}

function reflectPoint(p, c) {
	//returns p', the reflection of p through c
	var angle = Math.atan2(p.y - c.center.y, p.x - c.center.x);
	var length = Math.pow(c.r, 2) / distance(p, c.center);
	return {x: c.center.x + length * Math.cos(angle), y: c.center.y + length * Math.sin(angle)};
}

function reflectCircle(c1, c2) {
	//returns c3, the reflection of c1 through c2
	var p1 = {x: c1.center.x + c1.r, y: c1.center.y};
	var p2 = {x: c1.center.x - c1.r, y: c1.center.y};
	var p3 = {x: c1.center.x, y: c1.center.y + c1.r};
	var p1_prime = reflectPoint(p1, c2);
	var p2_prime = reflectPoint(p2, c2);
	var p3_prime = reflectPoint(p3, c2);
	return threePointsToCircle(p1_prime, p2_prime, p3_prime);
}