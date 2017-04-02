function obiee_statemap(data,target,showdatalabels){
	var series = data;
	// Creating D3 colorscale
	var onlyValues = series.map(function(obj){ return obj[1]; });
	var minValue = Math.min.apply(null, onlyValues),
	maxValue = Math.max.apply(null, onlyValues);

	var paletteScale = d3.scale.linear()
	            .domain([minValue,maxValue])
	            .range(["#ededed","#61C250"]);

	var dataset = {}
	// fill dataset in appropriate format
	series.forEach(function(item){ //
	    var iso = item[0];
	    var value = item[1];
	    dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
	});


	labelset = {}
	// fill labelset in appropriate format
	series.forEach(function(item){ //
	    var iso = item[0];
	    var value = item[1];
	    if (showdatalabels == 'fact'){
	    	labelset[iso] =  value;
		}
	    else if (showdatalabels == 'state'){
	    	labelset[iso] =  iso;
		}
	});

	var map = new Datamap({
		element: document.getElementById(target),
		scope: 'usa',
		responsive:false,
		height:null,
		weidth:null,
		fills: {
	      YES: '#61C250',
	      UNKNOWN: 'rgb(0,0,0)',       // These are
	      defaultFill: '#ededed'       // the colours
	  },
	       data: dataset
	});

	if(showdatalabels!=='none'){
		map.labels({'customLabelText':labelset});
	}
	
}

