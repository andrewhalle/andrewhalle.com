var fileAssociations = {
	"python-logo-inkscape-grey.png":"python-logo-inkscape.png",
	"python-logo-inkscape.png": "python-logo-inkscape-grey.png",
	"flask.png": "flask-grey.png",
	"flask-grey.png": "flask.png",
	"node.png": "node-grey.png",
	"node-grey.png": "node.png",
	"java.png": "java-grey.png",
	"java-grey.png": "java.png",
	"django-logo-positive.png": "django-logo-positive-grey.png",
	"django-logo-positive-grey.png": "django-logo-positive.png",
	"github-grey.png": "github-dark.png",
	"github-dark.png": "github-grey.png",
	"In-Black-34px-R.png": "In-2C-34px-R.png",
	"In-2C-34px-R.png": "In-Black-34px-R.png"
}

var skills = [
	{
		name: "python",
		image: "python-logo-inkscape-grey.png",
		link: "https://www.python.org/"
	},
	{
		name: "flask",
		image: "flask-grey.png",
		link: "http://flask.pocoo.org/"
	},
	{
		name: "django",
		image: "django-logo-positive-grey.png",
		link: "https://www.djangoproject.com/"
	},
	{
		name: "node.js",
		image: "node-grey.png",
		link: "https://nodejs.org/en/"
	},
	{
		name: "java",
		image: "java-grey.png",
		link: "https://www.java.com/en/"
	}
];

var scrollState = {
	position: 0,
	anchors: [0, 0, 0, 0, 0],
	anchorIndices: {
		"about": 0,
		"skills": 1,
		"experience": 2,
		"projects": 3,
		"playground": 4
	}
};

$(document).ready(setup);

function setup() {
	layout();

	$(window).resize(layout);
	$("#viewport").scroll(function(event) {
    	scrollState.position = $("#viewport").scrollTop();
    	renderSidebar();
	});

	$("#sidebar ul li").click(function() {
		setAnchorPositions();
		var index = $("#sidebar ul li").index(this);
		$("#viewport").animate({
			scrollTop: scrollState.anchors[index]
		}, 1000);
	});

	$("#social-links img").hover(function() {
		var filename = this.src.split("/");
		filename = filename[filename.length - 1];
		this.src = fileAssociations[filename];
	});
}

function layout() {
	viewportWidth();
	verticallyAlignCover();
	tableSkills();
	setAnchorPositions();
	renderSidebar();
}

function viewportWidth() {
	var windowWidth = $(window).width();
	var sidebarWidth = $("#sidebar").width();
	$("#photo").css("width", (windowWidth - sidebarWidth).toString() + "px");
	$("#viewport").css("width", (windowWidth - sidebarWidth).toString() + "px");
}

function verticallyAlignCover() {
	var imgHeight = $("#photo img").height();
	var containerHeight = $("#photo").height();
	$("#photo img").css("margin-top", (2 * (containerHeight - imgHeight) / 3).toString() + "px");
}

function tableSkills() {
	skillsPerRow = Math.floor(($("#viewport").width() * 0.75) / 100);
	nRows = Math.ceil(skills.length / skillsPerRow);
	var innerHTML = "";
	for (var i = 0; i < nRows - 1; i++) {
		innerHTML += "<tr>";
		for (var j = 0; j < skillsPerRow; j++) {
			var skill = skills[skillsPerRow * i + j];
			innerHTML += "<td class=\"not-last-row\">";
			innerHTML += "<a href=\"" + skill.link + "\">";
			innerHTML += "<img src=\"" + skill.image + "\">";
			innerHTML += "</a>"
			innerHTML += "</td>"
		}
		innerHTML += "</tr>";
	}
	innerHTML += "<tr>";
	for (var i = (nRows - 1) * skillsPerRow; i < skills.length; i++) {
		var skill = skills[i];
		innerHTML += "<td class=\"last-row\">";
		innerHTML += "<a href=\"" + skill.link + "\">";
		innerHTML += "<img id=\"" + skill.name + "\" src=\"" + skill.image + "\">";
		innerHTML += "</a>"
		innerHTML += "<p class=\"skill-name\"></p>"
		innerHTML += "</td>"
	}
	innerHTML += "</tr>";
	$("#skills-table").html(innerHTML);
	$(".last-row").css("width", ((skillsPerRow * 100) / (skills.length % skillsPerRow)).toString() + "px");
	$("#skills-table").css("width", ($("#viewport").width() * 0.75).toString() + "px");

	$("#skills-table tr td a img").mouseenter(function() {
		var filename = this.src.split("/");
		filename = filename[filename.length - 1];
		this.src = fileAssociations[filename];
		var elems = $(this).parent().parent().children();
		$(elems[1]).html(this.id);
	});

	$("#skills-table tr td a img").mouseleave(function() {
		var filename = this.src.split("/");
		filename = filename[filename.length - 1];
		this.src = fileAssociations[filename];
		var elems = $(this).parent().parent().children();
		$(elems[1]).html("");
	});
}

function setAnchorPositions() {
	var h = $(".space-fill").height();
	scrollState.anchors[0] = 0;
	scrollState.anchors[1] = $("#about").height() - h;
	scrollState.anchors[2] = $("#skills").height() + scrollState.anchors[1];
	scrollState.anchors[3] = $("#experience").height() + scrollState.anchors[2];
	scrollState.anchors[4] = $("#projects").height() + scrollState.anchors[3];
}

function renderSidebar() {
	for (var i = 0; i < scrollState.anchors.length; i++) {
		if (scrollState.anchors[i] > scrollState.position) {
			$("#sidebar ul li").css("font-weight", "normal");
			$($("#sidebar ul li")[i - 1]).css("font-weight", "bold");
			return;
		}
	}
}

