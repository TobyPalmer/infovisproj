function pc(){

    var self = this; // for internal d3 functions

    var pcDiv = $("#pc");



    var margin = [30, 10, 10, 10],
        width = pcDiv.width() - margin[1] - margin[3],
        height = pcDiv.height() - margin[0] - margin[2];

    
    //initialize color scale
    //...
    
    //initialize tooltip
    //...
    
    var x = d3.scale.ordinal().rangePoints([0, width], 1),
        y = {};
        

    var line = d3.svg.line(),
        axis = d3.svg.axis().orient("left"),
        background,
        foreground;



    var svg = d3.select("#pc").append("svg:svg")
        .attr("width", width + margin[1] + margin[3])
        .attr("height", height + margin[0] + margin[2])
        .append("svg:g")
        .attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");

    //Load data
   //d3.csv("data/OECD-better-life-index-hi.csv", function(data) {

        
        d3.csv("data/factbook.csv", function(data) {

        self.data = data;
        
        $("#btn").on("click", function(d){
            d3.select("#scale").style("visibility", "visible");


        var t1 =  $("#dropdown1 option:selected").text();
        var t2 =  $("#dropdown2 option:selected").text();
        var t3 =  $("#dropdown3 option:selected").text();
        var t4 =  $("#dropdown4 option:selected").text();
        var t5 =  $("#dropdown5 option:selected").text();
        var t6 =  $("#dropdown6 option:selected").text();
        var t7 =  $("#dropdown7 option:selected").text();
        var t8 =  $("#dropdown8 option:selected").text();
        
        var notTheese = [];
        var theese = [];

        for(var current in data[0]){
            if(t1 == current || t2 == current || t3 == current || t4 == current || t5 == current || t6 == current ||t7 == current || t8 == current){
                theese.push(current);
            }
            else{
                notTheese.push(current);
            }
        }  

        console.log(theese);

        // Extract the list of dimensions and create a scale for each.
        //...
        x.domain(dimensions = d3.keys(data[0]).filter(function(d) {
                return (d==theese[0] || d==theese[1] || d==theese[2] || d==theese[3] || d==theese[4] || d==theese[5] || d==theese[6] || d==theese[7]) && (y[d] = d3.scale.linear()
                //return   d!="Country" && d!=notTheese[0] && d!=notTheese[1] && d!=notTheese[2] && d!=notTheese[3] && d!=notTheese[4] && d!=notTheese[5] && d!=notTheese[6] && (y[d] = d3.scale.linear()
                    .domain(d3.extent(data, function(p){
                        return +p[d];
                    }))
                    .range([height, 0]));
            }));
        /*d3.select("#btn")
        .on("click", function(d){
            this.x.domain(dimensions = d3.keys(data[0]).filter(function(d) {
                //return d!= "Country" &&  (y[d] = d3.scale.linear()
                 //var pc2 = new pc();
                 var one =   $("#dropdown1 option:selected").text();
                 var two =   $("#dropdown2 option:selected").text();
                 var thee = $("#dropdown3 option:selected").text();
                 var four =  $("#dropdown4 option:selected").text();
                 console.log("oahsodiahsf");

                return d!="Country" && d!=one && d!=two && d!=three && d!=four && (y[d] = d3.scale.linear()
                    .domain(d3.extent(data, function(p){
                        return +p[d];
                    }))
                    .range([height, 0]));
            }));
        });*/

        
            draw();

        });
    });

    function draw(){
        // Add grey background lines for context.


        var t1 =  $("#dropdown1 option:selected").text();
        
        var max = 0;//d3.max(self.data, function(d){return d[t1]; });
        var min = 10000;//d3.min(self.data, function(d){return d[t1]; });
        var mean = 0;//d3.mean(self.data, function(d){return d[t1]; });

        var count = 0;


        for(var i=0; i<self.data.length; i++){
            if(self.data[i][t1]!= ""){
                count++;
                mean = mean + parseFloat(self.data[i][t1]);
                if(self.data[i][t1] < min)
                    min = parseFloat(self.data[i][t1]);

                if(self.data[i][t1]>max)
                    max = parseFloat(self.data[i][t1]);
            }
        }
        mean = parseFloat(mean/count);

        background = svg.append("svg:g")
            .attr("class", "background")
            .selectAll("path")
            //add the data and append the path 
            //...
            .data(self.data)
            .enter().append("svg:path")
            .attr("d", path)

            .on("mousemove", function(d){})
            .on("mouseout", function(){});

           var tooltip = d3.select("#pc")
            .append("div")
            .style("position", "absolute")
            .style("visability", "hidden")
            .style("z-index", "3")
            .style("background-color", "orange");

        // Add blue foreground lines for focus.
        foreground = svg.append("svg:g")
            .attr("class", "foreground")
            .selectAll("path")
            //add the data and append the path 
            //...
            .data(self.data)
            .enter().append("svg:path")
            .attr("d", path)

            .style("stroke", function(d,i){
                //return getColor(d["Country"].length);
                if(d[i]=="")
                    return "gray";
                
                return getColor(d[t1],min,max,mean);
            })

            .on("mouseover", function(d){
                return tooltip.style("visibility", "visible")
                              .text(d["Country"]);
            })
            .on("mousemove", function(){return tooltip.style("top",
                (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");})

            .on("click",  function(d) {
                pc1.selectLine(d);  

            });

            /*.on("click", function(d){
                pc1.selectLine(d);
            })
            .on("mousemove", function(){
            })
            .on("mouseout", function(){});*/

        // Add a group element for each dimension.
        var g = svg.selectAll(".dimension")
            .data(dimensions)
            .enter().append("svg:g")
            .attr("class", "dimension")
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; });
            
        // Add an axis and title.
        g.append("svg:g")
            .attr("class", "axis")
            //add scale
            .each(function(d){
                d3.select(this)
                .call(axis.scale(y[d]));
            })
            .append("svg:text")
            .attr("text-anchor", "middle")
            .attr("y", -9)
            .text(String);

        // Add and store a brush for each axis.
        g.append("svg:g")
            .attr("class", "brush")
            .each(function(d) { 
                d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);

            
            

    }

    // Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
        var t1 =  $("#dropdown1 option:selected").text();
        
        var max = 0;//d3.max(self.data, function(d){return d[t1]; });
        var min = 10000;//d3.min(self.data, function(d){return d[t1]; });
        var mean = 0;//d3.mean(self.data, function(d){return d[t1]; });

        var count = 0;


        for(var i=0; i<self.data.length; i++){
            if(self.data[i][t1]!= ""){
                count++;
                mean = mean + parseFloat(self.data[i][t1]);
                if(self.data[i][t1] < min)
                    min = parseFloat(self.data[i][t1]);

                if(self.data[i][t1]>max)
                    max = parseFloat(self.data[i][t1]);
            }
        }
        mean = parseFloat(mean/count);

        var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
            extents = actives.map(function(p) { return y[p].brush.extent(); });
        var countries = {};

        //countries[pc1.selectLine["Country"]=null];
        
        foreground.style("display", function(d) {
            return countries[d.Country] = actives.every(function(p, i) {
                return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? null : "none";
        });

        d3.selectAll(".dot").style("opacity", function(d){
            return actives.every(function(p, i) {
                return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? 1 : 0.1;
        });

        d3.selectAll(".country").style("fill", function(d){
                return actives.every(function(p, i) {
                    if(countries[d.properties.name]===null){
                        return true;
                    }

                }) ? getBrushColor(self.data,t1 ,d, min,max,mean) : "gray";
        });

        d3.selectAll(".country").style("opacity", function(d){
            return actives.every(function(p, i) {
                if(countries[d.properties.name]===null){
                    return true;
                }

            }) ? 1 : 0.1;
        });




     
       // console.log(countries[d["Country"]]);


        


    }

    

    //method for selecting the pololyne from other components   
    this.selectLine = function(value){
        //...
        //console.log(value["Country"]);
        console.log(value);
        d3.selectAll(".dot").style("opacity", function(d){
            if(value["Country"]==d["Country"]){
                return 1;
            }
            else
                return 0.1;

        })

        d3.selectAll(".country").style("opacity", function(d){
            if(value["Country"]==d.properties.name){
                return 1;
            }
            else
                return 0.2;
        })

        foreground.style("display", function(d) {
            if(value["Country"]==d["Country"])
                return "block";
        });

        foreground.style("opacity", function(d){
            if(value["Country"]==d["Country"])
                return 1;
            else
                return 0.1;
        });
        
    };
    
    //method for selecting features of other components
    function selFeature(value){
        //...
    };

}
