$(document).ready(setup);

function setup() {
	layoutAndResize();
	$(window).resize(layoutAndResize);
}

function layoutAndResize() {
	var properWidth = $("body").innerWidth();
	$(".sidebar").css("width", (properWidth * 0.18).toString() + "px");
	$("#cover").css("margin-left", ((properWidth - 300) / 2).toString() + "px");
	$(".card").css("width", (properWidth * 0.64).toString() + "px");
	$(".card").css("margin-left", (properWidth * 0.18).toString() + "px");
}