// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj, initialize) {
	var isSet = false;
	if(initialize === undefined) {
		isSet = true;
	}

	var arrayDepth = function(arr) {
		var count = 0;
		while(Array.isArray(arr)) {
			arr = arr[0];
			count ++;
		}
		return count;
	};

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
			if(Array.isArray(inObj[0])) {
				var depth = arrayDepth(inObj[0]);
				if(depth > 2) {
					var paren = inObj[0];
					for(var i=0; i<depth; i++) {
						paren = paren[0];
					}
					paren = inString(paren);
					for(var i=0; i<depth+1; i++) {
						paren = "[" + paren + "]";
					}
					return paren;
				}
				else {
					return stringifyJSON(inObj[0]);
				}
			}
			else if(inObj.length === 0) {
				return "[]";
			}
			else if(typeof inObj[0] === "number") {
				return multiVal ? inObj[0] : "[" + inObj[0] + "]";
			}
			else if(typeof inObj[0] === "string") {
				return multiVal ?  "\"" + inObj[0] + "\"" : "[\"" + inObj[0] + "\"]";
			}
		}
		else {
			//console.log(obj);
			var keys = Object.keys(obj);
			if(keys.length === 0) {
				return "{}";
			}
			else {
				var str = "{";
				for(var key in keys) {
					str += stringifyJSON(keys[key]) + ":" + stringifyJSON(obj[keys[key]]) + ",";
				}
				str = str.substring(0,str.length-1) + "}";	// substring removes last ','
				console.log(str);
				return str;
			}
		}
	};

	if(Array.isArray(obj) && obj.length > 1) {
		var workObj = obj.slice(0); 	// fix for overwriting original obj
		var	temp = inString(workObj[0], true);
		if(isSet) {
			temp = "[" + temp;
		}
		workObj.shift();
		if(workObj.length === 1) {
			return temp + "," + inString(workObj, true) + "]";
		}
		else {
			return temp + "," + stringifyJSON(workObj, true);
		}
	}
	else {
		return inString(obj, false);
	}
};