$( document ).ready(function() {
	$("#download").hover(function() {
		$("#download").attr("href", $("#main")[0].toDataURL());
	});
});

function addSquare(point) {
	var offset1 = Math.floor(Math.random() * (100 - 20)) + 20;
	var offset2 = Math.floor(Math.random() * (100 - 20)) + 20;
	var rectangle = new Rectangle(new Point(point.x - offset1, point.y - offset2),
		new Point(point.x + offset1, point.y + offset2));
	var path = new Path.Rectangle(rectangle);
	path.fillColor = new Color(Math.random(), Math.random(), Math.random());
}

function onMouseDown(event) {
	addSquare(event.point);
}