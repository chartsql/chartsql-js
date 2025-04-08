/**
 * Encapsulates the code to generate an option struct for a Pie chart
 */
ChartSQLjs.chartoptions.PieOption = class PieOption {

	/**
	 * Creates a Line chart option struct given the directives, primary category field, and series fields
	 * @param {ChartSQLjs.Directives} directives
	 * @param {ChartSQLjs.Field} primaryCategoryField
	 * @param {Array<ChartSQLjs.Field>} categoryData
	 * @param {Array<ChartSQLjs.Field>} valuesFields
	 */
	constructor(
		directives,
		primaryCategoryField,
		categoryData,
		valuesFields
	) {

		this.directives = ChartSQLjs.Validate.instanceOf('directives', directives, ChartSQLjs.Directives);
		this.primaryCategoryField = ChartSQLjs.Validate.instanceOf('primaryCategoryField', primaryCategoryField, ChartSQLjs.Field);
		this.categoryData = ChartSQLjs.Validate.arrayInstanceOf('categoryData', categoryData, ChartSQLjs.Field);
		this.valuesFields = ChartSQLjs.Validate.arrayInstanceOf('valuesFields', valuesFields, ChartSQLjs.Field);

		return this;

	}

	/**
	 * @return {Record<string, any>}
	 */
	get option(){
		var pieData = [];

		if(this.valuesFields.length == 0){
			throw("Pie charts require at least one numeric column");
		}

		var valueData = this.valuesFields[0].columnData;

		for(var ii = 0; ii <= this.categoryData[0].columnData.length - 1; ii++){
			pieData.push({
				name: this.categoryData[0].columnData[ii],
				value: valueData[ii]
			});
		}

		var option = {
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			series: [
			  {
				type: 'pie',
				data: pieData,
				label:{
					fontSize: 16,  // Set the font size
					formatter: '{b}: {d}%'  // Set the label to show the name and percentage
				}
			  }
			]
		};
		return option;
	}

}
