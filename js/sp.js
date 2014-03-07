function drawFunction(){

        //document.getElementById("#sp").innerHTML = "";
         document.getElementById("sp").innerHTML= "";
       if(d3.select("#sp").select("g")[0][0] == null){
            var sp1 = new sp();
        }
        //d3.select("#sp").remove();
        //else{
        //var sp1 = new sp();
            //document.getElementById("#sp").innerHTML = "";
          //  var sp1 = new sp();
        //}
       // d3.select("#sp").select("g").remove();
        //console.log(document.getElementById("sp"));
        var yLabel =  $("#drop1 option:selected").text();
        var xLabel =  $("#drop2 option:selected").text();
        var radius =  $("#drop3 option:selected").text();
        var colour =  $("#drop4 option:selected").text();



        if(yLabel.trim()=="Select data for Y"){
            yLabel = "GDP";
        }
        if(xLabel.trim()=="Select data for X"){
            xLabel = "GDP - real growth rate(%)";
        }
        if(radius.trim()=="Select data for radius"){
            radius = "GDP";
        }
        if(colour.trim()=="Select data for color"){
            colour = "GDP - real growth rate(%)";
        }
        console.log(yLabel + xLabel);
        console.log("-------------");
        //draw(yLabel, xLabel);
        var shit = d3.select("#sp").select("g")[0][0];
        console.log(shit);
        sp1.draw(xLabel, yLabel, radius, colour);
}

function clearFunction(){

        //documen8t.getElementById("sp").innerHTML= "";
        d3.select("#sp").select("g").remove();
}


