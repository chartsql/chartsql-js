/**
 * @memberof Tester
 */
Tester.Test2 = class Test2 {

	/**
	 * @param {Tester.Test} test
	 * @param {ChartSQLjs.Data}[data]
	 * @param {ChartSQLjs.Field}[field]
	 * @param {ChartSQLjs.ChartSQL}[chartsql]
	 */
	constructor(test, data, field, chartsql) {

		var theTest = new Tester.Test();
        console.log('Test class constructor');
    }

	/**
	 * @param {ChartSQLjs.Field} field
	 */
	foo(field){
		var test = new Tester.Test();
	}

};

var test1 = new Tester.Test();
var test2 = new Tester.Test2(test1);
