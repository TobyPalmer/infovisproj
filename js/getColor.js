function getColor(d){
    var colorArray = d3.entries(colorbrewer)[10].value[9];
    
        return d<2 ? colorArray[0] :
               d<4 ? colorArray[1] :
               d<6 ? colorArray[2] :
               d<8 ? colorArray[3] :
               d<10 ? colorArray[4] :
               d<12 ? colorArray[5] :
               d<14 ? colorArray[6] :
               d<16 ? colorArray[7] : colorArray[8];

};