function line(p1, p2) {
	//returns the Line defined by the two points p1, p2
	m = (p2.y - p1.y) / (p2.x - p1.x);
	b = p1.y - m * p1.x;
	return {m: m, b: b, eval: (x) => {return this.m * x + this.b}};
}