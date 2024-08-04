// Sample data, typically retrieved from an executed SQL query
var data = [
	{month: '2022-01-01', total_sales: 5000},
	{month: '2022-02-01', total_sales: 7000},
	{month: '2022-03-01', total_sales: 4900},
	{month: '2022-04-01', total_sales: 7528},
	{month: '2022-05-01', total_sales: 7762},
	{month: '2022-06-01', total_sales: 8000},
	{month: '2022-07-01', total_sales: 9500},
	{month: '2022-08-01', total_sales: 8250},
	{month: '2022-09-01', total_sales: 9000},
	{month: '2022-10-01', total_sales: 8500},
	{month: '2022-11-01', total_sales: 9500},
	{month: '2022-12-01', total_sales: 10000}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'auto-dateline',
	data: data
});