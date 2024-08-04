// Sample data, typically retrieved from an executed SQL query. You can create
// and instance of the ChartSQLjs.Data class and manually pass the data to it
var data = new ChartSQLjs.Data({
	columns: ['category', 'total_sales'],
	rows: [
		['shoes', 5000],
		['pants', 10000],
		['shirts', 8000],
		['socks', 4000]
	]
});

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'data-data-class',
	data: data
});