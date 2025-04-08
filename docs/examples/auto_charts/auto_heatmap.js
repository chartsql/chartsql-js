// Sample data, typically retrieved from an executed SQL query
var data = [
	{size: "Small", color: "Blue", total_sales: 1},
	{size: "Medium", color: "Yellow", total_sales: 2},
	{size: "Large", color: "Red", total_sales: 3},
	{size: "XL", color: "Green", total_sales: 4}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'auto-heatmap',
	data: data,
	directives: {}
});