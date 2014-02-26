function getColor(d, min, max, mean){


	rangeMin = mean-min;
	rangeMax = max-mean;
	rangeMin = rangeMin/10;
	rangeMax = rangeMax/10;


    var colorArray = d3.entries(colorbrewer)[10].value[9];
    
    return d< (min+rangeMin) ? colorArray[0] :
           d< (min+rangeMin*4)? colorArray[1] :
           d< (min+rangeMin*7)? colorArray[2] :
           d< (min+rangeMin*9)? colorArray[3] :
           d< mean ? colorArray[4] :
           d< (max-rangeMax*9)? colorArray[5] :
           d< (max-rangeMax*4)? colorArray[6] :
           d< (max-rangeMax*2) ? colorArray[7] : colorArray[8];
 



};

function getBrushColor(data,variable,d,min,max,mean){

        for(var j = 0; j<data.length; j++){
         
            if(data[j]["Country"]==d.properties.name){

                return getColor(data[j][variable],min,max,mean);
            }
        }

        return "green";
};