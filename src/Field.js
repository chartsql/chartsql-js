ChartSQLjs.Field = class Field {

	/**
	 * @type {ChartSQLjs.Data}
	 */
	#data;

	/**
	 * Constructor for the Field class
	 * @param {String} datatype - The datatype of the field
	 * @param {String} name - The name of the field
	 * @param {ChartSQLjs.Data} data - Reference back to the Data object that the field belongs to
	 * @param {boolean} isSecondarySeries - Whether the field is a secondary series
	 * @param {String?} groupField - The field that the data is grouped by
	 * @param {String?} stack - The stack that the field belongs to
	 */
	constructor(
		datatype,
		name,
		data,
		isSecondarySeries = false,
		groupField = null,
		stack = null
	) {

		const validDatatypes = ['string', 'numeric', 'date', 'datetime'];

		// Check if the datatype is valid
		if(validDatatypes.indexOf(datatype) == -1){
			throw new Error('Invalid datatype passed to Field constructor. Must be one of: ' + validDatatypes.join(', '));
		}

		// Check if the name is a string
		if(typeof name !== 'string'){
			throw new Error('Invalid name passed to Field constructor. Must be a string');
		}

		//Should be an instance of the class Data
		if (!(data instanceof ChartSQLjs.Data)) {
			throw new Error('Invalid Data object passed to Field constructor, expected instance of ChartSQL.Data');
		}

		this.cleanName = name;
		this.name = name;
		this.datatype = datatype;
		this.type = 'value';
		this.format = "value";
		this.#data = data;
		this.isSecondarySeries = isSecondarySeries;
		this.groupField = groupField;
		this.stack = stack;
	}

	/**
     * Gets the data for a particular column out of the dataset
     * @returns {any[]} Array of data for the column
     */
	get columnData(){
		return this.#data.columnData(this.name);
	}

}