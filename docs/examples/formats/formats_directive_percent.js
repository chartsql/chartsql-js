// Sample data, typically retrieved from an executed SQL query
var data = [
	{category: 'shoes', total_sales: 40},
	{category: 'pants', total_sales: 50},
	{category: 'shirts', total_sales: 5},
	{category: 'socks', total_sales: 5}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'formats-directive-percent',
	data: data,
	directives: {
		chart: 'area',
		formats: 'percent'
	}
});