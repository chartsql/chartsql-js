/**
 * ChartSQL Chart class
 * @param {Object} global - The global object
 * @return {Object} ChartSQL.Chart - The Chart class *
 * @memberof ChartSQL
 */
ChartSQLjs.Chart = class Chart {

	/** @type {ChartSQLjs.ChartSQL} */
	#chartsql

	/**
	 * Constructor for the Chart class
	 * @param {ChartSQLjs.ChartSQL} chartsql - The ChartSQL object
	 * @param {ChartSQLjs.Data} data - The Data object
	 * @param {ChartSQLjs.Directives} directives - The Directives object
	 * @throws {Error} - If chartsql is not defined
	 * @throws {Error} - If chartsql is not an instance of ChartSQL.ChartSQL
	 * @throws {Error} - If data is not defined
	 * @throws {Error} - If data is not an instance of ChartSQL.Data
	 * @throws {Error} - If directives is not defined
	 * @throws {Error} - If directives is not an instance of ChartSQL.Directives
	 */
	constructor(
		chartsql,
		data,
		directives
	) {

		const Validate = ChartSQLjs.Validate;

		this.#chartsql = Validate.instanceOf('chartsql', chartsql, ChartSQLjs.ChartSQL);
		this.data = Validate.instanceOf('data', data, ChartSQLjs.Data);
		this.directives = Validate.instanceOf('directives', directives, ChartSQLjs.Directives);

	}

	/**
	 * Returns the option struct for the chart
	 */
	getOption(){

		/**
		 * @type {Record<string, any>}
		 */
		var option = {};

		if(this.directives.isAutoMode){

			var autoChartType = this.data.detectAutoChartType();

			switch(autoChartType){

				case 'column':
					var fieldsByType = this.data.getFieldsByType();
					var primaryCategoryField = fieldsByType.string[0];
					// throw JSON.stringify();
					var seriesFields = fieldsByType.numeric;

					var option = new ChartSQLjs.chartoptions.ColumnOption(
						this.directives,
						primaryCategoryField,
						seriesFields
					).option;

					break;
				case 'line':

				case 'grouped-column':

					var fieldsByType = this.data.getFieldsByType();
					var primaryCategoryField = fieldsByType.string[0];
					var seriesFields = fieldsByType.numeric;

					var option = new ChartSQLjs.chartoptions.ColumnOption(
						this.directives,
						primaryCategoryField,
						seriesFields
					).option;

					// throw new Error('Grouped column not yet implemented');
					break;

				case 'dateline':

				var fieldsByType = this.data.getFieldsByType();
					var primaryCategoryField = fieldsByType.date[0];
					var seriesFields = fieldsByType.numeric;

					var option = new ChartSQLjs.chartoptions.LineOption(
						this.directives,
						primaryCategoryField,
						seriesFields
					).option;

				break;

				case 'pie':
					option.type = 'pie';
					break;
			}

		} else {

			var chartType = this.directives.get('chart');

			if(this.directives.keyExists("category")){
				throw new Error('Series directive not yet fully implemented');
			} else {
				var primaryCategoryField = this.data.firstFieldOfTypes(["string", "date", "datetime", "numeric"]);
			}

			//get the series fields
			if(this.directives.keyExists("series")){
				//Not yet fully implemented
				throw new Error('Series directive not yet fully implemented');
				// var seriesFields = this.data.allFieldsOfType("numeric");
			} else {
				var seriesFields = this.data.allFieldsOfType("numeric");
			}


			switch(chartType){
				case 'bar':

					var option = new ChartSQLjs.chartoptions.BarOption(
						this.directives,
						primaryCategoryField,
						seriesFields
					).option;

					break;

				case 'line':
					option.type = 'line';
					break;
				case 'pie':
					option.type = 'pie';
					break;
			}

		}

		// When we have a time component, we need to stitch the date and the value together in the
		// series data as eCharts expects time series to be in the format [[date,value],[date,value]]
		if(option.xAxis && option.xAxis[0].type){
			if(option.xAxis[0].type == "time"){
				for(var seriesIndex in option.series){

					var seriesItem = option.series[seriesIndex];

					var dataOut = this.stitchDateSeries(
						option.xAxis[0].data,
						seriesItem.data
					);
					seriesItem.data = dataOut;
				}
			}
		}

		return option;
	}

	/**
	 * Renders the chart into the specified target
	 * @param {string|HTMLElement} target
	 */
	render(target){

		//If target is not a DOM element, then look for the element by id
		if(!(target instanceof HTMLElement)){
			var tryTarget = document.getElementById(target);
			if(tryTarget){
				target = tryTarget;
			} else {
				throw new Error('Target element not found');
			}
		}

		//Get the option struct for the chart
		var option = this.getOption();

		//Create the echarts object
		this.chartInstance = this.#chartsql.echarts.init(target, 'dark');
		// //Set the option struct
		this.chartInstance.setOption(option);

	}

	/**
	 * Stitches together a series of date series together with the category
	 * for the time format that eCharts requires, which is to have the date
	 * in series:[[date,value],[date,value]] form on the series. The
	 * xAxis needs to be time and the yAxis is a value. The series
	 * defines the chart type.
	 * @param {Array<any>} categoryData - The category data
	 * @param {Array<any>} seriesData - The series data
	 */
	stitchDateSeries(categoryData, seriesData){

		/**
		 * @type {Array<any>}
		 */
		var dataOut = [];

		for(var ii=1; ii< seriesData.length; ii++){
			var dateFormat = "yyyy-mm-dd";
			//parse the date
			var rawDate = new Date(categoryData[ii])

			const year = rawDate.getFullYear();
			const month = String(rawDate.getMonth() + 1).padStart(2, '0');
			const day = String(rawDate.getDate()).padStart(2, '0');

			var date = `${year}-${month}-${day}`;
			dataOut.push([date, seriesData[ii]]);

		}
		return dataOut;
	}

}
