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

				case 'scatter':
					var seriesFields = this.data.allFieldsOfType("numeric");

					var xField = new ChartSQLjs.Field('numeric', seriesFields[0].name, this.data);
					var yField = new ChartSQLjs.Field('numeric', seriesFields[1].name, this.data);

					var option = new ChartSQLjs.chartoptions.ScatterOption(
						this.directives,
						xField,
						yField
					).option;

					break;
				case 'bubble':
					var option = new ChartSQLjs.chartoptions.BubbleOption(
						this.directives,
						this.data.getFields()
					).option;

					break;
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
					var categoryData = this.data.allFieldsOfType("string");
					var valuesFields = this.data.allFieldsOfType("numeric");
					var fieldsByType = this.data.getFieldsByType();
					var primaryCategoryField = fieldsByType.string[0];

					var option = new ChartSQLjs.chartoptions.PieOption(
						this.directives,
						primaryCategoryField,
						categoryData,
						valuesFields
					).option;

					break;

				case 'heatmap':
					var stringFields = this.data.allFieldsOfType("string");
					var numericFields = this.data.allFieldsOfType("numeric");

					var xField = new ChartSQLjs.Field('string', stringFields[0].name, this.data);
					var yField = new ChartSQLjs.Field('string', stringFields[1].name, this.data);
					var valueField = new ChartSQLjs.Field('numeric', numericFields[0].name, this.data);

					var option = new ChartSQLjs.chartoptions.HeatmapOption(
						this.directives,
						xField,
						yField,
						valueField
					).option;

					break;
			}

		} else {

			var chartType = this.directives.get('chart');

			var categoryData = this.data.allFieldsOfType("string");
			var primaryCategoryField = this.data.firstFieldOfTypes(["string", "date", "datetime", "numeric"]);
			var seriesFields = this.data.allFieldsOfType("numeric");
			var stringFields = this.data.allFieldsOfType("string");
			var numericFields = this.data.allFieldsOfType("numeric");

			if(this.directives.keyExists("groups")){
				// var groups = this.directives.get('groups');
				// for (var group of groups) {
				// 	if (!this.data.columns.includes(group.toLowerCase().trim())) {
				// 		throw(`Column '${group}' on @groups value not found (available columns: ${this.data.columns}#)`);
				// 	}
				// }

				// var groupByFields = this.data.getFieldsByNames(groups);
				// var aggFuncs = [];
				// if (this.directives.keyExists("series")) {
				// 	var seriesDirective = this.directives.get("series");

				// 	// if(this.directives.keyExists("secondary-series")){
				// 	// 	seriesDirective.merge(this.directives.get("secondary-series"));
				// 	// }

				// 	aggFuncs = seriesDirective.map((/** @type {string} */ s) => {
				// 		var aggregateFunction = 'sum';
				// 		var fieldCleanName = s;
				// 		if (s.includes('sum(') || s.includes('avg(') || s.includes('count(') || s.includes('min(') || s.includes('max(')) {
				// 			aggregateFunction = s.split('(')[0];
				// 			fieldCleanName = s.split('(')[1].split(')')[0];
				// 		}
				// 		return new ChartSQLjs.Aggfunc(
				// 			aggregateFunction, this.data.getFieldByName(fieldCleanName.trim())
				// 		)
				// 	});
				// } else {
				// 	var numericFields = this.data.allFieldsOfType("numeric");
				// 	if (numericFields.length > 0) {
				// 		// Assistive Mode should select the left most numeric column in this case for the series.
				// 		aggFuncs = [new ChartSQLjs.Aggfunc('sum', numericFields[0])];
				// 	} else {
				// 		aggFuncs = [];
				// 	}
				// }
				// var groupByFieldsData = this.data.groupByFields(aggFuncs, groupByFields);
				
				// categoryData = groupByFieldsData.allFieldsOfType("string");
				// if(this.directives.keyExists("category")){
				// 	var categoryName = this.directives.get('category');
				// 	primaryCategoryField = groupByFieldsData.getFieldByName(categoryName);
				// } else { 
				// 	primaryCategoryField = groupByFieldsData.firstFieldOfTypes(["string", "date", "datetime", "numeric"]);
				// }
				// seriesFields = groupByFieldsData.allFieldsOfType("numeric");
				// stringFields = groupByFieldsData.allFieldsOfType("string");
				// numericFields = groupByFieldsData.allFieldsOfType("numeric");

				var categoryName = this.directives.get("groups")[0];
				var primaryCategoryData = this.data.selectDistinct(categoryName);
				var primaryCategoryField = primaryCategoryData.getFieldByName(categoryName);
				var groupsDirective = this.directives.get("groups");
				var seriesValues = [];

				if (this.directives.keyExists("series") && !(this.directives.get("series") == null) && !(this.directives.get("series") == [])) {
					seriesValues = this.directives.get("series");
				} else {
					// Assistive Mode should select the left most numeric column in this case for the series.
					var firstNumericField = this.data.firstFieldOfTypes(["numeric"]);
					if (firstNumericField != null) {
						seriesValues = [firstNumericField.name];
					} else {
						seriesValues = [];
					}
				}

				var secondarySeriesValues = [];
				if(this.directives.keyExists("secondary-series")){
					secondarySeriesValues = this.directives.get("secondary-series");
				} else {
					secondarySeriesValues = [];
				}

				var allSeriesValues = [...seriesValues, ...secondarySeriesValues];

				if(groupsDirective.length == 1){

					var workingField = groupsDirective[0];
					if(workingField == categoryName){
						groupByData = this.data.selectDistinct(workingField);

						categoryData = [this.data.getFieldByName(workingField)];

						atValue = allSeriesValues[0];

						var aggFunc = "sum";

						if(atValue.includes("avg(")){
							aggFunc = "avg";
						} else if(atValue.includes("sum(")){
							aggFunc = "sum";
						} else if(atValue.includes("count(")){
							aggFunc = "count";
						} else if(atValue.includes("min(")){
							aggFunc = "min";
						} else if(atValue.includes("max(")){
							aggFunc = "max";
						}

						if(atValue.includes("avg(") || atValue.includes("sum(") || atValue.includes("count(") || atValue.includes("min(") || atValue.includes("max(")){
							isAggregating = true;
							atValue = atValue.split(")")[0].split("(")[1];
						}

						var data = this.data.groupByFields([new ChartSQLjs.Aggfunc(
							aggFunc, this.data.getFieldByName(atValue.trim())
						)], categoryData);

						seriesFields = [];

						var field = new ChartSQLjs.Field(
							'numeric',
							atValue,
							data,
							false,
							workingField,
							null
						);

						seriesFields.push(field);

					} else {
						console.error("Error: The first groups field must be the category field")
						throw("The first groups field must be the category field");
					}
				} else if(groupsDirective.length == 2){
					var groupBy1 = groupsDirective[0];
					var groupBy2 = groupsDirective[1];

					if(groupBy1 != categoryName){
						console.error("Error: The first groups field must be the category field")
						throw("The first groups field must be the category field");
					}

					// First we are going to get the distinct values for groupBy1
					// these will be our category values

					// This is getting the DISTINCT values for the groupBy1
					// TO DO: Create a function called getDistinctData() that will return the distinct values
					// of the data for the given field
					// query name="groupByData" dbtype="query" {
					// 	echo("
					// 	SELECT *
					// 	FROM this.data
					// 	GROUP BY #groupBy1#
					// 	ORDER BY _sortId ASC
					// 	")
					// }

					var groupByData = this.data.selectDistinct(groupBy1.trim());
					categoryData = [groupByData.getFieldByName(groupBy1.trim())];

					//Now get all of the distinct values for groupBy2
					// query name="groupByData2" dbtype="query" {
					// 	echo("
					// 	SELECT *
					// 	FROM this.data
					// 	GROUP BY #groupBy2#
					// 	ORDER BY _sortId ASC
					// 	")
					// }
					var groupByData2 = this.data.selectDistinct(groupBy2.trim());

					//Create our series, one for each unique grouypBy2 value
					seriesFields = [];
					var valuesCount = 0;
					for(var atValue of allSeriesValues){

						// Increment the values count that we will used to get the
						// type of the series if we are a combo chart
						valuesCount++;
						var originalAtValue = atValue;

						var isStacking = false;
						var isAggregating = false;

						var aggFunc = "sum";

						if(atValue.includes("stack(")){
							isStacking = true;
							var atValue = atValue.replace("stack(", "");
							var atValue = atValue.replace(")", "");
						}
						
						if(atValue.includes("avg(")){
							aggFunc = "avg";
						} else if(atValue.includes("sum(")){
							aggFunc = "sum";
						} else if(atValue.includes("count(")){
							aggFunc = "count";
						} else if(atValue.includes("min(")){
							aggFunc = "min";
						} else if(atValue.includes("max(")){
							aggFunc = "max";
						}

						if(atValue.includes("avg(") || atValue.includes("sum(") || atValue.includes("count(") || atValue.includes("min(") || atValue.includes("max(")){
							isAggregating = true;
							atValue = atValue.split(")")[0].split("(")[1];
						}

						if(isAggregating){
							var valuesOut = this.data.groupByFields([new ChartSQLjs.Aggfunc(
								aggFunc.toLowerCase(), this.data.getFieldByName(atValue.trim())
							)], [...categoryData]);

							if(secondarySeriesValues.includes(originalAtValue)){
								var isSecondarySeries = true;
							} else {
								var isSecondarySeries = false;
							}
							
							var field = new ChartSQLjs.Field(
								'numeric',
								atValue,
								valuesOut,
								isSecondarySeries,
								null,
								null
							);

							/** @type {Record<string, string>} */
							var seriesToSeriesTypesMap = {};
							this.directives.get("series").forEach((/** @type {string} */ s, /** @type {number} */ i) => {
								seriesToSeriesTypesMap[s] = this.directives.get("series-types")[i];
							});
							
							if(this.directives.keyExists("series-types")){
								field.type = seriesToSeriesTypesMap[originalAtValue];
							}

							seriesFields.push(field);
						} else {
							var valuesOut = this.data.groupByFields([new ChartSQLjs.Aggfunc(
								null, this.data.getFieldByName(atValue.trim())
							)], [...categoryData, this.data.getFieldByName(groupBy2.trim())]);
							for(var indexRow in groupByData2.rows){
								if(seriesValues.length > 1){
									var name = `${groupByData2.rows[indexRow][0]} ${atValue}`;
								} else {
									var name = `${groupByData2.rows[indexRow][0]}`;
								}

								if(secondarySeriesValues.includes(atValue)){
									var isSecondarySeries = true;
								} else {
									var isSecondarySeries = false;
								}

								var data = new ChartSQLjs.Data({
									columns: [name],
									rows: valuesOut.getValuesFromColumnWhere(atValue.trim(), groupBy2.trim(), groupByData2.rows[indexRow][0]).map((/** @type {number} */ value) => {
										return [value];
									})
								});

								var field = new ChartSQLjs.Field(
									'numeric',
									name,
									data,
									isSecondarySeries,
									groupBy2.trim(),
									isStacking ? atValue : null
								);

								/** @type {Record<string, string>} */
								var seriesToSeriesTypesMap = {};
								this.directives.get("series").forEach((/** @type {string} */ s, /** @type {number} */ i) => {
									seriesToSeriesTypesMap[s] = this.directives.get("series-types")[i];
								});
								
								if(this.directives.keyExists("series-types")){
									field.type = seriesToSeriesTypesMap[atValue];
								}

								seriesFields.push(field);
							}
						}
					}
				} else {
					throw("Not yet handled more than 2 group by");
				}
			} else {
				if(this.directives.keyExists("category")){
					var categoryName = this.directives.get('category');
					var primaryCategoryField = this.data.getFieldByName(categoryName);
				}
	
				//get the series fields
				if(this.directives.keyExists("series")){
					for (var serie of this.directives.get("series")) {
						if (!this.data.columns.includes(serie.toLowerCase().trim())) {
							throw(`Column '${serie}' on @series value not found (available columns: ${this.data.columns}#)`);
						}
					}
					var seriesFields = this.data.getNumericFieldsMatchingSeries(this.directives.get("series"));
				}

				if(this.directives.keyExists("series-types")){
					var seriesTypes = this.directives.get("series-types");
					
					for (var i = 0; i < seriesFields.length; i++) {
						if (i >= seriesTypes.length) {
							seriesFields[i].type = seriesTypes[seriesTypes.length - 1];
						} else {
							seriesFields[i].type = seriesTypes[i];
						}
					}
				}
			}

			if (this.directives.keyExists("formats"))  {
				var formats = this.directives.get("formats");
				for (var i = 0; i < seriesFields.length; i++) {
					if (seriesFields[i].type != "value") {
						continue;
					}

					var format = ChartSQLjs.Chart.matchOrdinalPosition(i, formats);
					seriesFields[i].format = format;
				}
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
					var option = new ChartSQLjs.chartoptions.LineOption(
						this.directives,
						primaryCategoryField,
						seriesFields
					).option;
					break;
				case 'area':
					var option = new ChartSQLjs.chartoptions.AreaOption(
						this.directives,
						primaryCategoryField,
						seriesFields
					).option;
					break;
				case 'combo': 
					var option = new ChartSQLjs.chartoptions.ComboOption(
						this.directives,
						primaryCategoryField,
						categoryData,
						seriesFields
					).option;

					break;
				case 'scatter':
					var xField = new ChartSQLjs.Field('numeric', seriesFields[0].name, this.data);
					var yField = new ChartSQLjs.Field('numeric', seriesFields[1].name, this.data);
					var option = new ChartSQLjs.chartoptions.ScatterOption(
						this.directives,
						xField,
						yField
					).option;
					break;
				case 'bubble':
					var option = new ChartSQLjs.chartoptions.BubbleOption(
						this.directives,
						this.data.getFields()
					).option;
					break;
				case 'gauge':
					var option = new ChartSQLjs.chartoptions.GaugeOption(
						this.directives,
						primaryCategoryField,
						categoryData,
						seriesFields
					).option;
					break;
				case 'heatmap': 
					var xField = new ChartSQLjs.Field('string', stringFields[0].name, this.data);
					var yField = new ChartSQLjs.Field('string', stringFields[1].name, this.data);
					var valueField = new ChartSQLjs.Field('numeric', numericFields[0].name, this.data);

					var option = new ChartSQLjs.chartoptions.HeatmapOption(
						this.directives,
						xField,
						yField,
						valueField
					).option;

					break;
				case 'pie': 
					var option = new ChartSQLjs.chartoptions.PieOption(
						this.directives,
						primaryCategoryField,
						categoryData,
						seriesFields
					).option;

					break;
			}

		}

		// When we have a time component, we need to stitch the date and the value together in the
		// series data as eCharts expects time series to be in the format [[date,value],[date,value]]
		if(option.xAxis && (
			Object.hasOwn(option.xAxis, 'type')
			|| (
				option.xAxis.length >= 0
				&& Object.hasOwn(option.xAxis[0], 'type')
				&& option.xAxis[0].type
			)
		)) {
			var xAxisType = Object.hasOwn(option.xAxis, 'type') ? option.xAxis.type : option.xAxis[0].type;
			var xAxisData = Object.hasOwn(option.xAxis, 'data') ? option.xAxis.data : option.xAxis[0].data;
			if(xAxisType == "time"){
				for(var seriesIndex in option.series){

					var seriesItem = option.series[seriesIndex];
					var dataOut = this.stitchDateSeries(
						xAxisData,
						seriesItem.data
					);
					option.series[seriesIndex].data = dataOut;
				}
			}
		}

		if (!this.directives.keyExists("tooltip")) {
			option.tooltip = {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						// background color white, text color black
					}
				}
			}
		}

		if (
			this.directives.keyExists("formats")
			&& this.directives.get("formats") != null
			&& this.directives.get("formats").length > 0
			&& Object.hasOwn(option, 'series')
		) {
			var mainAxisDimension = "x";

			option.tooltip.axisPointer.label.formatter = `var func = function(params) {
				try {
					Date.prototype.isValid = function () {
						// If the date object is invalid it
						// will return 'NaN' on getTime()
						// and NaN is never equal to itself
						return this.getTime() === this.getTime();
					};

					var formats = ${JSON.stringify(this.directives.get("formats"))};
					var mainAxisDimension = '${mainAxisDimension}';
					var format = 'decimal';
					if (formats.length > params.axisIndex) {
						format = formats[params.axisIndex];
					}

					// If params.value is a date, then use params.value[1] as the value
					if (Array.isArray(params.value)) {
						params.value = params.value[1];
					}

					if (params.axisDimension == mainAxisDimension && params.seriesData != undefined && params.seriesData.length > 0 && 'componentType' in params.seriesData[params.axisIndex] && params.seriesData[params.axisIndex].componentType == 'series') {
						resultDate = new Date(params.value);
						if (resultDate.isValid()) {
							return resultDate.toLocaleDateString();
						} else {
							 return params.value;
						}
					}

					if (params.value != null && !isNaN(params.value)) {
						if (format == 'currency') {
							return \`$\${params.value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\`;
						} else if (format == 'percent') {
							return \`\${Math.round(params.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%\`;
						} else if (format == 'integer') {
							return \`\${Math.round(params.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\`;
						} else if (format == 'decimal') {
							return \`\${params.value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\`;
						} else {
							return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						}
					} else {
						return params.value;
					}
				} catch (error) {
					console.log('Error in tooltip formatter');
					console.log({error});
					if (Array.isArray(params.value)) {
						params.value = params.value[1];
					}
					return params.value;
				}
			}`;

			var seriesGroupByStack = new Map();

			for (i = 0; i < option.series.length; i++) {
				var key = i;
				if ('stack' in option.series[i] 
					&& 'stack' in option.series[i] 
					&& option.series[i].stack != false) {
					key = option.series[i].stack;
				} else if ('name' in option.series[i]) {
					key = option.series[i].name;
				} else {
					option.series[i].name = key;
				}
				if (key in seriesGroupByStack) {
					seriesGroupByStack.get(key).push(option.series[i]);
				} else {
					seriesGroupByStack.set(key, [option.series[i]]);
				}
			}

			var i = 0;
			
			[...seriesGroupByStack.values()].forEach((series) => {
				series.forEach((/** @type {{ format: any; }} */ serie) => {
					serie.format = ChartSQLjs.Chart.matchOrdinalPosition(i, this.directives.get("formats"));
				});
				i++;
				return series;
			});

			// Reduce the seriesGroupByStack to a single array
			/** @type {Record<string, any>} */
			var seriesByNameMap = {};
			[...seriesGroupByStack.values()].forEach(function (stack) {
				stack.forEach(function (/** @type {{ name: any; }} */ serie) {
					seriesByNameMap[ChartSQLjs.Chart.cleanName(serie.name)] = serie;
				});
			});

			option.tooltip.formatter = `var func = function(params) {
				try {
					var result = '';
					if (params.length > 0 && params[0].name != undefined && params[0].name != null && params[0].name != '') {
						result = params[0].name + '<br>';
					}

					var formats = ${JSON.stringify(this.directives.get("formats"))};
					var seriesByNameMap = ${JSON.stringify(seriesByNameMap)};
					var format = 'decimal';

					for (var i = 0; i < params.length; i++) {
						let format = seriesByNameMap[params[i].seriesName].format;

						// If params.value is a date, then do nothing
						if (Array.isArray(params[i].value)) {
							params[i].value = params[i].value[1];
						}

						if (params[i].axisDimension == 'x' && params[i].seriesData != undefined && params[i].seriesData.length > 0 && 'componentType' in params[i].seriesData[params[i].axisIndex] && params[i].seriesData[params[i].axisIndex].componentType == 'series') {
							try {
								return new Date(params[i].value).toLocaleDateString();
							} catch (e) {
								return params[i].value;
							}
						}

						if (format == 'currency') {
							result += \`\${params[i].marker} <b>\${params[i].seriesName}</b>: $\${parseInt(params[i].value).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}<br>\`;
						} else if (format == 'percent') {
							result += \`\${params[i].marker} <b>\${params[i].seriesName}</b>: \${params[i].value.toFixed(2).toLocaleString()}%<br>\`;
						} else if (format == 'integer') {
							result += \`\${params[i].marker} <b>\${params[i].seriesName}</b>: \${Math.round(params[i].value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}<br>\`;
						} else if (format == 'decimal') {
							result += \`\${params[i].marker} <b>\${params[i].seriesName}</b>: \${params[i].value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}<br>\`;
						} else {
							result += \`\${params[i].marker} <b>\${params[i].seriesName}</b>: \${params[i].value.toLocaleString()}<br>\`;
						}
					}
					return result;
				} catch (error) {
					console.error('Error in tooltip formatter');
					console.error({error});
					var result = params[0].name + '<br>';
					for (var i = 0; i < params.length; i++) {
						result += \`\${params[i].marker} <b>\${params[i].seriesName}</b>: \${params[i].value.toLocaleString()}<br>\`;
					}
				}
			}`;
		}

		if (Object.hasOwn(option, 'series')) {
			for (i = 0; i < (option.series.length); i++) {
				if ( Object.hasOwn(option.series[i], 'name') && (typeof option.series[i].name === "string")) {
					option.series[i].name = ChartSQLjs.Chart.cleanName(option.series[i].name);
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
		option = this.evaluateOptionFunctions(option);

		//Create the echarts object
		this.chartInstance = this.#chartsql.echarts.init(target, 'dark');
		// //Set the option struct
		this.chartInstance.setOption(option);

	}

	/**
	 * @param {string} format
	 */
	static functionFromFormat(format) {
		var formatFunction = "function(value) {return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}";
		switch(format.trim().toLowerCase()){	
			case "none":
				formatFunction = "function(value) {return value.toString();}";
			break;

			case "currency":
				formatFunction = "function(value) {return `$${value.toLocaleString()}`;}";
			break;

			case "percent":
				formatFunction = "function(value) {return value.toLocaleString() + '%';}";
			break;

			case "integer":
				formatFunction = "function(value) {return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}";
			break;

			case "decimal":
				formatFunction = "function(value) {return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}";
			break;
		}

		return formatFunction;
	}

	/**
	 * Utility method to get the same matching ordinal position item from an array given
	 * the source array and the item to match on. If the source array is larger than the
	 * target array, then we will return the last item in the target array. This supports
	 * the "fall through" of the last item in the target array being used for all remaining
	 * items in the source array for directives.
	 * @param {number} pos
	 * @param {any[]} target
	 */
	static matchOrdinalPosition(
		pos,
		target
	){
		if(pos >= target.length){
			return target[target.length - 1];
		} else {
			return target[pos];
		}
	}

	/**
	 * Goes into every property of the option object even the properties levels below and evaluates 
	 * if it a string and it has the 'function' word in it. If it does, it will evaluate the function
	 * and replace the string with the function.
	 * @param {{ [x: string]: any; }} option
	 * @returns {{ [x: string]: any; }}
	 */
	evaluateOptionFunctions(option) {
		for (var key in option) {
			if (typeof option[key] === 'object' && !Array.isArray(option[key])) {
				this.evaluateOptionFunctions(option[key]);
				// Check if the object is an array
			} else if (typeof option[key] === 'object' && Array.isArray(option[key])) {
				for (var i = 0; i < option[key].length; i++) {
					if (typeof option[key][i] === 'object') {
						this.evaluateOptionFunctions(option[key][i]);
					}
				}
			} else if (typeof option[key] === 'string' && option[key].includes('function')) {
				if (
					// Work around for legacy code that uses 'var func =' instead of just 'function'
					option[key].includes('func =')
				) {
					eval(`${option[key]}; option[key] = func;`);
				} else if (option[key].includes('scatterFunc =')) { 
					eval(`var ${option[key]}; option[key] = scatterFunc;`);
				} else {
					eval(`var func = ${option[key]}; option[key] = func;`);
				}
			}
		}
		return option;
	}

	/**
	 * Cleaned name of the series with no underscores
	 * @param {String} name - Name of the series
	 */
	static cleanName(name){
		return name.replace(/_/g, ' ');
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

		for(var ii=0; ii< seriesData.length; ii++){
			//parse the date
			var rawDate = new Date(categoryData[ii])
			var date = rawDate.toISOString();
			dataOut.push([date, seriesData[ii]]);

		}
		return dataOut;
	}

}
