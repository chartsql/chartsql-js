/**
 * Provides validatation methods for the ChartSQL library.
 */
var GraalJsExpect = class GraalJsExpect {

	/**
	 * Object which will be validated
	 * @param {*} obj
	 */
	constructor(
		obj
	) {
		this.obj = obj;
	}

	/**
	 * @param {*} expectedType
	 * @returns
	 */
	toBeInstanceOf(expectedType) {
		if (!(this.obj instanceof expectedType)) {
			throw new Error(`Invalid object passed; expected an instance of ${expectedType.name}. ${this.obj.constructor.name} was passed.`);
		}
		return this;
	}

	/**
	 *
	 * @param {*} value
	 */
	toBe(value) {
		if (this.obj !== value) {
			throw new Error(`Invalid object passed; expected ${value}. ${this.obj} was passed.`);
		}
		return this;
	}

	/**
	 * Tests that the called code throws an error
	 * @param {string} [matchesExactly] - The exact error message that should be thrown
	 */
	throwToBe(matchesExactly){

		try {
			// this.obj should be a function
			this.obj();
		} catch (e) {

			if(e instanceof Error){

				// console.dump(e.message);
				if(matchesExactly && e.message === matchesExactly){
					return;
				} else {
					throw new Error('Expected function to throw the error: ' + matchesExactly + ' but got: ' + e.message);
				}

				// if(regex && regex.test(e.message)){
				// 	return;
				// }
			} else {
				throw new Error('Expected function to throw an error');
			}

			return;
		}

		throw new Error('Function did not throw an error as expected');

	}

}

/**
 *
 * @param {*} obj
 * @returns
 */
var expect = function(obj){
	return new GraalJsExpect(obj);
}