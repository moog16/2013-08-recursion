// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
	if(typeof obj === "number") {
		return obj + "";	
	}
	else if(typeof obj === "string") {
		return "\"" + obj + "\"";
	}
	else if(obj === null) {
		return "null";
	}
	else if(obj === true) {
		return "true";
	}
	else if(obj === false) {
		return "false";
	}
	else if(Array.isArray(obj)) {
		var result = [];
		if(obj.length > 1) {
			var workObj = [];
			workObj.push(obj);
			console.log(workObj);
			workObj.shift();
			result.push( stringifyJSON(workObj[0]));

		}
		if(obj.length === 0) {
			return "[]";
		}
		else if(typeof obj[0] === "number") {
			result.push(obj[0]);
		}
		else if(typeof obj[0] === "string") {
			result.push( "\"" + obj[0] + "\"" );
		}
		return "[" + result + "]";
	}

};