function sp(){

    var self = this; // for internal d3 functions

    var spDiv = $("#sp");

    var margin = {top: 20, right: 20, bottom: 30, left: 100},
        width = spDiv.width() - margin.right - margin.left,
        height = spDiv.height() - margin.top - margin.bottom;

    //initialize color scale
    //...
    
    //initialize tooltip
    //...


    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

 
    

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

    var svg = d3.select("#sp").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Load data
    d3.csv("data/factbook.csv", function(error, data) {
        self.data = data;

        var d1 = $("#drop1");
        var d2 = $("#drop2");
        var d3 = $("#drop3");
        var d4 = $("#drop4");
        var c = 0;
        for(var current in data[0]){
            if(c!=0){
                d1.append(new Option(current));
                d2.append(new Option(current));
                d3.append(new Option(current));
                d4.append(new Option(current));
            }
            c++;
        }

       /*var xLabel = "Select data for Y";
        var yLabel = "Select data for X";

        $("#but").on("click", function(d){
            
            xLabel =  $("#drop1 option:selected").text();
            yLabel =  $("#drop2 option:selected").text();
             //console.log(xLabel);
             //console.log(yLabel);
        });
        
        //define the domain of the scatter plot axes
        //...
        if(yLabel.trim()=="Select data for Y"){
            yLabel = "Area(sq km)"
        }
        if(xLabel.trim()=="Select data for X"){
            xLabel = "Birth rate(births/1000 population)"
        }*/


       


       // draw(xLabel, yLabel);

    });

    this.draw = function(xLabel, yLabel)
    {
        //var self = this;
        //self.data = getData();
        //var yLabel =  $("#drop1 option:selected").text();
        //var xLabel =  $("#drop2 option:selected").text();

        /*if(yLabel.trim()=="Select data for Y"){
            yLabel = "Area(sq km)";
        }
        if(xLabel.trim()=="Select data for X"){
            xLabel = "Birth rate(births/1000 population)";
        }*/
       // console.log(xLabel + "yay" +  yLabel);
        
        var maxy = 0;//d3.max(self.data, function(d){return d[t1]; });
        var miny = 999999999999;//d3.min(self.data, function(d){return d[t1]; });
        var maxx = 0;//d3.max(self.data, function(d){return d[t1]; });
        var minx = 999999999999;//d3.min(self.data, function(d){return d[t1]; });
        var meanx = 0;//d3.mean(self.data, function(d){return d[t1]; });
        var meany = 0;
        
        var count = 0;
        console.log(yLabel + " <- y, x -> " + xLabel);
        for(var i=0; i<data.length; i++){
            if(data[i][yLabel]!= ""){
                //count++;
                if(data[i][yLabel] < miny)
                    miny = data[i][yLabel];

                if(data[i][yLabel]>maxy)
                    maxy = data[i][yLabel];
                //console.log(maxy);
            }
        }
        //meanx = mean/count;

        for(var i=0; i<data.length; i++){
            if(data[i][xLabel]!= ""){
                count++;
                if(data[i][xLabel] < minx)
                    minx = data[i][xLabel];

                if(data[i][xLabel]>maxx)
                    maxx = data[i][xLabel];
               //console.log(max2 + "helu");
            }
        }

        //console.log(maxx + " <- maxx, maxy -> " + maxy);
        console.log(minx + " <- minx, miny -> " + miny);

        x.domain([minx, maxx*1.2]/*d3.max(data, function(d){
            //console.log(d[xLabel]);
            return d[xLabel];
        })]*/
        );
        
        y.domain([miny, maxy*1.2]);/*d3.max(data, function(d){
            //console.log(d[yLabel]);
            //console.log(yLabel);
            return d[yLabel];
        })]);*/

        //min
        console.log()

        //meanx = mean/count;

        // Add x axis and title.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width-40)
            .attr("y", margin.bottom)
            .style("font-size", 12)
            .text(xLabel);
            
        // Add y axis and title.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left)
            .attr("x", -width*0.5)
            .attr("dy", ".71em")
            .style("font-size", 12)
            .text(yLabel);
            

        var tooltip = d3.select("#sp")
            .append("div")
            .style("position", "absolute")
            .style("visability", "hidden")
            .style("z-index", "3")
            .style("background-color", "orange");

                
        // Add the scatter dots.
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")

            .attr("cx", function(d){
                //console.log(d[xLabel] + " <- data, land -> " + d["Country"]);
            if(d[xLabel]!="")
                return 100 + (width-100)*(d[xLabel]/(maxx*1.2));// d[xLabel]/maxx;})
            else
            {
                //console.log("kaos")
                return 10000;
            }})

            .attr("cy", function(d){
            if(d[yLabel]!="")
            return height - (height)*(d[yLabel]/(maxy*1.2));
            else
            {
                //console.log("kaos2")
                return 10000;
            }})

            .attr("r", 4)
            .style("fill", function(d){
                //console.log(xLabel);
                return getColor(d["Country"].length);
            })



            //Define the x and y coordinate data values for the dots
            //...


            //tooltip
            .on("mouseover", function(d){
                tooltip.transition()        
                .duration(200)
                .style("visibility", "visible")          
                .style("opacity", .9);  

                tooltip.html(d["Country"] + "<br/>" + d[xLabel] +  ", " + d[yLabel])  
                //.style("left", (d3.event.pageX) + "px")     
                //.style("top", (d3.event.pageY - 28) + "px");    
               // return tooltip.style("visibility", "visible")
                 //             .text(d["Country"]);
            })
            .on("mousemove", function(){
                tooltip.style("top", (d3.event.pageY-100)+"px")
                        .style("left",(d3.event.pageX-width-120)+"px");
            })
            .on("mouseout", function(){tooltip.style("visibility", "hidden");
            })

            .on("click",  function(d) {
                //...    
                alert(d["Country"] + ":\n" + xLabel + ": " + d[xLabel] +  ", \n" + yLabel + ": " + d[yLabel]);

            });
    }

    //method for selecting the dot from other components
    this.selectDot = function(value){
        //...
    };

    this.getData = function(){
        return self.data;
    }
    
    //method for selecting features of other components
    function selFeature(value){
        //...
    }

}




