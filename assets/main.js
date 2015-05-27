var data = [];

var size = {
	height:500,
	width:500,
	padding:20,
	axisWidth:40
}

var height = size.width - size.padding * 2;
var width = size.height - size.padding * 2 - size.axisWidth;
var svg = d3.select('svg');

svg.attr("width", size.width)
   .attr("height", size.height);

var bars = svg.append('g').attr("transform", "translate(" + [ size.padding + size.axisWidth,size.padding ] + ")");

var x = d3.scale.ordinal().rangeBands([0, width], 0.1);
var y = d3.scale.linear().range([height, 0]);
var colors = d3.scale.category10();

var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

var yAxisEl = svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + [ size.axisWidth,size.padding ] + ")")
		.call(yAxis);

var pusher = new Pusher('54da1f9bddbf14929983');
var channel = pusher.subscribe('world_map');

updateData();

channel.bind('login', function(data) {
	addData(data);
	updateData();
});

function addData(d) {

	var item;
	var index = _.findIndex(data, function(e) {return e.name == d.conn;});

	if (index == -1) {
		item = {
			name: d.conn,
			stamps: []
		}
		data.push(item);
		index = data.length - 1;
	}
	else {
		item = data[index];
	}

	soundManager.play('s'+(index+1));

	var now = Date.now();

	item.stamps.push(now);

	data.forEach(function(e){
		e.stamps = _.filter(e.stamps, function(f) {
			return f > Date.now() - 10 * 1000;
		});
		e.value = e.stamps.length;
	});

	data = _.filter(data, function(e) {return e.value > 0});

}

function updateData() {
	var maxValue = d3.max(data,function(d) { return d.value; });

	x.domain(_.range(0,data.length,1));
	y.domain([0, maxValue]);
	svg.select("g.y.axis").call(yAxis.ticks(maxValue));

	var rects = bars.selectAll('rect.value').data(data);    
	rects.enter()
			.append('rect')
				.classed('value',true)
				.attr("height", 0)
			    .attr("x", function(d, i) { return x(i); }) 
				.attr("y", height)
				.attr("width", x.rangeBand())
				.style("fill", function(d,i){ return colors(i); });

	rects.exit().remove();

	rects.transition()
				.attr("y", function(d) { return y(d.value); })
				.attr("height", function(d) { return height-y(d.value); })
				.attr("width", width * 0.8 / data.length)
				.attr("x", function(d, i) { return x(i); });
}