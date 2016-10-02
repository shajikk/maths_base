module.exports = function(result, chance) {

  var a  = chance.integer({min: 100, max: 999});
  var b  = chance.integer({min: 100, max: 999});
  if (a > b) {
    result.v1 = a;
    result.v2 = b;
  }
  if (a < b) {
    result.v1 = b;
    result.v2 = a;
  }
  result.ans = result.v1 - result.v2;
  return result;
};
