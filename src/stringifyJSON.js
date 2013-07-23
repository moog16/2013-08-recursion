// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
	var inString = function (inObj, multiVal) {
		if(typeof inObj === "number") {
			return inObj + "";	
		}
		else if(typeof inObj === "string") {
			return "\"" + inObj + "\"";
		}
		else if(inObj === null) {
			return "null";
		}
		else if(inObj === true) {
			return "true";
		}
		else if(inObj === false) {
			return "false";
		}
		else if(Array.isArray(inObj)) {
			if(inObj.length === 0) {
				return "[]";
			}
			else if(typeof inObj[0] === "number") {
				return multiVal ? inObj[0] : "[" + inObj[0] + "]";
			}
			else if(typeof inObj[0] === "string") {
				return multiVal ?  "\"" + inObj[0] + "\"" : "[\"" + inObj[0] + "\"]";
			}
		}
	};

	if(Array.isArray(obj) && obj.length > 1) {

		var workObj = obj.slice(0);
		//console.log(workObj);
		var temp;
		temp = inString(workObj[0], true);
		

		workObj.shift();
		//console.log(workObj);

		if(workObj.length === 1) {
			return temp + "," + inString(workObj, true) + "]";
		}
		else {
			return temp + "," + stringifyJSON(workObj);
		}
	}
	else {
		return inString(obj, false);
	}
};