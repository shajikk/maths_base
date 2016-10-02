module.exports = function(result, chance) {

  result.v1 = chance.weighted([ 1, 2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12], 
        		     [  2, 10, 20, 100, 100, 100, 100, 100, 100, 100, 100, 100]);
  
  result.v2 = chance.weighted([ 1, 2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12], 
        		     [  2, 10, 20, 100, 100, 100, 100, 100, 100, 100, 100, 100]);
  
  result.ans = result.v1 * result.v2;

  return result;
};
