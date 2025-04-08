// Sample data, typically retrieved from an executed SQL query
var data = [
	{cost: 28604, margin: 77, total_sales: 17096869},
	{cost: 31163, margin: 77.4, total_sales: 27662440},
	{cost: 1516, margin: 68, total_sales: 1154605773},
	{cost: 13670, margin: 74.7, total_sales: 10582082},
	{cost: 28599, margin: 75, total_sales: 4986705},
	{cost: 29476, margin: 77.1, total_sales: 56943299},
	{cost: 31476, margin: 75.4, total_sales: 78958237},
	{cost: 28666, margin: 78.1, total_sales: 254830},
	{cost: 1777, margin: 57.7, total_sales: 870601776},
	{cost: 29550, margin: 79.1, total_sales: 122249285},
	{cost: 2076, margin: 67.9, total_sales: 20194354},
	{cost: 12087, margin: 72, total_sales: 42972254},
	{cost: 24021, margin: 75.4, total_sales: 3397534},
	{cost: 43296, margin: 76.8, total_sales: 4240375},
	{cost: 10088, margin: 70.8, total_sales: 38195258},
	{cost: 19349, margin: 69.6, total_sales: 147568552},
	{cost: 10670, margin: 67.3, total_sales: 53994605},
	{cost: 26424, margin: 75.7, total_sales: 57110117},
	{cost: 37062, margin: 75.4, total_sales: 252847810}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'basic-bubble',
	data: data,
	directives: {
		chart: 'bubble'
	}
});