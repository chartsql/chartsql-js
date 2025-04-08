/**
 * Encapsulates the code to generate an option struct for a Combo chart
 */
ChartSQLjs.chartoptions.ComboOption = class ComboOption {

	/**
	 * Creates a Combo chart option struct given the directives, categoryData, and series fields
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

		var series = [];
		var yAxis = [];

		yAxis.push({
			type:'value',
			data: [],
			axisLabel: {
				formatter: ChartSQLjs.Chart.functionFromFormat(this.valuesFields[0].format)
			},
			inverse: false
		})

		//If any series are isSecondarySeries then we need to add a secondary yAxis
		for(var seriesItem of this.valuesFields){
			if(seriesItem.isSecondarySeries??false){
				yAxis.push({
					type:'value',
					data: [],
					axisLabel: {
						formatter: ChartSQLjs.Chart.functionFromFormat(seriesItem.format)
					},
					inverse: false
				})
				break;
			}
		}

		for(var seriesItem of this.valuesFields){
			if(!("type" in seriesItem)){
				throw("Combo charts require a type fosr each series using the @series-types directive");
			}

			if(seriesItem.type == "column"){
				//We rewrite column to bar
				var typeName = "bar";
				seriesItem.itemStyle = {
					"normal": {
					  "opacity": 0.1 // Set the opacity here
					}
				}
			} else {
				/** @type {string} */ var typeName = seriesItem.type;
			}

			if(seriesItem.isSecondarySeries??false){
				var yAxisIndex = 1;
			} else {
				var yAxisIndex = 0;
			}

			var itemOut = {
				name: seriesItem.name,
				type: typeName,
				yAxisIndex: yAxisIndex,
				lineStyle: {
					normal: {
						width: 2
					}
				},
				data: seriesItem.columnData,
				stack: seriesItem.stack??false
			}

			// Increase the line style on combo charts as it is a bit too
			// thin when overlaying on top of columns
			if(seriesItem.type == "line"){
				itemOut.lineStyle.normal.width = 3;
			}

			series.push(itemOut);
		}

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
					data: this.primaryCategoryField.columnData,
					inverse: false
				}
			],
			yAxis:yAxis,
			series: series
		};

		if(this.valuesFields[0].type == "bar"){
			//Swap the x and y axis
			option.xAxis = yAxis;
			option.yAxis = [
				{
					type: 'category',
					data: this.categoryData.columnData,
					// 2024-01-23: We set the inverse so that the default sort of bars appears as top to bottom
					// I think echarts sorts from 0,0 coordinate, but this is unintuitive for bar charts
					axisLabel: {
						formatter: "var func = function(value){return value;}"
					},
					inverse: true
				}
			]
		}

		if(this.primaryCategoryField.datatype == "date" || this.primaryCategoryField.datatype == "datetime"){
			option.xAxis[0].type = "time";
		}
		return option;
	}

}
