// Sample data, typically retrieved from an executed SQL query
var data = [
	{cost: 20, total_sales: 5000},
	{cost: 80, total_sales: 10000},
	{cost: 100, total_sales: 8000},
	{cost: 120, total_sales: 4000}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'basic-scatter',
	data: data,
	directives: {
		chart: 'scatter'
	}
});