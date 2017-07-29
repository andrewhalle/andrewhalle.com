var fileAssociations = {
	"python-logo-inkscape-grey.png":"python-logo-inkscape.png",
	"python-logo-inkscape.png": "python-logo-inkscape-grey.png",
	"flask.png": "flask-grey.png",
	"flask-grey.png": "flask.png",
	"node.png": "node-grey.png",
	"node-grey.png": "node.png"
}

var skills = [
	{
		name: "Python",
		image: "python-logo-inkscape-grey.png",
		link: "https://www.python.org/"
	},
	{
		name: "Flask",
		image: "flask-grey.png",
		link: "http://flask.pocoo.org/"
	},
	{
		name: "node.js",
		image: "node-grey.png",
		link: "https://nodejs.org/en/"
	}
];

$(document).ready(setup);

function setup() {
	layout();

	$(window).resize(layout);
}

function layout() {
	verticallyAlignCover();
	tableSkills();
}

function verticallyAlignCover() {
	var imgHeight = $("#photo img").height();
	var containerHeight = $("#photo").height();
	$("#photo img").css("margin-top", (2 * (containerHeight - imgHeight) / 3).toString() + "px");
}

function tableSkills() {
	skillsPerRow = Math.floor(($("#viewport").width() - 20) / 100);
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
		innerHTML += "<img src=\"" + skill.image + "\">";
		innerHTML += "</a>"
		innerHTML += "</td>"
	}
	innerHTML += "</tr>";
	$("#skills-table").html(innerHTML);
	$(".last-row").css("width", ((skillsPerRow * 100) / (skills.length % skillsPerRow)).toString() + "px");
	$("#skills-table").css("width", ($("#viewport").width() - 20).toString() + "px");

	$("#skills-table tr td img").hover(function() {
		var filename = this.src.split("/");
		filename = filename[filename.length - 1];
		this.src = fileAssociations[filename];
	});
}

