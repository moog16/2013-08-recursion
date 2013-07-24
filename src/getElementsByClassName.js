// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
	var body = document.body.innerHTML;

	console.log(document.body.className);
	console.log("the body looks like: " + body);
	//console.log(className);
};
