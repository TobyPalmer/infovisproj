function getColor(d, min, max){

	range = max-min;
	console.log(d);

    var colorArray = d3.entries(colorbrewer)[10].value[9];
    
    return d<(range/9)+min ? colorArray[0] :
           d<((range/9)*2)+min ? colorArray[1] :
           d<((range/9)*3)+min ? colorArray[2] :
           d<((range/9)*4)+min ? colorArray[3] :
           d<((range/9)*5)+min ? colorArray[4] :
           d<((range/9)*6)+min ? colorArray[5] :
           d<((range/9)*7)+min ? colorArray[6] :
           d<((range/9)*8)+min ? colorArray[7] : colorArray[8];
 



};