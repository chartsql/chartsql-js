ChartSQLjs.Aggfunc = class Aggfunc {
	/**
	 * Constructor for the Aggfunc class which represents an aggregation function that can be applied to a field
	 * @param {String?} functionName - The name of the Aggfunc
	 * @param {ChartSQLjs.Field} field
	 */
	constructor(
		functionName,
		field
	) {

		const validFunctionNames = ['avg', 'sum', 'count', 'min', 'max'];

		if (functionName != null) {
			functionName = functionName.toLowerCase();
		}

		// Check if the datatype is valid
		if(functionName != null && validFunctionNames.indexOf(functionName) == -1){
			throw new Error('Invalid function name passed to Aggfunc constructor. Must be one of: ' + validFunctionNames.join(', '));
		}

		// Check if the name is a string
		if(functionName != null && typeof functionName !== 'string'){
			throw new Error('Invalid functionName passed to Aggfunc constructor. Must be a string');
		}

		//Should be an instance of the class Data
		if (!(field instanceof ChartSQLjs.Field)) {
			throw new Error('Invalid field object passed to Aggfunc constructor, expected instance of ChartSQLjs.Field');
		}

		this.functionName = functionName;
		this.field = field;
	}
}