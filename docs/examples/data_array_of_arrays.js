// Sample data, typically retrieved from an executed SQL query. It can
// be an array of arrays with the first array containing the column names
var data = [
	['category', 'total_sales'],
	['shoes', 5000],
	['pants', 10000],
	['shirts', 8000],
	['socks', 4000]
];

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'data-array-of-arrays',
	data: data
});