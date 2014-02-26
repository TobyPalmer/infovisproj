function sp(){

    var self = this; // for internal d3 functions

    var spDiv = $("#sp");

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = spDiv.width() - margin.right - margin.left,
        height = spDiv.height() - margin.top - margin.bottom;

    //initialize color scale
    //...
    
    //initialize tooltip
    //...
    var xLabel = "Student skills";
    var yLabel = "Voter turnout";

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#sp").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Load data
    d3.csv("data/OECD-better-life-index-hi.csv", function(error, data) {
        self.data = data;
        
        //define the domain of the scatter plot axes
        //...

        x.domain([0, d3.max(data, function(d){
            return d[xLabel];
        })]);
        
        y.domain([0, d3.max(data, function(d){
            return d[yLabel];
        })]);


        draw();

    });

    function draw()
    {
        
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
            .data(self.data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", function(d){return d[xLabel]/100*width;})
            .attr("cy", function(d){return height - d[yLabel]/100*height;})
            .attr("r", 4)
            .style("fill", function(d){
                //console.log(d);
                return getColor(d["Country"].length);
            })



            //Define the x and y coordinate data values for the dots
            //...


            //tooltip
            .on("mouseover", function(d){
                return tooltip.style("visibility", "visible")
                              .text(d["Country"]);
            })
            .on("mousemove", function(){return tooltip.style("top",
                (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");})

            .on("click",  function(d) {
                //...    

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




