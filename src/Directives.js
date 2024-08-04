/**
 * Encapsulates an object of directives and contains methods for working
 * with the directives as a whole
 */
ChartSQLjs.Directives = class Directives {

	/**
	 * Constructor for the Directives class, takes an object of directives
	 * @param {Record<string, any>} directives - The object of directives
	 */
	constructor(directives) {

		this._supportedDirectives = {
			"chart": true,
			"category": true,
			"series": true,
			"groups": true,
			"formats": true,
			"stacks": true,
			"title": true,
			"subtitle": true,
			"description": true,
			"stacking": true,
			"stacking-mode": true,
			"series-types": true,
			"secondary-series": true,
			"baselines": true,
			"baseline-types": true,
			"series-labels":true,
			"overlay-series": true,
			"mongodb-query": true,
			"tags": true
		}

		// These are the directives that are arrays and need to be converted to arrays
		this._arrayDirectives = [
			"series",
				"groups",
				"formats",
				"stacks",
				"series-types",
				"secondary-series",
				"baselines",
				"baseline-types",
				"series-labels",
				"overlay-series"
		];

		this._jsonTypes = {
			"mongodb-query":true
		}

		this.directives = directives;
	}

	/**
	 * Whether the directices in the chart imply that the chart is in auto mode
	 * (or otherwise in assisted mode). This is determined by the presence of
	 * plotting directives in the chart. If no plotting directives are found, then
	 * the chart is in auto mode.
	 */
	get isAutoMode() {

		var plottingDirectives = {
			chart: true,
			category: true,
			series: true
		}

		//var count the plotting directives found
		var plottingDirectivesFound = 0;
		for(var key in plottingDirectives){
			if(this.directives[key]){
				plottingDirectivesFound++;
			}
		}

		if(plottingDirectivesFound == 0){
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Checks whether the directives object has a key and it is not null
	 * @param {string} key - The key to check for
	 */
	keyExists(key){

		if(this.directives[key]){
			return true;
		} else {
			return false;
		}

	}

	/**
	 * Get the value of a directive by key
	 * @param {string} key - The key of the directive to get
	 */
	get(key){
		return this.directives[key];
	}
}
