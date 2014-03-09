function pca(){

    var self = this; // for internal d3 functions

    var sp2Div = $("#sp2");

    var margin = {top: 20, right: 120, bottom: 40, left: 120},
        width = sp2Div.width() - margin.right - margin.left,
        height = sp2Div.height() - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(10);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#sp2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Load data
    d3.csv("data/factbook.csv", function(data) {
        self.data = covariance(data);

        //console.log(data);
        draw();

    });

    
    function draw()
    {   
        var score = self.data.score.elements;
        var maxy = 0;//d3.max(self.data, function(d){return d[t1]; });
        var miny = 10000;//d3.min(self.data, function(d){return d[t1]; });
        var maxx = 0;//d3.max(self.data, function(d){return d[t1]; });
        var minx = 10000;//d3.min(self.data, function(d){return d[t1]; });
        var meanx = 0;//d3.mean(self.data, function(d){return d[t1]; });
        var meany = 0;

        var PC = self.data.pcPercent;

        var xLabel = 0;
        var yLabel = 1;
        
        var count = 0;
        //console.log(yLabel + " <- y, x -> " + xLabel);

        for(var i=0; i<score.length; i++){
            if(score[i][yLabel]!= ""){
                //count++;
                if(score[i][yLabel] < miny)
                    miny = score[i][yLabel];

                if(score[i][yLabel]>maxy)
                    maxy = score[i][yLabel];
                //console.log(maxy);
            }
        }
        //meanx = mean/count;

        for(var i=0; i<score.length; i++){
            if(score[i][xLabel]!= ""){
                count++;
                if(score[i][xLabel] < minx)
                    minx = score[i][xLabel];

                if(score[i][xLabel]>maxx)
                    maxx = score[i][xLabel];
               //console.log(max2 + "helu");
            }
        }

        /*console.log(maxx + " <- maxx, maxy -> " + maxy);
        console.log(minx + " <- minx, miny -> " + miny);*/

        x.domain([minx/*/(maxx-minx)*/, maxx/*/(maxx-minx)*/]/*d3.max(data, function(d){
            //console.log(d[xLabel]);
            return d[xLabel];
        })]*/
        );
        
        y.domain([miny/*/(maxy-miny)*/, maxy/*/(maxy-miny)*/]);/*d3.max(data, function(d){
            //console.log(d[yLabel]);
            //console.log(yLabel);
            return d[yLabel];
        })]);*/

        //min

        //meanx = mean/count;

        // Add x axis and title.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width*0.5-40)
            .attr("y", margin.bottom)
            .style("font-size", 12)
            .text("PC1 - " + (PC[0]*100).toFixed(2) + " % of variation");
            
        // Add y axis and title.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left)
            .attr("x", 240-width*0.5)
            .attr("dy", ".71em")
            .style("font-size", 12)
            .text("PC2 - " + (PC[1]*100).toFixed(2) + " % of variation");
            

        var tooltip = d3.select("#sp2")
            .append("div")
            .style("position", "absolute")
            .style("visability", "hidden")
            .style("z-index", "3")
            .style("background-color", "orange");

                
        // Add the scatter dots.
        svg.selectAll(".dot")
            .data(score)
            .enter().append("circle")
            .attr("class", "dot")

            .attr("cx", function(d){
            return width/(maxx-minx)*(d[xLabel]-minx);})
            .attr("cy", function(d){
            return height/(maxy-miny)*(maxy-d[yLabel]);})
            .attr("r", 2)
            /*.style("fill", function(d){
                //console.log(xLabel);
                return getColor(d["Country"].length);
            })*/



            //Define the x and y coordinate data values for the dots
            //...


            //tooltip
            .on("mouseover", function(d){
                //tooltip.transition()        
                //.duration(200)      
                //.style("opacity", .9);      
              return  tooltip.html(d["Country"] + "<br/>" + d[xLabel] +  ", " + d[yLabel])
                .style("visibility", "visible")
                .style("left", (d3.event.pageX - width) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");    
               // return tooltip.style("visibility", "visible")
                 //             .text(d["Country"]);
            })
            .on("mousemove", function(){return tooltip.style("top",
                (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");})

            .on("click",  function(d) {
                //...    
                alert(d["Country"] + ":\n" + xLabel + ": " + d[xLabel] +  ", \n" + yLabel + ": " + d[yLabel]);

            });
    };

    function covariance(value){

        var dimensions = 0;
        var evMatrix;
        var centered;
        var centeredMatrix;
        var dataPoints;
        var summa = 0;
        var covarianceMatrix;
        var plott = new Array();
        for(var val in value[0]){
            dimensions++;
        }
        //dimensions = dimensions - 1;
        var avg = avgValue(value);
        //console.log(avg);

        //Standardized data
        var standard = standardize(value, avg, dimensions-1);
        
        //covariance matrix and centered matrix
        //var cacdm = covAndCDMatrix(value, standard,avg,dimensions);
        var cacdm = covAndCDMatrix(value, avg, dimensions-1);
        
        centered = cacdm.bar;
        covarianceMatrix = cacdm.cov;

        //eigenvectors and eigenvalues from covariance matrix
        var eig = numeric.eig(covarianceMatrix);

        centeredMatrix = Matrix.create(centered);
        evMatrix = Matrix.create(eig.E.x);
        console.log(eig);
        
        //Scores, where every column is one principal component (PC1, PC2 etc..)
        dataPoints = centeredMatrix.multiply(evMatrix);

        //CorrelationMatrix
        var correlation = correlationMatrix(covarianceMatrix, dimensions-1);

        var lambda = eig.lambda.x;
        for(var i = 0; i<lambda.length; i++){
            summa = parseFloat(lambda[i]) + summa;
        }

        var dataScore = new Array();
        for(var i = 0; i<lambda.length; i++){
            dataScore[i] = lambda[i]/summa;
        }

        var objInformation = {
            "standard": standard,
            "covariance": covarianceMatrix,
            "correlation": correlation,
            "pcPercent": dataScore,
            "score": dataPoints 
        }
        console.log(objInformation);
        return objInformation;
        
    };

    function correlationMatrix(cov,dim){

        var corr = new Array();

        for(var i = 0; i<dim; i++){
            corr[i] = new Array();
        }

        for(var i = 0;i<dim; i++){
            for(var j = 0; j<dim; j++){
                corr[i][j] = cov[i][j] / (Math.sqrt(cov[i][i])*Math.sqrt(cov[j][j])); 
            }
        }

        return corr;
    };

    //Standardiaztion of the dataset
    function standardize(value, avg, dim){
        var dim = 0;
        var stand = new Array();
        for(var i = 0;i<value.length;i++){
            stand[i] = new Array();
        }

        for(var val in value[0]){
            if(val != "Country"){
                for(var i = 0; i<value.length;i++){
                    if(value[i][val] == ""){
                        value[i][val] = avg[val];
                        stand[i][dim] = parseFloat(value[i][val]) - avg[val];
                    }
                    else{
                        stand[i][dim] = parseFloat(value[i][val]) - avg[val];
                    }
                        
                }
            }
            dim++;
        }
        return stand;
    };

    //covariance and centered data matrix
    function covAndCDMatrix(value, avg, dim){
        var faktor1 = 0;
        var faktor2 = 0;
        var coValue = 0;
        var sum = 0;
        var dim1 = 0;
        var dim2 = 0;
        var covMatrix = new Array();
        var dimBar = new Array();
        var obj = {
            "bar": "",
            "cov": ""
        };
        for(var i = 0; i<dim; i++){
            covMatrix[i] = new Array();
        }
        for(var i = 0; i<value.length; i++){
            dimBar[i] = new Array();
        }

        for(var val in value[0]){
            if(val != "Country"){
                for(var val2 in value[0]){
                    if(val2 != "Country"){
                        for(var i = 0; i<value.length;i++){

                            if((value[i][val] || value[i][val2]) == ""){
                                value[i][val] = avg[val];
                                value[i][val2] = avg[val2];

                                if(val == val2){
                                dimBar[i][dim2] = parseFloat(value[i][val]) - avg[val2];
                                }

                                faktor1 = parseFloat(value[i][val]) - avg[val];
                                faktor2 = parseFloat(value[i][val2]) - avg[val2];
                                
                                sum += (faktor1*faktor2);
                                faktor1 = 0;
                                faktor2 = 0;

                            }
                            else{
                                if(val == val2){
                                    dimBar[i][dim2] = parseFloat(value[i][val]) - avg[val2];
                                }

                                faktor1 = parseFloat(value[i][val]) - avg[val];
                                faktor2 = parseFloat(value[i][val2]) - avg[val2];
                                
                                sum += (faktor1*faktor2);
                                faktor1 = 0;
                                faktor2 = 0;
                            }
                        }

                        sum = sum / (value.length-1);
                        covMatrix[dim1][dim2] = sum;
                        dim2++;
                        sum = 0;
                        //console.log(val2);
                    }

                }

                dim1++;
                dim2 = 0;
            }
        }
        obj.bar = dimBar;
        obj.cov = covMatrix;
        return obj;
    };

    function avgValue(value){

        var size = value.length;
        var first = 0;
        var avg = new Array();
        for(var j in value[0]){
            if(j != "Country"){
                for(var i = 0; i<size;i++){
                    if(value[i][j] != "")
                        first = parseFloat(value[i][j]) + first;

                }

                avg[j] = first/size;
                first = 0; 
            }
            
            
        }
        return avg;
    };


}
