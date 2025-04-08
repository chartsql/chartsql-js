/**
 * Encapsulates the code to generate an option struct for a Gauge chart
 */
ChartSQLjs.chartoptions.GaugeOption = class GaugeOption {

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

		var gaugeData = [];

		if(this.valuesFields.length == 0){
			throw("Gauge charts require at least one numeric column");
		}

		var valueData = this.valuesFields[0].columnData;

		for(var i = 0; i <= this.categoryData.length - 1; i++){
			gaugeData.push({
				name: this.cleanName(this.primaryCategoryField.name),
				value: valueData[i]
			});
		}

		var option = {
			// grid: {
			// 	// left: '3%',
			// 	// right: '4%',
			// 	// bottom: '3%',
			// 	containLabel: true
			// },
			// tooltip: {
			// 	formatter: "'{a} {b} : {c}%'"
			// },
			series: [
				{
					type: 'gauge',
					max: 100,
					data: gaugeData
				}
			]
		};
		return option;
	}

	/**
	 * @param {string} name
	 * @return {string}
	 */
	cleanName(name){
		return name.replace(/_/g, ' ');
	}

}
