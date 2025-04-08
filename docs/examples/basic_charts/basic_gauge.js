// Sample data, typically retrieved from an executed SQL query
var data = [
	{acceleration: 'Acceleration', value: 60}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'basic-gauge',
	data: data,
	directives: {
		chart: 'gauge'
	}
});