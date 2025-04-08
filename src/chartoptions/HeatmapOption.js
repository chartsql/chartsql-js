/**
 * Encapsulates the code to generate an option struct for a Heatmap chart
 */
ChartSQLjs.chartoptions.HeatmapOption = class HeatmapOption {

	/**
	 * Creates a Line chart option struct given the directives and series fields
	 * @param {ChartSQLjs.Directives} directives
	 * @param {ChartSQLjs.Field} xField
	 * @param {ChartSQLjs.Field} yField
	 * @param {ChartSQLjs.Field} valueField
	 */
	constructor(
		directives,
		xField,
		yField,
		valueField
	) {

		this.directives = ChartSQLjs.Validate.instanceOf('directives', directives, ChartSQLjs.Directives);
        this.xField = ChartSQLjs.Validate.instanceOf('xField', xField, ChartSQLjs.Field);
        this.yField = ChartSQLjs.Validate.instanceOf('yField', yField, ChartSQLjs.Field);
        this.valueField = ChartSQLjs.Validate.instanceOf('valueField', valueField, ChartSQLjs.Field);
		return this;
	}

	/**
	 * @return {Record<string, any>}
	 */
	get option(){

		//We need to get the distinct values for x and y
		var yStruct = {};
		var xStruct = {};
		var xData = [];
		var yData = [];

		for(var ii=0; ii<=this.xField.columnData.length - 1; ii++){
			xStruct[this.xField.columnData[ii]] = true;
			yStruct[this.yField.columnData[ii]] = true;
		}

		for(var key in xStruct){
			xData.push(key);
		}

		for(var key in yStruct){
			yData.push(key);
		}


		var data = [];

		for(var ii=0; ii<=this.xField.columnData.length - 1; ii++){
			//Map the xField, yField and valueField into the data structure
			data.push([
				this.xField.columnData[ii],
				this.yField.columnData[ii],
				this.valueField.columnData[ii]
			]);
		}

		// Get the maximum value for the value field
		var maxValue = Math.max(...this.valueField.columnData);

		var option = {
			tooltip: {
				position: 'top',
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '##6a7985'
					}
				},
				formatter: "var func = function(columns) {let html = columns.map((data) => {return `${data.marker} ${data.value[1]}: <b>${data.value[2]}</b>`;}).join('<br>');return `<b>${columns[0].name}</b><br>${html}`;}"
			},
			grid: {
				height: '50%',
				y: '10%'
			},
			xAxis: [{
				type: 'category',
				// data: ['X0', 'X1'] // Number of entries should correspond to distinct x indices
				data: xData,
			}],
			yAxis: [{
				type: 'category',
				// data: ['Y0', 'Y1'] // Number of entries should correspond to distinct y indices
				data: yData
			}],
			visualMap: {
				min: 0,
				// max: 50,
				max: maxValue,
				calculable: true,
				orient: 'horizontal',
				left: 'center',
				bottom: '15%'
			},
			series: [{
				name: 'Heatmap',
				type: 'heatmap',
				data: data,
				label: {
					show: true
				},
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		};
		return option;
	}

}
