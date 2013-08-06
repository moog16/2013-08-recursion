// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
	var len = json.length;
	var num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

	var type = function(el) {
	  if(_.contains(num, el)) {
	  	return 'number';
	  }
	};

	if(type(json) === 'number') {
		return parseInt(json);
	} else if(json === 'null') {
		return null;
	} else if(json === 'true') {
		return true;
	} else if(json === 'false') {
		return false;
	} else if(json[0] === '[' && json[len-1] === ']') {
		return [json[1]];
	}
};
