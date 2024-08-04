/**
 * Encapsulates the code to generate an option struct for a Column chart
 */
ChartSQLjs.chartoptions.ColumnOption = class ColumnOption {

	/**
	 *
	 * @param {ChartSQLjs.Directives} directives
	 * @param {ChartSQLjs.Field} primaryCategoryField
	 * @param {Array<ChartSQLjs.Field>} seriesFields
	 */
	constructor(
		directives,
		primaryCategoryField,
		seriesFields
	) {

		this.directives = ChartSQLjs.Validate.instanceOf('directives', directives, ChartSQLjs.Directives);
		this.primaryCategoryField = ChartSQLjs.Validate.instanceOf('primaryCategoryField', primaryCategoryField, ChartSQLjs.Field);
		this.seriesFields = ChartSQLjs.Validate.arrayInstanceOf('seriesFields', seriesFields, ChartSQLjs.Field);
		this.categoryData = primaryCategoryField.columnData;
	}

	/**
	 * @return {Record<string, any>}
	 */
	get option(){

		var series = [];
		var yAxis = [];

		yAxis.push({
			type:'value'
		})

		//If any series are isSecondarySeries then we need to add a secondary yAxis
		for(var index in this.seriesFields){
			var seriesItem = this.seriesFields[index];
			if(seriesItem.isSecondarySeries || false){
				yAxis.push({
					type:'value'
				})
				break;
			}
		}

		for(var index in this.seriesFields){

			var seriesItem = this.seriesFields[index];

			if(this.directives.keyExists("stacks")){
				for(var stackItem in this.directives.get('stacks')){
					if(stackItem == seriesItem.groupField)
					seriesItem.stack = seriesItem.groupField;
				}
			}

			if(seriesItem.isSecondarySeries || false){
				var yAxisIndex = 1;
			} else {
				var yAxisIndex = 0;
			}

			series.push({
				name: seriesItem.name,
				type: 'bar',
				yAxisIndex: yAxisIndex,
				data: seriesItem.columnData,
				stack: seriesItem.stack || false
			});
		}

		/**
		 * @type {Record<string, any>}
		 */
		var option = {
			legend: {},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: this.categoryData,
				}
			],
			yAxis: yAxis,
			series: series
		};

		if(this.primaryCategoryField.datatype == "date" || this.primaryCategoryField.datatype == "datetime"){
			option.xAxis[0].type = "time";
		}

		return option;
	}

}