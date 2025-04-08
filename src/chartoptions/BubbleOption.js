/**
 * Encapsulates the code to generate an option struct for a Column chart
 */
ChartSQLjs.chartoptions.BubbleOption = class BubbleOption {

	/**
	 * Creates a Line chart option struct given the directives and series fields
	 * @param {ChartSQLjs.Directives} directives
	 * @param {Array<ChartSQLjs.Field>} seriesFields
	 */
	constructor(
		directives,
		seriesFields
	) {

		this.directives = ChartSQLjs.Validate.instanceOf('directives', directives, ChartSQLjs.Directives);
        this.seriesFields = ChartSQLjs.Validate.arrayInstanceOf('seriesFields', seriesFields, ChartSQLjs.Field);
        this.normalizedData = this.seriesFields[0].columnData.map((/** @type {any} */ value, /** @type {string | number} */ index) => {
            return this.seriesFields.map((/** @type {{ columnData: { [x: string]: any; }; }} */ field) => field.columnData[index]);
        });
		return this;
	}

	/**
	 * @return {Record<string, any>}
	 */
	get option(){

		var hasSize = false;

		if(this.seriesFields.length > 2){
			hasSize = true;
		}

        // Get the minimum and maximum values for the size field
        let sizeField = this.seriesFields[2];
        let minSize = Math.min(...sizeField.columnData);
        let maxSize = Math.max(...sizeField.columnData);

        // Normalize the size field values to be between 10 and 50
        let normalizedSizeData = sizeField.columnData.map((/** @type {number} */ value) => {
            return (Math.round(10 + (value - minSize) * 50 / (maxSize - minSize)));
        });

        this.normalizedData.map((/** @type {any[]} */ value, /** @type {number} */ index) => {
            value[2] = normalizedSizeData[index];
            return value;
        });

		let option = {
			xAxis: [{type:'value'}],
			yAxis: [{type:'value', axisLabel: {
				formatter: ChartSQLjs.Chart.functionFromFormat(this.seriesFields[0].format)
			}}],
			series: [{
				symbolSize: 10,
				data: this.normalizedData,
				type: 'scatter'
			}]
		};

        // If the size field is present, add it to the option
        if (hasSize) {
            // @ts-ignore
            option._scatterSize = `scatterFunc = function(data){return data[2]; }`;

			// For each series add the symbolSize function
			option.series.forEach((/** @type {Record<string, any>} */ series) => {
				// @ts-ignore
				series.symbolSize = option._scatterSize;
			});
        }

		return option;
	}

}
