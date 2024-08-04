/**
 * Encapsulates a directive name to allow us to fluently work with the
 * stripped, full and commented versions that we might need to work with.
 */
ChartSQLjs.DirectiveName = class DirectiveName {

	/**
	 * Constructor for the DirectiveName class
	 * @param {string} directiveName - The directive name to encapsulate
	 */
	constructor(directiveName) {
		const Validate = ChartSQLjs.Validate;
		this._directiveName = Validate.string('directiveName', directiveName);
	}

	get isCommented() {
		//Check if the directive name starts with '//'
		return this._directiveName.startsWith('//');
	}

	/**
	 * @returns {string}
	 */
	get full() {
		//returns the full directive name like @series-types:
		//start with the stripped
		let full = this.stripped;
		//Add the @ and the :
		full = `@${full}:`;
		return full;
	}

	get commented() {
		//Add the // to the front
		return `//${this.full}`;
	}

	get stripped() {
		//Remove '@', '//', ":" and any whitespace
		return this._directiveName.replace(/@|\/\/|:|\s/g, '');
	}
}
