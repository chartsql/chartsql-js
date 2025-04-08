describe('ChartSQL', function() {

	describe('constructor', function() {
		it('should create a new instance of ChartSQL', function() {
			let chartsql = new ChartSQLjs.ChartSQL();
			expect(chartsql).toBeInstanceOf(ChartSQLjs.ChartSQL);
			expect(window.chartsql).toBeInstanceOf(ChartSQLjs.ChartSQL);
		});
	});

	describe('createChart', function() {
		it('should create a new chart', function() {
			let chartsql = new ChartSQLjs.ChartSQL();
			// Sample data, typically retrieved from an executed SQL query
			let data = {
				columns: ['category', 'total_sales'],
				rows: [
					['shoes', 5000],
					['pants', 10000],
					['shirts', 8000],
					['socks', 4000]
				]
			}

			// Renders the data using the directives supplied
			// Returns an instance of the ChartSQL chart object that
			// you can use to interact with the rendered chart instance
			let chart = chartsql.createChart({
				data: data,
				directives: {
				}
			});

			expect(chart).toBeInstanceOf(ChartSQLjs.Chart);
		});

		describe('Given a ChartSQL.Directives object', function() {
			it('should pass that directives object', function() {
				let chartsql = new ChartSQLjs.ChartSQL();
				// Sample data, typically retrieved from an executed SQL query
				let data = {
					columns: ['category', 'total_sales'],
					rows: [
						['shoes', 5000],
						['pants', 10000],
						['shirts', 8000],
						['socks', 4000]
					]
				}

				let directives = new ChartSQLjs.Directives({});

				// Renders the data using the directives supplied
				// Returns an instance of the ChartSQL chart object that
				// you can use to interact with the rendered chart instance
				let chart = chartsql.createChart({
					data: data,
					directives: directives
				});

				expect(chart.directives).toEqual(directives);

			});
		});

		describe('Given a directives string value', function() {
			it('should parse the directives string value', function() {
				let chartsql = new ChartSQLjs.ChartSQL();
				// Sample data, typically retrieved from an executed SQL query
				let data = {
					columns: ['category', 'total_sales'],
					rows: [
						['shoes', 5000],
						['pants', 10000],
						['shirts', 8000],
						['socks', 4000]
					]
				}

				let directives = `
					-- @title: Sales by Category
					SELECT * FROM sales
				`;

				// Renders the data using the directives supplied
				// Returns an instance of the ChartSQL chart object that
				// you can use to interact with the rendered chart instance
				let chart = chartsql.createChart({
					data: data,
					directives: directives
				});

				expect(chart.directives).toBeInstanceOf(ChartSQLjs.Directives);

			});
		});

		describe('option target', function() {
			it('should build the chart into the target', function() {

				let chartsql = new ChartSQLjs.ChartSQL();
				// Sample data, typically retrieved from an executed SQL query
				let data = {
					columns: ['category', 'total_sales'],
					rows: [
						['shoes', 5000],
						['pants', 10000],
						['shirts', 8000],
						['socks', 4000]
					]
				}

				// Renders the data using the directives supplied
				// Returns an instance of the ChartSQL chart object that
				// you can use to interact with the rendered chart instance
				let chart = chartsql.createChart({
					target: 'my-chart2',
					data: data,
					directives: {}
				});


			});
		});
	});

})