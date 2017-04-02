function draw_bipart(data,target='body', w=800, h=600){
	var keylist = _.uniq(_.map(data,function(row){return row[0];}));
	var colorcodes = ['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2']
	color ={}
	_.each(keylist,function(row){
		t = colorcodes.shift();
		colorcodes.push(t);
		color[row] = t;
		});
	var svg = d3.select(target).append("svg").attr("width", w+450).attr("height", h+50);
	var g = svg.append("g").attr("transform","translate(200,50)");

	var bp=viz.bP()
			.data(data)
			.min(12)
			.pad(1)
			.height(h)
			.width(w)
			.barSize(35)
			.fill(d=>color[d.primary]);
				
	g.call(bp);

	g.selectAll(".mainBars")
		.on("mouseover",mouseover)
		.on("mouseout",mouseout)

	g.selectAll(".mainBars").append("text").attr("class","label")
		.attr("x",d=>(d.part=="primary"? -30: 30))
		.attr("y",d=>+6)
		.text(d=>d.key)
		.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
		
	g.selectAll(".mainBars").append("text").attr("class","perc")
		.attr("x",d=>(d.part=="primary"? -150: 150))
		.attr("y",d=>+6)
		.text(function(d){ return d3.format("0.0%")(d.percent)})
		.attr("text-anchor",d=>(d.part=="primary"? "end": "start"));

	function mouseover(d){
		bp.mouseover(d);
		g.selectAll(".mainBars")
		.select(".perc")
		.text(function(d){ return d3.format("0.0%")(d.percent)})
	}
	function mouseout(d){
		bp.mouseout(d);
		g.selectAll(".mainBars")
			.select(".perc")
		.text(function(d){ return d3.format("0.0%")(d.percent)})
	}
	d3.select(self.frameElement).style("height", "800px");
}
