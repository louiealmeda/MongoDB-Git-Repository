exports = {
  
  getChunks: getChunks()
  
};

var current = 0;

var manager = {
  input: raw,
  size: 1000,
  findNext: findNext,
  findChunk: findChunk
};

function getChunks(input, callback, size) {
  
  if (input.constructor !== String)
    throw 'input should be a string';
  
  manager.input = input || "";
  callback = callback || function () { };
  manager.size = size || 1000;
  
  
  while (true){
  
   	var index = findChunk();
	
	current = 0;
   	var chunk = manager.input.slice(1, index);
   	
   	manager.input = manager.input.substring(index,manager.input.length);
   	// console.log(manager.input.length);
   	
  	if (manager.input.length === 3){
  	  callback(chunk + "}");
	  break;
	}
 
	callback(chunk);
	
  }

}

function findChunk(){
  var prev = 0;
  
  while (true){
  
    var next = findNext();
  	// console.log('next:' + next);
    if (next > manager.size || next === 0)
      break;
    
    prev = next;
    
  }
  
  return prev;
  
}

function findNext(){
  
  current = manager.input.indexOf(',\n	{',current + 1);

  if (current === -1)
    return manager.input.indexOf('}\n]',current + 1);
  
  return current;
  
}

