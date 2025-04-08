/**
 * Represents the data that the user wants to chart. We provide this Data class
 * to so that we can encapsulate the data and provide a consistent interface to
 * the data.
 * @memberof ChartSQLjs
 */
ChartSQLjs.Data = class Data {

	/**
	 * @typedef {Object} DataOptions
	 * @property {Array<string>} columns - The columns in the data
	 * @property {Array<Array<*>>} rows - The rows in the data
	 */

	/**
	 * Constructor for the Data class
	 * @param {DataOptions} options - Options for the Data class
	 * @throws {Error} - If columns is not an array
	 * @throws {Error} - If rows is not an array
	 * @throws {Error} - If datatypes is not an array
	 */
	constructor(options) {

		//Options must be passed
		if(!options){
			throw new Error('Options must be passed to Data constructor');
		}

		//If columns is not an array, throw an error
		if(!Array.isArray(options.columns)){
			throw new Error('Invalid columns passed to Data constructor. Must be an array');
		}
		this.columns = options.columns;

		//If rows is not an array, then error
		if(!Array.isArray(options.rows)){
			throw new Error('Invalid rows passed to Data constructor. Must be an array');
		}

		this.rows = options.rows;

	}

	/**
	 * Converts common table like data structures to ChartSQLjs.Data object
	 * @param {*} obj
	 * @returns {ChartSQLjs.Data}
	 */
	static fromJson(obj){

		/** @type {Array<string>} */
		var columns;
		var rows;

		// If it is an array of arrays, we will try fromArrayOfArrays();
		if(Array.isArray(obj) && obj.length > 0 && Array.isArray(obj[0])){
			return this.fromArrayOfArrays(obj);
		}

		// If it is an object containing keys more than 1, we will try fromTableObject();
		if(!Array.isArray(obj) && typeof obj === 'object' && Object.keys(obj).length > 1){
			return this.fromTableObject(obj);
		}

		//When the object is an array of objects, we will try fromArrayOfObjects();
		if(Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'object'){
			return this.fromArrayOfObjects(obj);
		}

		throw new Error('Could not determine the shape of data object. Must be an array of arrays or an array of objects');
	}

	/**
	 * Converts an array of arrays objects to a ChartSQLjs.Data object where the
	 * first array is the columns and the rest of the arrays are the rows
	 * @param {*} obj
	 * @returns {ChartSQLjs.Data}
	 * @throws {Error} - If obj is not an array
	 * @throws {Error} - If obj is an empty array
	 * @throws {Error} - If obj is not an array of arrays
	 * @throws {Error} - If obj is not an array of arrays with the same length	 *
	 */
	static fromArrayOfArrays(obj){

		// Array of arrays like
		// const data = [
		// 	['category', 'total_sales'],
		// 	['shoes', 5000],
		// 	['pants', 10000],
		// 	['shirts', 8000],
		// 	['socks', 4000]
		// ];

		if(!Array.isArray(obj)){
			throw new Error('Could not parse data object. Must be an array of arrays');
		}

		if(obj.length == 0){
			throw new Error('Could not parse data object. The array must have at least one array');
		}

		if(!Array.isArray(obj[0])){
			throw new Error('Could not parse data object. Must be an array of arrays');
		}

		var columns = obj[0];

		//First row of columns must all be strings
		for(var i = 0; i < columns.length; i++){
			if(typeof columns[i] !== 'string'){
				throw new Error('Could not parse data object. All values in the first row must be strings for the columns');
			}
		}

		var rows = obj.slice(1);

		// All arrays should have the same length
		for(var i = 0; i < obj.length; i++){
			if(obj[i].length != columns.length){
				throw new Error('Could not parse data object. All arrays in the array must have the same length');
			}
		}

		return new ChartSQLjs.Data({
			columns: columns,
			rows: rows
		});
	}

	/**
	 * Converts an array of objects to a ChartSQLjs.Data object
	 * @param {Array<Record<string, any>>} obj
	 * @returns {ChartSQLjs.Data}
	 * @throws {Error} - If obj is not an array
	 * @throws {Error} - If obj is an empty array
	 * @throws {Error} - If obj is not an array of objects
	 * @throws {Error} - If obj is not an array of objects with the same keys
	 */
	static fromArrayOfObjects(obj){

		// Array of objects like
		// const data = [
		// 	{ category: 'shoes', total_sales: 5000 },
		// 	{ category: 'pants', total_sales: 10000 },
		// 	{ category: 'shirts', total_sales: 8000 },
		// 	{ category: 'socks', total_sales: 4000 }
		// ];
		if(!Array.isArray(obj)){
			throw new Error('Could not parse data object. Must be an array of objects');
		}

		if(obj.length == 0){
			throw new Error('Could not parse data object. The array must have at least one object');
		}

		if(typeof obj[0] !== 'object'){
			throw new Error('Could not parse data object. Must be an array of objects');
		}

		var columns = Object.keys(obj[0]);
		var rows = obj.map(row => columns.map(column => row[column]));

		// All objects should have the same number of keys
		for(var i = 0; i < obj.length; i++){
			if(Object.keys(obj[i]).length != columns.length){
				throw new Error('Could not parse data object. All objects in the array must have the same number of keys');
			}
		}

		//The key names should be the same for all objects
		for(var i = 0; i < obj.length; i++){
			var keys = Object.keys(obj[i]);
			for(var j = 0; j < keys.length; j++){
				if(columns.indexOf(keys[j]) == -1){
					throw new Error('Could not parse data object. All objects in the array must have the same key names');
				}
			}
		}

		return new ChartSQLjs.Data({
			columns: columns,
			rows: rows
		});
	}

	/**
	 * Returns the data if there is a columns (or equivalent) and rows (or equivalent) property
	 * @param {*} obj
	 * @returns {ChartSQLjs.Data}
	 * @throws {Error} - If obj is not an object
	 * @throws {Error} - If obj does not have a columns property
	 * @throws {Error} - If obj does not have a rows property
	 * @throws {Error} - If obj.columns is not an array
	 * @throws {Error} - If obj.rows is not an array
	 * @throws {Error} - If obj.columns is an empty array
	 * @throws {Error} - If obj.rows is an empty array
	 * @throws {Error} - If obj.columns is not an array of strings
	 */
	static fromTableObject(obj){

		const columnsNames = ['columns', 'column', 'fields', 'field', 'headers', 'header'];
		const rowsNames = ['rows', 'row', 'data', 'body', 'dataset'];

		//Must be an object and not an array
		if(typeof obj !== 'object'){
			throw new Error('Could not parse data object. Must be an object');
		}

		//Cannot be an array
		if(Array.isArray(obj)){
			throw new Error('Could not parse data object. Must be an object');
		}

		//Must have a columns or equivalent property
		var columns;
		for(var i = 0; i < columnsNames.length; i++){
			for(var key in obj){
				if(key == columnsNames[i]){
					columns = obj[key];
				}
			}
		}

		if(!columns){
			throw new Error('Could not parse data object. Must have a key representing columns, one of: ' + columnsNames.join(', '));
		}

		//Must have a rows or equivalent property
		var rows;
		for(var i = 0; i < rowsNames.length; i++){
			for(var key in obj){
				if(key == rowsNames[i]){
					rows = obj[key];
				}
			}
		}

		if(!rows){
			throw new Error('Could not parse data object. Must have a key representing rows, one of: ' + rowsNames.join(', '));
		}

		//Return the rows and columns
		return new ChartSQLjs.Data({
			columns: columns,
			rows: rows
		});
	}

	getFields(){

		// If this.fields is yet undefined, then create it
		// This is so that we only create and process the fields once
		if(!this.fields){

			 /**
			 * An array to store the fields.
			 * @type {ChartSQLjs.Field[]}
			 */
			this.fields = [];

			// //Iterate over the keys in the data object
			var columnIndex = 0;
			for(var key in this.columns){

				// if our rows has a row, get the first row of the data
				var row = this.rows[0];

				// get the value of the matching column
				var value = row[columnIndex];

				if (value == null) {
					continue;
				}

				// we need to detct if the datatype of the value is a string, numeric, date or datetime
				var datatype = 'string';

				if (typeof value === 'number') {
					datatype = 'numeric';
				} else if (typeof value === 'string') {
					if (Date.parse(value)) {
						datatype = 'date';
					}
				} else {
					throw new Error('Error: Invalid datatype in data. Only string, numeric, and date datatypes are supposed for chart series');
				}

				//Create a new field object
				var field = new ChartSQLjs.Field(
					datatype,
					this.columns[key],
					this
				);

				columnIndex++;

				//Add the field to the fields array
				this.fields.push(field);
			}
		}

		return this.fields;
	}

	/**
	 * Returns the type of chart that should be automatically generated based on the data
	 * @returns {ChartSQLjs.AutoChartType}
	 */
	detectAutoChartType(){

		/**
		 * @type {Record<string, any>}
		 */
		var autoChartTypes = {
			"column":{
				"string":{
					comparison: "==",
					digit:1
				},
				"numeric":{
					comparison: "==",
					digit:1
				},
			},
			"grouped-column":{
				"string":{
					comparison: "==",
					digit:1
				},
				"numeric":{
					comparison: ">=",
					digit:2
				},
			},
			"dateline":{
				"date":{
					comparison: "==",
					digit:1
				},
				"numeric":{
					comparison: ">=",
					digit:1
				},
			},
			"timeline":{
				"datetime":{
					comparison: "==",
					digit:1
				},
				"numeric":{
					comparison: ">=",
					digit:1
				},
			},
			"scatter":{
				"numeric":{
					comparison: "==",
					digit:2
				},
			},
			"bubble":{
				"numeric":{
					comparison: "==",
					digit:3
				},
			},
			"heatmap": {
				"string":{
					comparison: "==",
					digit:2
				},
				"numeric":{
					comparison: "==",
					digit:1
				},
			},
		}

		var fields = this.getFields();

		//Create a unique object of datatypes counting the distinct datatypes found in the fields, counting the occurances
		/**
		 * @type {Record<string, number>}
		 */
		var datatypes = {};
		for(var i = 0; i < fields.length; i++){
			var datatype = fields[i].datatype;
			if(datatypes[datatype]){
				datatypes[datatype]++;
			} else {
				datatypes[datatype] = 1;
			}
		}

		// Loop through the autoChartTypes, checking if each type matches the datatype and count of the fields. Evaluating the comparison
		for(var chartType in autoChartTypes){

			var chartTypesMatch = true;

			//First test if we have the datatypes for each of the types in the chartType
			for(var datatype in autoChartTypes[chartType]){
				if(!datatypes[datatype]){
					chartTypesMatch = false;
					break;
				}
			}

			var typeCountMatch = false;
			// Now if the chartTypesMatch eval() that we have the correct number of fields for the chartType
			if(chartTypesMatch){

				var typeCountMatch = true;

				for(var datatype in autoChartTypes[chartType]){
					// eval the comparison and digit
					var result = this.compare(datatypes[datatype], autoChartTypes[chartType][datatype].comparison, autoChartTypes[chartType][datatype].digit);
					if(!result){
						typeCountMatch = false;
						break;
					}
				}
			}

			// If we have a match, return the chartType
			if(typeCountMatch){
				return chartType;
			}
		}

		//

		return "indeterminate";
	}

	/**
	 * Loops throug the datatypes and gets the first field that matches the type in the datatypes array
	 * @param {Array<string>} datatypes
	 * @returns {ChartSQLjs.Field}
	 * @throws {Error} - If no fields are found with the datatypes
	 */
	firstFieldOfTypes(datatypes){
		var fields = this.getFields();

		//Loop through the datatypes array
		for(var i = 0; i < datatypes.length; i++){
			//Loop through the fields array
			for(var j = 0; j < fields.length; j++){
				//If the datatype of the field matches the datatype in the datatypes array
				if(fields[j].datatype == datatypes[i]){
					return fields[j];
				}
			}
		}

		throw new Error('No fields found with the datatypes: ' + datatypes.join(', '));
	}

	/**
	 * Gets an array of fields matching the type
	 * @param {string} datatype
	 * @returns {Array<ChartSQLjs.Field>}
	 */
	allFieldsOfType(datatype){
		var fields = this.getFields();
		var fieldsOfType = [];
		for(var i = 0; i < fields.length; i++){
			if(fields[i].datatype == datatype){
				fieldsOfType.push(fields[i]);
			}
		}
		return fieldsOfType;
	}

	/**
	 * Gets the fields organize by type
	 * @returns
	 */
	getFieldsByType(){

		var fields = this.getFields();

		/**
		 * @type {Record<string, ChartSQLjs.Field[]>}
		 */
		var datatypes = {};

		for(var i = 0; i < fields.length; i++){
			var datatype = fields[i].datatype;
			datatypes[datatype] = datatypes[datatype] || [];
			datatypes[datatype].push(fields[i]);
		}
		return datatypes;
	}

	/**
	 *
	 * @param {number} value1
	 * @param {string} comparison
	 * @param {number} value2
	 * @returns {boolean}
	 */
	compare(value1, comparison, value2) {
		switch (comparison) {
			case "==":
				return value1 == value2;
			case "!=":
				return value1 != value2;
			case ">":
				return value1 > value2;
			case ">=":
				return value1 >= value2;
			case "<":
				return value1 < value2;
			case "<=":
				return value1 <= value2;
			default:
				throw new Error("Invalid comparison operator: " + comparison);
		}
	}

	/**
	 * Given the name returns the data for that column
	 * @param {string} name
	 * @returns {*}
	 */
	columnData(name){
		var columnIndex = this.columns.indexOf(name);
		var columnData = [];
		for(var i = 0; i < this.rows.length; i++){
			columnData.push(this.rows[i][columnIndex]);
		}
		return columnData;
	}

	/**
	 * Given the name returns a list of all the unique values for that column.
	 * 
	 * We will use a map for efficiency to check if the value exists in the map
	 * @param {string} name
	 * @returns {*}
	 */
	getUniqueColumnData(name){
		var columnIndex = this.columns.indexOf(name);
		var columnData = [];
		/**
		 * @type {Record<string, boolean>}
		 */
		var uniqueValues = {};
		for(var i = 0; i < this.rows.length; i++){
			var value = this.rows[i][columnIndex];
			if(!uniqueValues[value]){
				uniqueValues[value] = true;
				columnData.push(value);
			}
		}
		return columnData;
	}

	/**
	 * Given the name returns a list of all the unique values for that column.
	 * @param {string} name
	 * @returns { ChartSQLjs.Data }
	 */
	selectDistinct(name){
		return new ChartSQLjs.Data({
			columns: [name.trim()],
			rows: this.getUniqueColumnData(name.trim()).map((/** @type {any} */ value) => [value])
		});
	}

	/**
	 * Gets a list of all the values for the column where the where column name matches the where value
	 * @param {string} columnName
	 * @param {string} whereColumnName
	 * @param {string} whereValue
	 * @returns { any[] }
	 */
	getValuesFromColumnWhere(columnName, whereColumnName, whereValue){
		const columnIndex = this.columns.indexOf(columnName);

		const whereColumnIndex = this.columns.indexOf(whereColumnName);
		const values = [];

		for (let i = 0; i < this.rows.length; i++) {
			if (this.rows[i][whereColumnIndex] === whereValue) {
				values.push(this.rows[i][columnIndex]);
			}
		}

		return values;
	}

	/**
	 * Group by the data according to the fields and aggregation functions
	 *  
	 * Note: First step to create the unique array of keys, then second go back to the 
	 * original dataset then collect the values into an array where each row matches
	 * each element of the key, then for each of the element array collected you apply the
	 * matching function. The last step is to recontruct the final Data object.
	 * 
	 * @param { Array<ChartSQLjs.Aggfunc> } aggFields
	 * @param { Array<ChartSQLjs.Field> } groupByFields
	 * @returns { ChartSQLjs.Data }
	 */
	groupByFields(aggFields, groupByFields){
		//Create a new array to store the columns
		/**
		 * @type {string[]}
		 */
		var newColumns = [];

		//Add the group by fields to the newColumns
		for(var i = 0; i < groupByFields.length; i++){
			newColumns.push(groupByFields[i].name);
		}

		var isAggregating = false;

		//Add the aggregation fields to the newColumns
		for(var i = 0; i < aggFields.length; i++){
			if (aggFields[i].functionName == null) {
				newColumns.push(aggFields[i].field.name);
			} else {
				// Keep the same column name
				newColumns.push(aggFields[i].field.name);
				// columns.push(aggFields[i].functionName + '(' + aggFields[i].field.name + ')');
				isAggregating = true;
			}
		}

		//Create a new object to store the rows
		/** @type {Record<string, any[]>} */
		var rowsMap = {};
		
		/**
		 * @type {any[][]}
		 */
		var newRows = [];

		//Loop through the rows in the data
		for(var ii = 0; ii < this.rows.length; ii++){

			//Create a new array to store the row
			var row = [];

			//Loop through the group by fields
			for(var jj = 0; jj < groupByFields.length; jj++){
				var field = groupByFields[jj];
				var columnIndex = this.columns.indexOf(field.name);
				row.push(this.rows[ii][columnIndex]);
			}

			//Create a new object to store the key for the row
			var key = row.join(',');

			//If the key does not exist in the rows object, create a new array
			if(!(key in rowsMap)){
				rowsMap[key] = [];
			}

			//Loop through the aggregation fields
			for(var jj = 0; jj < aggFields.length; jj++){
				var field = aggFields[jj].field;
				var columnIndex = this.columns.indexOf(field.name);
				// Check for duplicates
				if (rowsMap[key].indexOf(this.rows[ii][columnIndex]) == -1) {
					rowsMap[key].push(this.rows[ii][columnIndex]);
				}
			}
		}
		
		if (!isAggregating) {
			// Create a new array to store the columns
			/**
			 * @type {string[]}
			 */
			// Loop through the columns

			// for (var i = 0; i < this.columns.length; i++) {
			// 	// If the column is in the groupByFields, then add it to the newColumns
			// 	if (groupByFields.map(x => x.name).indexOf(this.columns[i]) != -1) {
			// 		columns.push(this.columns[i]);
			// 	}

			// 	// If the column is in the aggFields, then add it to the newColumns
			// 	if (aggFields.map(x => x.field.name).indexOf(this.columns[i]) != -1) {
			// 		columns.push(this.columns[i]);
			// 	}
			// }


			var columnsThatDoesNotExist = [...this.columns].filter(x => newColumns.indexOf(x) == -1);
			// Clone this.rows with a .map function instead of using a spread operator because we need
			// entirely new copies of the inner arrays, otherwise it will cause errors when modifying 
			// newRows because since it will keep a reference to this.rows inner arrays
			// when we change newRows it will also inadvertently change this.rows too
			var newRows = this.rows.map(function(arr) {
				return arr.slice();
			});
			for (var i = 0; i < columnsThatDoesNotExist.length; i++) {
				var columnIndex = this.columns.indexOf(columnsThatDoesNotExist[i]) - i;
				for (var j = 0; j < newRows.length; j++) {
					newRows[j].splice(columnIndex);
				}
			}

			// Sort newRows by the first groupByFields column value, which can be a string or a number
			// newRows.sort((a, b) => a[0] - b[0] || a[0].localeCompare(b[0]));

			// Create a new data object
			var result = new ChartSQLjs.Data({
				columns: newColumns,
				rows: newRows
			});
			return result;
		} else {
			//Loop through the rows object and add the rows to the data object
			for(var key in rowsMap){
				// If rowsMap[key] is an array then reduce it according to the function
				// from aggFunc
				if (Array.isArray(rowsMap[key])) {
					/**
					* @type {any[]}
					*/
					let row = [...key.split(',')];
					for (var i = 0; i < aggFields.length; i++) {
						if (aggFields[i].functionName == null) {
							// If no function is provided, then just add the value
							for (var j = 0; j < rowsMap[key].length; j++) {
								row.push(rowsMap[key][j]);
							}
							continue;
						// @ts-ignore
						} else if (aggFields[i].functionName != null && aggFields[i].functionName.toLowerCase() == 'avg') {
							row.push(rowsMap[key].reduce((acc, val) => acc + val, 0) / rowsMap[key].length);
							continue;
						// @ts-ignore
						} else if (aggFields[i].functionName != null && aggFields[i].functionName.toLowerCase() == 'sum') {
							row.push(rowsMap[key].reduce((acc, val) => acc + val, 0));
							continue;
						// @ts-ignore
						} else if (aggFields[i].functionName != null && aggFields[i].functionName.toLowerCase() == 'count') {
							row.push(rowsMap[key].length);
							continue;
						// @ts-ignore
						} else if (aggFields[i].functionName != null && aggFields[i].functionName.toLowerCase() == 'min') {
							row.push(Math.min(...rowsMap[key]));
							continue;
						// @ts-ignore
						} else if (aggFields[i].functionName != null && aggFields[i].functionName.toLowerCase() == 'max') {
							row.push(Math.max(...rowsMap[key]));
							continue;
						}
						continue;
					}
					newRows.push(row);
				}

				// if (Array.isArray(rowsMap[key])) {
				// 	if (aggFields[0].functionName == 'avg') {
				// 		rows.push([...key.split(','), rowsMap[key].reduce((acc, val) => acc + val, 0) / rowsMap[key].length]);
				// 		continue;
				// 	} else if (aggFields[0].functionName == 'sum') {
				// 		rows.push([...key.split(','), rowsMap[key].reduce((acc, val) => acc + val, 0)]);
				// 		continue;
				// 	} else if (aggFields[0].functionName == 'count') {
				// 		rows.push([...key.split(','), rowsMap[key].length]);
				// 		continue;
				// 	} else if (aggFields[0].functionName == 'min') {
				// 		rows.push([...key.split(','), Math.min(...rowsMap[key])]);
				// 		continue;
				// 	} else if (aggFields[0].functionName == 'max') {
				// 		rows.push([...key.split(','), Math.max(...rowsMap[key])]);
				// 		continue;
				// 	}
				// 	continue;
				// }
			}
			//Create a new data object
			var data = new ChartSQLjs.Data({
				columns: newColumns,
				rows: newRows
			});
			return data;
		}

	}

	/**
	 * Returns the fields that match the series directive
	 * @param {string[]} seriesArray
	 * @returns {Array<ChartSQLjs.Field>}
	 */
	getNumericFieldsMatchingSeries(seriesArray){
		var fields = this.getFields();
		var numericFields = [];
		for(var i = 0; i < fields.length; i++){
			if(fields[i].datatype == 'numeric' && seriesArray.indexOf(fields[i].name.trim()) != -1){
				numericFields.push(fields[i]);
			}
		}
		return numericFields;
	}

	/**
	 * Given the name returns the field object
	 * @param {string} name
	 * @returns {ChartSQLjs.Field}
	 */
	getFieldByName(name){
		if (name == null) {
			throw new Error('Field name cannot be null');
		}

		var fields = this.getFields();
		for(var i = 0; i < fields.length; i++){
			if(fields[i].name == name.trim()){
				return fields[i];
			}
		}
		throw new Error('Field not found with name: ' + name);
	}

	/**
	 * Check if column exists in the data
	 * @param {string} column
	 * @returns {boolean}
	 */
	columnExists(column){
		return this.columns.indexOf(column) != -1;
	}
	
	/**
	 * Given a list of column names returns an array of field objects
	 * @param {string[]} names
	 * @returns {ChartSQLjs.Field[]}
	 */
	getFieldsByNames(names){
		var fieldsArray = [];
		for(var i = 0; i < names.length; i++){
			fieldsArray.push(this.getFieldByName(names[i]));
		}
		return fieldsArray;
	}

	/**
	 * Returns the number of rows in the data
	 * @returns {number}
	 */
	get rowCount(){
		return this.rows.length;
	}
}