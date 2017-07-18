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