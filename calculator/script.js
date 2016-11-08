function flip(bit) {
	var bulb = document.getElementById(bit);
	if (bulb.src == "file:///home/ahalle/Desktop/andrewhalle.com/images/off.jpg") {
		bulb.src = "../images/on.jpg";
	} else {
		bulb.src = "../images/off.jpg";
	}
	calcResult();
}

function chooseType(type) {
	var unsigned = document.getElementById("unsigned");
	var signed = document.getElementById("signed");
	if (type == "unsigned") {
		unsigned.style.backgroundColor = "red";
		unsigned.className = "active";
		signed.style.backgroundColor = "white";
		signed.className = "inactive";
	} else {
		unsigned.style.backgroundColor = "white";
		unsigned.className = "inactive"
		signed.style.backgroundColor = "red";
		signed.className = "active";
	}
	calcResult();
}

function switchBit(x) {
	if (x == 0) {
		return 1;
	} else {
		return 0;
	}
}

function translateBit(bit) {
	if (bit == "file:///home/ahalle/Desktop/andrewhalle.com/images/off.jpg") {
		return 0;
	} else {
		return 1;
	}
}

function calcResult() {
	var bit0 = translateBit(document.getElementById("bit0").src);
	var bit1 = translateBit(document.getElementById("bit1").src);
	var bit2 = translateBit(document.getElementById("bit2").src);
	var bit3 = translateBit(document.getElementById("bit3").src);
	var bit4 = translateBit(document.getElementById("bit4").src);
	var bit5 = translateBit(document.getElementById("bit5").src);
	var bit6 = translateBit(document.getElementById("bit6").src);
	var bit7 = translateBit(document.getElementById("bit7").src);
	var signed = document.getElementById("signed").className == "active";
	if (signed) {
		var condition = (bit7 == 1);
		if (condition) {
			bit0 = switchBit(bit0);
			bit1 = switchBit(bit1);
			bit2 = switchBit(bit2);
			bit3 = switchBit(bit3);
			bit4 = switchBit(bit4);
			bit5 = switchBit(bit5);
			bit6 = switchBit(bit6);
			bit7 = switchBit(bit7);
		}
		var result = bit0 + 2*bit1 + 4*bit2 + 8*bit3 + 16*bit4 + 32*bit5 + 64*bit6 + 128*bit7;
		if (condition) {
			document.getElementById("result").innerHTML = -(result + 1);
		} else {
			document.getElementById("result").innerHTML = result;
		}
	} else {
		var result = bit0 + 2*bit1 + 4*bit2 + 8*bit3 + 16*bit4 + 32*bit5 + 64*bit6 + 128*bit7;
		document.getElementById("result").innerHTML = result;
	}
}