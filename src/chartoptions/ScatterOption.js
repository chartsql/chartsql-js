/**
 * Encapsulates the code to generate an option struct for a Column chart
 */
ChartSQLjs.chartoptions.ScatterOption = class ScatterOption {

	/**
	 * Creates a Line chart option struct given the directives and series fields
	 * @param {ChartSQLjs.Directives} directives
	 * @param {ChartSQLjs.Field} xField
	 * @param {ChartSQLjs.Field} yField
	 */
	constructor(
		directives,
		xField,
		yField
	) {

		this.directives = ChartSQLjs.Validate.instanceOf('directives', directives, ChartSQLjs.Directives);
		this.xField = ChartSQLjs.Validate.instanceOf('xField', xField, ChartSQLjs.Field);
		this.yField = ChartSQLjs.Validate.instanceOf('yField', yField, ChartSQLjs.Field);
		this.normalizedData = this.xField.columnData.map((value, index) => [value, this.yField.columnData[index]])
		return this;
	}

	/**
	 * @return {Record<string, any>}
	 */
	get option(){

		// var hasSize = false;

		// if(this.scatterData.length > 0 && this.scatterData[0].length == 3){
		// 	hasSize = true;
		// }

		let option = {
			xAxis: [{type:'value'}],
			yAxis: [{type:'value'}],
			series: [{
				symbolSize: 10,
				data: this.normalizedData,
				type: 'scatter'
			}]
		};

		// if(hasSize){
		// 	option._scatterSize = "scatterFunc = function(data){ return data[2] / 4; }";
		// }
		return option;

	}

}
