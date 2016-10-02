module.exports = function(result, chance) {
    result.v1  = chance.integer({min: 100, max: 999});
    result.v2  = chance.integer({min: 100, max: 999});
    result.ans = result.v1 + result.v2;
    return result;
};
