module.exports = function(result, chance) {

    var flip  = chance.integer({min: 0, max: 1});


    var a  = chance.integer({min: 11, max: 99});
    var b  = chance.integer({min: 2, max: 9});

    var str   = "";
    var sel   = chance.weighted([ 'ass', 'round'], 
  			         [ 100,     100]);

    if (sel == 'ass') { 
      str = "Please use associative property.   <br>" + 
            "Example : 29 x 5 = (20 + 9) x 5 <br>" + 
            "                 = 20x5 + 9x5   <br>" + 
            "                 = 100  + 45    <br>" + 
            "                 = 145";
      result.ans = a * b;
    }

    if (sel == 'round') { 
      var rounded = Math.round(a/10) * 10;
      result.ans = rounded * b; 

      str = "Please use rounding   <br>" + 
            "Example : 29 x 5 <br>" + 
            "                 lower limit 20 <br>" + 
            "                 upper limit 30 <br>" + 
            "                 29 rounds to 30, since it ends with '9' <br>" + 
            "                 = 30 x 5 <br>"+ 
            "                 = 150 <br>";

    }


    if (flip) { 
      result.v1  = a;
      result.v2  = b;
    } else {
      result.v1  = b;
      result.v2  = a;
    }

    result.msg =  str.replace(/ /g, '&nbsp;');
			 ;
    return result;
};
