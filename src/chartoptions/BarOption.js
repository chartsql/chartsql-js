/**
 * Encapsulates the code to generate an option struct for a Column chart
 */
ChartSQLjs.chartoptions.BarOption = class BarOption {

	/**
	 * Creates a Bar chart option struct given the directives, primary category field, and series fields
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

		return this;

	}

	/**
	 * @return {Record<string, any>}
	 */
	get option(){

		var series = [];
		for(var seriesIndex in this.seriesFields){

			var seriesItem = this.seriesFields[seriesIndex];

			if(this.directives.keyExists('stacks')){
				for(var stackItem in this.directives.get('stacks')){
					if(stackItem == seriesItem.groupField)
					seriesItem.stack = seriesItem.groupField;
				}
			}

			if(seriesItem.isSecondarySeries || false){
				var xAxisIndex = 1;
			} else {
				var xAxisIndex = 0;
			}

			// throw JSON.stringify(seriesItem);

			series.push({
				name: seriesItem.name,
				type: 'bar',
				data: seriesItem.columnData,
				xAxisIndex: xAxisIndex,
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
				top: '10%',
				containLabel: true
			},
			yAxis: [
				{
					type: 'category',
					data: this.primaryCategoryField.columnData,
					inverse:true
				}
			],
			xAxis:[
				{
					type:'value'
				}
			],
			series: series
		};
		return option;
	}

}
