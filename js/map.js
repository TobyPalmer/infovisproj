
function map(){

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 8])
        .on("zoom", move);

    var mapDiv = $("#map");

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = mapDiv.width() - margin.right - margin.left,
        height = mapDiv.height() - margin.top - margin.bottom;


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

         d3.csv("data/OECD-better-life-index-hi.csv", function(data) {

        self.data = data;



        var dd1 = $("#dropdown1");
        var dd2 = $("#dropdown2");
        var dd3 = $("#dropdown3");
        var dd4 = $("#dropdown4");

        var c = 0;

        for(var current in data[0]){
            if(c!=0){
                dd1.append(new Option(current));
                dd2.append(new Option(current));
                dd3.append(new Option(current));
                dd4.append(new Option(current));
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
        draw(countries);
        
    });



 
    function draw(countries,data)
    {
        var country = g.selectAll(".country").data(countries);
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
                return d.properties.name; })
            //country color
            .style("fill", function(d){
                //console.log(d.properties);
                //console.log(d.properties.name);

                return getColor(d.properties.name.length);
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
                alert(d.properties.name);

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

