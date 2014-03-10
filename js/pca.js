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
        .ticks(1);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(1);

    var svg = d3.select("#sp2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Load data
    d3.csv("data/factbook.csv", function(data) {
        self.data = covariance(data);

        //console.log(data);
        draw(data);

    });

    
    function draw(data)
    {   
        var score = self.data.score.elements;
        var maxy = 0;//d3.max(self.data, function(d){return d[t1]; });
        var miny = 10000;//d3.min(self.data, function(d){return d[t1]; });
        var maxx = 0;//d3.max(self.data, function(d){return d[t1]; });
        var minx = 10000;//d3.min(self.data, function(d){return d[t1]; });
        var meanx = 0;//d3.mean(self.data, function(d){return d[t1]; });
        var meany = 0;
        var PC = self.data.pcPercent;

        //dont make xLabel or yLabel equals to 0. (0 = the country)
        var xLabel = 23;
        var yLabel = 30;
        
        var count = 0;

        for(var i=0; i<score.length; i++){
            if(score[i][yLabel]!= ""){
                if(score[i][yLabel] < miny)
                    miny = score[i][yLabel];

                if(score[i][yLabel]>maxy)
                    maxy = score[i][yLabel];
            }
        }

        for(var i=0; i<score.length; i++){
            if(score[i][xLabel]!= ""){
                count++;
                if(score[i][xLabel] < minx)
                    minx = score[i][xLabel];

                if(score[i][xLabel]>maxx)
                    maxx = score[i][xLabel];
            }
        }

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
            .text("PC1 - " + (PC[xLabel-1]*100).toFixed(2) + " % of variation");
            
        // Add y axis and title.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left+60)
            .attr("x", -width*0.5+60)
            .attr("dy", "2.2em")
            .style("font-size", 12)
            .text("PC2 - " + (PC[yLabel-1]*100).toFixed(2) + " % of variation");
            

        var tooltip = d3.select("#sp2")
            .append("div")
            .style("position", "absolute")
            .style("visability", "hidden")
            .style("z-index", "100")
            .style("background", "white");
                
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

            //tooltip
            .on("mouseover", function(d){

                tooltip.transition()        
                .duration(200)
                .style("visibility", "visible")          
                .style("opacity", .85)
              tooltip.html("<b>" + d[0] + "</b>" + "</br> x: " + d[xLabel].toFixed(2) + "</br> y: " + d[yLabel].toFixed(2));
            })
            .on("mousemove", function(){
                tooltip.style("top", (d3.event.pageY-120)+"px")
                        .style("left",(d3.event.pageX-width+150)+"px");
            })
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");})

            .on("click",  function(d) {
                //...    
                alert(d[0] + ":\n" + xLabel + ": " + d[xLabel] +  ", \n" + yLabel + ": " + d[yLabel]);

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

        dimensions = dimensions-1; //comment this if its not factbook.csv

        var avg = avgValue(value);
        //console.log(avg);

        //Standardized data
        var standard = standardize(value, avg, dimensions);
        
        //covariance matrix and centered matrix
        //var cacdm = covAndCDMatrix(value, standard,avg,dimensions);
        var cacdm = covAndCDMatrix(value, avg, dimensions);
        
        centered = cacdm.bar;
        covarianceMatrix = cacdm.cov;

        //eigenvectors and eigenvalues from covariance matrix
        var eig = numeric.eig(covarianceMatrix);

        centeredMatrix = Matrix.create(centered);
        evMatrix = Matrix.create(eig.E.x);
        
        //Scores, where every column is one principal component (PC1, PC2 etc..)
        dataPoints = centeredMatrix.multiply(evMatrix);
        var country = new Array();
        for(var i = 0; i<value.length;i++){
            //country[i] = value[i]["Country"];
            dataPoints.elements[i].unshift(value[i]["Country"]);

        }
        console.log(dataPoints);
        //CorrelationMatrix
        var correlation = correlationMatrix(covarianceMatrix, dimensions);

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
            "score": dataPoints,
            "eigvector": evMatrix 
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
