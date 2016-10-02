module.exports = function(result, chance) {

  var sel  = chance.weighted([ 'a',  'b', 'c', 'd', 'e'], 
    		         [ 50,  100, 100, 100, 100]);

  if (sel == 'a') {
    result.v1  = chance.integer({min: 10, max: 100});
    result.v2  = 10;
  }

  if (sel == 'b') {
    result.v1  = chance.integer({min: 100, max: 1000});
    result.v2  = chance.weighted([ 10,  100], 
    		           [ 100, 100]);
  }

  if (sel == 'c') {
    result.v1  = chance.integer({min: 1000, max: 10000});
    result.v2  = chance.weighted([ 100,  1000], 
    		           [ 100,  100]);
  }

  if (sel == 'd') {
    result.v1  = chance.integer({min: 10000, max: 100000});
    result.v2  = chance.weighted([ 100,  1000, 10000], 
    		           [ 100,  100,  100]);
  }

  if (sel == 'e') {
    result.v1  = chance.integer({min: 100000, max: 1000000});
    result.v2  = chance.weighted([ 1000, 10000, 100000], 
    		           [ 100,  100,   100]);
  }

  var a  = Math.floor(result.v1/(result.v2)) * result.v2;
  var b = a % (result.v2 * 10);
  var c = b/result.v2;

  var bucket  = chance.weighted([ 'lt5',  'eq5', 'gt5'], 
    	                  [ 100,    100,   100 ]);
  var calculated =  result.v1;
  if (bucket == 'lt5') {
    if (c > 4) {
      calculated = result.v1 - 5 * result.v2;
    }
  }

  if (bucket == 'eq5') {
    if (c > 5) {
      calculated = result.v1 - (c - 5) * result.v2;
    }
    if (c < 5) {
      calculated = result.v1 +  (5 - c) * result.v2;
    }
  }

  if (bucket == 'gt5') {
    if (c < 4) {
      calculated = result.v1 + 5 * result.v2;
    }
  }

  result.v1 = calculated;

  result.ans = Math.round(result.v1/result.v2) * result.v2;

  return result;
};
