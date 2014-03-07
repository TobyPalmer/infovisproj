
function map(){

    var zoom = d3.behavior.zoom()
        .scaleExtent([0.5, 24])
        .on("zoom", move);

    var mapDiv = $("#map");

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        // width = mapDiv.width() - margin.right - margin.left,
        // height = mapDiv.height() - margin.top - margin.bottom;
        width = mapDiv.width(),
        height = mapDiv.height();


    //initialize color scale
    //...
    
    //initialize tooltip
    //...

        var projection = d3.geo.mercator()
            .center([50, 60 ])
            .scale(250);

        var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(zoom);

        var path = d3.geo.path()
            .projection(projection);

        g = svg.append("g");

         //d3.csv("data/OECD-better-life-index-hi.csv", function(data) {
        d3.csv("data/factbook.csv", function(data) {
        self.data = data;

        //console.log(data);

        var dd1 = $("#dropdown1");
        var dd2 = $("#dropdown2");
        var dd3 = $("#dropdown3");
        var dd4 = $("#dropdown4");
        var dd5 = $("#dropdown5");
        var dd6 = $("#dropdown6");
        var dd7 = $("#dropdown7");
        var dd8 = $("#dropdown8");

        var c = 0;

        for(var current in data[0]){
            if(c!=0){
                dd1.append(new Option(current));
                dd2.append(new Option(current));
                dd3.append(new Option(current));
                dd4.append(new Option(current));
                dd5.append(new Option(current));
                dd6.append(new Option(current));
                dd7.append(new Option(current));
                dd8.append(new Option(current));
            }
            c++;
        }
    });

    // load data and draw the map
    //d3.json("data/world-topo.json", function(error, world) {
        d3.json("data/world-topo.json", function(error, world) {
        var countries = topojson.feature(world, world.objects.countries).features;

     
        //load summary data
        //...
        //console.log(sp1.getData());
        $("#btn").on("click", function(d){
            console.log("yolo");
            draw(countries);
        });
        
        
    });



 
    function draw(countries,data)
    {
        var t1 =  $("#dropdown1 option:selected").text();
        
        var max = 0;//d3.max(self.data, function(d){return d[t1]; });
        var min = 10000;//d3.min(self.data, function(d){return d[t1]; });
        var mean = 0;//d3.mean(self.data, function(d){return d[t1]; });

        var count = 0;

        for(var i=0; i<self.data.length; i++){
            if(self.data[i][t1]!= ""){
                count++;
                mean = mean + parseFloat(self.data[i][t1]/1000000000);
                if(self.data[i][t1] < min)
                    min = parseFloat(self.data[i][t1]);

                if(self.data[i][t1]>max)
                    max = parseFloat(self.data[i][t1]);
            }
        }
        mean = parseFloat(mean/count)*1000000000;

        console.log(min);
        console.log(max);
        console.log(mean);
        var country = g.selectAll(".country").data(countries);
        //var country = g.selectAll(".country").data(self.data);
        //console.log(countries);

        //initialize a color country object	
        var cc = {};
        cc["Country"] = "Russian Federation";
        cc["Color"] = "#770044";
        //console.log(getColor(4));
        //var color = d3.scale.ordinal()
        //    .domain(["Household income"])
        //    .range(colorbrewer.RdBu[4]);

        //console.log(d3.entries(colorbrewer)[0].value[4]);
        //country.forEach(function(d){
        //    cc[d.country] = "a";
        //})
        //console.log(colorbrewer.YlGn[3][0]);
		//console.log(cc);
        //...

        country.enter().insert("path")
            //.data(d3.entries.colorbrewer)
            .attr("class", "country")
            .attr("d", path)
            .attr("id", function(d) { return d.id; })
            .attr("title", function(d) { 
                //return d.properties.name; })
                return "jasdkn"; })
            //country color
            .style("fill", function(d,i){
                //console.log(d.properties);
                //console.log(d.properties.name);
                //console.log(self.data[1]["Population"]);
                for(var j = 0; j<self.data.length; j++){
                 
                    if(self.data[j]["Country"]==d.properties.name){

                        return getColor(self.data[j][t1],min,max,mean);
                    }
                }

                return "green";
                
                
                //return getColor(d[t1], min, max);
                
            })
            //...
            //tooltip
            .on("mousemove", function(d) {
                //...
            })
            .on("mouseout",  function(d) {
                //...
            })
            //selection
            .on("click",  function(d) {
                for(var j = 0; j<self.data.length; j++){
                 
                    if(self.data[j]["Country"]==d.properties.name){

                        alert(d.properties.name + ", " + t1 + ": " + self.data[j][t1]);
                    }
                }

                //...
            });

    }
    
    //zoom and panning method
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;
        

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }

    
    
    //method for selecting features of other components
    function selFeature(value){
        //...
    }
}

