// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className, nodes, results) {
  results = results || [];
  nodes = nodes || document.body;
  
  var hasClass = function(child){
    var classList = child.classList;
    for(var i = 0; i < classList.length; i++){
      if(classList[i] === className){
        return true;
      }
    }
  };

  var children = nodes.childNodes;
  for(var i=0; i<children.length; i++) {

    if(children[i].classList && hasClass(className, children[i])) {
      results.push(children[i]);
    }
    getElementsByClassName(className, children[i], results);
  }

  return results;
};
