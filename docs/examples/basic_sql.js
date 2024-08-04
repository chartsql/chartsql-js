var sql = `
	-- @chart: bar
	SELECT category, total_sales
	FROM sales
`;

// Sample data as if retrieved from an executed SQL query
var data = [
	{category: 'shoes', total_sales: 5000},
	{category: 'pants', total_sales: 10000},
	{category: 'shirts', total_sales: 8000},
	{category: 'socks', total_sales: 4000}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'basic-sql',
	data: data,
	directives: sql
});