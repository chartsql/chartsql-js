// Sample data, typically retrieved from an executed SQL query
var data = [
	{category: "foo", total_sales: 17096869},
	{category: "bar", total_sales: 27662440},
	{category: "buzz", total_sales: 11546057},
	{category: "baz", total_sales: 10582082}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'basic-pie',
	data: data,
	directives: {
		chart: 'pie'
	}
});