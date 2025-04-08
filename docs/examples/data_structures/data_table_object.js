// Sample data, typically retrieved from an executed SQL query. It can
// be an object containing an array of the column names and an array of
// arrays with the data
var data = {
	columns: ['category', 'total_sales'],
	rows: [
		['shoes', 5000],
		['pants', 10000],
		['shirts', 8000],
		['socks', 4000]
	]
};

// Render a chart at the target element with the data provided
var chart = chartsql.createChart({
	target: 'data-table-object',
	data: data
});