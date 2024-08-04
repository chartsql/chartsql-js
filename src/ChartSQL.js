

/**
 * @namespace ChartSQLjs
 */
var ChartSQLjs = {};

/**
 * @enum {string}
 */
ChartSQLjs.AutoChartType = {
	COLUMN: "column",
	PIE: "pie",
	BAR: "bar",
	INDETERMINATE: "indeterminate"
};

ChartSQLjs.chartoptions = {};

ChartSQLjs.ChartSQL = class ChartSQL {

	/**
	 * @typedef {Object} ChartSQLOptions
	 * @property {boolean} [animate] - Whether or not to animate the chart
	 */

	/**
	 * Constructor for the ChartSQL class
	 * @param {ChartSQLOptions} options - Options for the ChartSQL class
	 */
	constructor(options) {
		this._className = 'ChartSQL';
		this.options = options || {};
	}

	/**
	 * @typedef {Object} ChartOptions
	 * @property {ChartSQLjs.Data} data - The data to be used in the chart.
	 * @property {ChartSQLjs.Directives} directives - The directives for the chart.
	 * @property {string} target - The target element or selector where the chart will be rendered.
	 */

	/** Create a new instance of the Chart class. Will render the chart if options.target is defined
	 * @param {ChartOptions} options
	 * @returns {ChartSQLjs.Chart} - The Chart object
	 */
	createChart(options) {

		//options.data must exist
		if (!options.data) {
			throw new Error('data object is required to be passed to createChart');
		}

		var data = ChartSQLjs.Data.fromJson(options.data);

		//If options.directives is already ChartSQL.Directives, then we don't need to do anything
		if(options.directives instanceof ChartSQLjs.Directives){

			var directives = options.directives;

		} else {
			//If options.directives is a string, then we need to parse it
			if(typeof options.directives === 'string'){

				var sqlScript = new ChartSQLjs.SQLScript({
					chartsql: this,
					sql: options.directives
				});
				var directives = sqlScript.directives;
				// console.dump(directives);
			} else {
				// If options.directives is an object, then we need to create a new instance of the Directives class
				var directives = new ChartSQLjs.Directives(options.directives || {});
			}

		}

		var chart = new ChartSQLjs.Chart(
			this,
			data,
			directives
		);

		//If options.target is defined, then we are going to render the chart
		//into the target element
		if(options.target){
			//Get the target element
			var tryDom = document.getElementById(options.target);

			// If the target element does not exist, then we need to create it
			// and append it to the body
			if(!tryDom){
				let wrapper = document.createElement('div');
				wrapper.innerHTML = `<div id="${options.target}" style="width: 800px; height: 600px;"></div>`;
				// @ts-ignore
				document.body.appendChild(wrapper.firstElementChild);

				/** @type {HTMLElement|null} */
				var chartDom = document.getElementById(options.target);
				if(!chartDom){
					throw new Error('Target element not found');
				}
				var finalDom = chartDom;

			} else {
				var finalDom = tryDom;
			}

			chart.render(finalDom);

		}

		return chart;
	}

	/**
	 * Creates a new instance of the SQLScript
	 * @param {string} sql
	 * @returns {ChartSQLjs.SQLScript} - The SQLScript object
	 */
	createSQLScript(sql) {
		var sqlScript = new ChartSQLjs.SQLScript({
			chartsql: this,
			sql: sql
		});
		return sqlScript;
	}

	get echarts(){
		// @ts-ignore
		return window.echarts;
	}

	get foo(){
		return 'bar';
	}

}
