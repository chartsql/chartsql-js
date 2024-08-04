/**
 * Provides validatation methods for the ChartSQL library.
 */
ChartSQLjs.Validate = class Validate {

	constructor(
	) {

	}

	/**
	 * Checks if the given argument and passed in number matched the given type variable.
	 * @template T
	 * @param {string} argumentName
	 * @param {*} obj
	 * @param {new (...args: any[]) => T} expectedType - The constructor function or array of constructor functions for the expected type.
	 * @returns {T}
	 */
	static instanceOf(argumentName, obj, expectedType) {
		if (obj === undefined || obj === null) {
			throw new Error(`${argumentName} is required.`);
		}

		// Otherwise, just check the object itself
		if (!(obj instanceof expectedType)) {
			throw new Error(`${argumentName}: Invalid object passed; expected an instance of ${expectedType.name}.`);
		}
		return obj;
	}

	/**
	 * Whether the passed in argument is an array
	 * @template T
	 * @param {string} argumentName
	 * @param {*} obj
	 * @param {new (...args: any[]) => T} expectedType - The constructor function or array of constructor functions for the expected type.
	 * @returns {*}
	 */
	static arrayInstanceOf(argumentName, obj, expectedType) {

		if (obj === undefined || obj === null) {
			throw new Error(`${argumentName} is required.`);
		}

		if (!Array.isArray(obj)) {
			throw new Error(`${argumentName} must be an array.`);
		}

		if (!obj.every(item => item instanceof expectedType)) {
			throw new Error(`${argumentName}: One or more items in the array are not instances of ${expectedType.name}.`);
		}

		return obj;
	}

	/**
	 * Whether the passed in argument is a string
	 * @param {string} argumentName
	 * @param {*} obj
	 * @returns {string}
	 */
	static string(argumentName, obj) {

		if (obj === undefined || obj === null) {
			throw new Error(`${argumentName} is required.`);
		}

		if (typeof obj !== 'string') {
			throw new Error(`${argumentName} must be a string but is a ${typeof obj}.`);
		}

		return obj;
	}

}
