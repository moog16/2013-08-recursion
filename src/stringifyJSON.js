// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {  
  if(typeof obj === "string"){
    return '"' + obj + '"';
  } else if(Array.isArray(obj)) {
    var innerArray = '';
    if(obj.length > 0) {
      for(var i=0; i< obj.length; i++) {
        innerArray = innerArray + stringifyJSON(obj[i]) + ',';
      }
      innerArray = innerArray.slice(0, -1);
    } else {
      innerArray = '';
    }
    
    return '[' + innerArray + ']';
  } else if(typeof obj === 'object' && obj !== null) {
    var keys = Object.keys(obj);
    var innerContent = '';
    if(keys.length > 0){
      for(var i =0; i <keys.length; i++){
        var value = obj[keys[i]];
        if(value !== undefined && (typeof value !== "function")) {
          innerContent = innerContent + 
              stringifyJSON(keys[i]) + ":" 
                + stringifyJSON(value) + ',';
        }
      }
      innerContent = innerContent.slice(0,-1);
    }

    return '{' + innerContent + '}';
  } else {
    return String(obj);
  }
};
