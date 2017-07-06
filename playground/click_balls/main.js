var ballTracker = [];
$( document ).ready(setup);

function setup() {
	$("#game").click(addBall);
	window.requestAnimationFrame(animate);
}

function addBall(click) {
	ballTracker.push({x: click.offsetX, y: click.offsetY, vx: Math.random() * 10, vy: Math.random() * 10, color: "red"});
}

function animate() {
	var ctx = $("#game")[0].getContext("2d");
	ctx.clearRect(0, 0, 700, 700);
	var i, ball;
	for (i = 0; i < ballTracker.length; i++) {
		ball = ballTracker[i];
		ball.x += ball.vx;
		ball.y += ball.vy;
		if (ball.x < 0 || ball.x > 700) {
			ball.vx *= -1;
		}
		if (ball.y < 0 || ball.y > 700) {
			ball.vy *= -1
		}
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, 5, 0, 2*Math.PI, false);
		ctx.fillStyle = ball.color;
		ctx.fill();
		ctx.stroke();
	}
	window.requestAnimationFrame(animate);
}