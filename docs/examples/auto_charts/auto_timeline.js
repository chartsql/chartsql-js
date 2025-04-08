// Sample data, typically retrieved from an executed SQL query
var data = [
	{datetime: '2024-09-20T03:10:50.469Z', visitors: 4900},
	{datetime: '2024-09-20T04:10:50.469Z', visitors: 7528},
	{datetime: '2024-09-20T05:10:50.469Z', visitors: 7762},
	{datetime: '2024-09-20T17:10:50.469Z', visitors: 8000}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'auto-timeline',
	data: data
}); 