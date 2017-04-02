// Create hierarchy from flat table.
_.groupByMulti = function (obj, values, context) {
    if (!values.length)
        return obj[0]['Amount'];
    var byFirst = _.groupBy(obj, values[0], context),
        rest = values.slice(1);
    for (var prop in byFirst) {
        byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
    }
    return byFirst;
};

// The colorcodes dataset. each level uses a 
var colorcodes = ['#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#b15928','#a6cee3'];
colorcode_uniq = []

// Collapse the hierarchy
function collapse_node(nodename, node, level){
	if (!colorcode_uniq[level]){
		colorcodes.push(colorcodes.shift());
		colorcode_uniq[level] = colorcodes.slice(0);
	}
	var result = {'label': nodename }
	if (typeof(node) == 'number'){
		result['amount'] = node;
	}
	else{
		var children = []
		for (child in node){
			collapsed_node = collapse_node(child, node[child], level+1);
			children.push(collapsed_node);
		}
		result['amount'] = _.reduce(children, function(memo, num){ return memo + num['amount']; }, 0);
		result['children'] = children
	}

	var color = colorcode_uniq[level].shift();
	colorcode_uniq[level].push(color);
	result['color'] = color;
	if (level == 0){
		result['color'] = '#666666';
	}

	return result;
}

function create_bubbletree(data,columns,title,target){
	if (!title) title = 'Total';
	if (!target) target = 'body';
	data = _.groupByMulti(data,columns);
	console.log(data);
	colorcodes_preserve = colorcodes;
	data = collapse_node(title,data, 0);
	colorcodes = colorcodes_preserve;
	console.log(data);
	new BubbleTree({
		data: data,
		container: target
	});
}
