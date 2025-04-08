// Sample data, typically retrieved from an executed SQL query
var data = [
	{region: 'North', product: 'Shoes', units_ordered: 120, region_average: 30},
	{region: 'North', product: 'T-Shirt', units_ordered: 90, region_average: 30},
	{region: 'North', product: 'Jeans', units_ordered: 135, region_average: 30},
	{region: 'East', product: 'Shoes', units_ordered: 74, region_average: 70},
	{region: 'East', product: 'T-Shirt', units_ordered: 90, region_average: 70},
	{region: 'East', product: 'Jeans', units_ordered: 109, region_average: 70}
];

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'basic-combo',
	data: data,
	directives: {
		'chart': 'combo',
		'groups': 'region, product',
		'series': 'units_ordered, avg(region_average)',
		'series-types': 'column, line'
	}
});