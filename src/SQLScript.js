/**
 * SQLScript parses a sql string file to extract the directives from it
 */
ChartSQLjs.SQLScript = class SQLScript {

	/** @type {ChartSQLjs.ChartSQL} */
	#chartsql

	/**
	 * @typedef {Object} SQLScriptOptions
	 * @property {ChartSQLjs.ChartSQL} chartsql - The ChartSQL object
	 * @property {string} sql - The sql script
	 */

	/**
	 * Constructor for the SQLScript class
	 * @param {SQLScriptOptions} options - The options object
	 */
	constructor(
		options
	) {

		const Validate = ChartSQLjs.Validate;
		this.#chartsql = Validate.instanceOf('chartsql', options.chartsql, ChartSQLjs.ChartSQL);
		this.sql = Validate.string('sql', options.sql);

		this._directiveRegex = /((\/{2})?@[a-zA-z-]+:)/g

		this._multilineDirectives = [
			"description"
		];

	}

	/**
	 * Removing any directive characters and comments from the line
	 * @param {string} line
	 * @returns {string}
	 */
	_cleanLine(line){
		// Remove any --, @ or // from the line and trip the whitespace
		return line.replace(/--|@|\/\/|\s/g, '');
	}

	/**
	 * Strips the SQL comments from the line returning everything after the comment
	 * @param {string} line
	 * @returns {string}
	 */
	_stripSqlComments(line){
		return line.split('--')[1];
	}

	/**
	 * Extracts the content of a directive from the SQL string from the given line
	 * @param {string} line - The line containing the directive
	 * @param {ChartSQLjs.DirectiveName} directiveName - The directive name
	 * @returns {string} The content of the directive
	 */
	_extractLineContentAfterDirective(line, directiveName){
		// Split the line at the full directive name
		var content = line.split(directiveName.full)[1].trim();
		return content;
	}

	/**
	 * Extracts all the raw contents of the directives from the SQL string
	 * @returns {Record<string, string>} Array of the raw contents of the directives
	 */
	_extractAllRawDirectiveContents(){

		var lines = this._splitLines(this.sql);
		/** @type {Record<string, string>} */
		var directives = {};
		for(var i = 0; i < lines.length; i++){
			var line = lines[i];
			if(this._lineContainsAnyDirective(line)){

				var tryDirectiveName = this._extractFirstDirectiveFromLine(line);

				if(tryDirectiveName){

					//If we are a multiline directive then we need to extract the content
					//up to the next directive, next directive, non comment line or end of file
					if(this._multilineDirectives.includes(tryDirectiveName.stripped)){
						var result = this._extractMultilineDirective(lines, i, tryDirectiveName);
						i = result.continueAt;
						var multilineContent = result.content;
						directives[tryDirectiveName.full] = multilineContent;
					} else {
						var directiveName = tryDirectiveName;
						var content = this._extractRawDirectiveContent(directiveName);
						directives[directiveName.full] = content;
					}
				}
			}
		}

		return directives;

	}

	/**
	 * Extracts the content of a directive from the SQL string including mult-line directives
	 * @param {ChartSQLjs.DirectiveName} directiveName
	 * @returns {string} The content of the directive
	 */
	_extractRawDirectiveContent(directiveName){

		const Validate = ChartSQLjs.Validate;

		var directiveName = Validate.instanceOf('directiveName', directiveName, ChartSQLjs.DirectiveName);

		var sql = this.sql;

		// Split the SQL into lines
		var lines = this._splitLines(sql);
		var content = "";

		// Find the line that contains the directive
		for(var i = 0; i < lines.length; i++){

			var line = lines[i];
			if (this._lineContainsMatchingDirective(line, directiveName)) {
				// Get everything after the directive matching for the directive name
				content = this._extractLineContentAfterDirective(line, directiveName);
				break;
			}

		}

		return content;
	}

	/**
	 * Extracts the multi-line content of a directive from the SQL string starting
	 * from the given line index and continuing until the end of the directive
	 * @param {Array<string>} lines
	 * @param {number} startingAt
	 * @param {ChartSQLjs.DirectiveName} directiveName
	 * @returns {{content: string, continueAt: number}} The content of the directive and the line to continue at
	 */
	_extractMultilineDirective(lines, startingAt, directiveName){

		var content = "";
		console.log(lines);

		var out = {
			content: '',
			continueAt:startingAt
		}

		for(var i = startingAt; i < lines.length; i++){
			var isFirstLine = i == startingAt;
			var line = lines[i];
			if(isFirstLine){
				console.log(line);
				out.content = out.content + this._extractLineContentAfterDirective(line, directiveName);
				console.log(content);
			} else {

				var lineContainsDirective = this._lineContainsAnyDirective(line);
				var isRegularSqlContent = !this._lineIsSqlComment(line);
				var isLastLine = i == lines.length - 1;

				if(lineContainsDirective || isRegularSqlContent){

					out.continueAt = i - 1;
					// break;
					return {
						continueAt: i - 1,
						content: out.content
					}

				} else if(isLastLine){

					out.continueAt = i;
					out.content = out.content + ' ' + this._stripSqlComments(line).trim();
					// break;
					return {
						continueAt: i,
						content: out.content
					}

				} else {
					out.content = out.content + ' ' + this._stripSqlComments(line).trim();
				}
			}

		}

		throw new Error('Could not extract multi-line directive content.');

	}

	/**
	 * Given a line, extracts the first directive from it
	 * @param {string} line
	 * @returns {ChartSQLjs.DirectiveName|null}
	 */
	_extractFirstDirectiveFromLine(line){
		var matches = line.match(this._directiveRegex);
		if (matches) {
			return new ChartSQLjs.DirectiveName(matches[0]);
		}
		return null;
	}

	/**
	 * Whether the line contains any chartsql directive at all
	 * @param {string} line - The line to check
	 * @returns {boolean}
	 */
	_lineContainsAnyDirective(line){

		if(!this._lineIsSqlComment(line)){
			return false;
		}

		// If the line contains any string matching //@word:
		var matches = line.match(this._directiveRegex);
		if (matches) {
			return true;
		}
		return false;
	}

	/**
	 * Whether the line contains the given matching directive name
	 * @param {string} line
	 * @param {ChartSQLjs.DirectiveName} directiveName
	 * @returns {boolean}
	 */
	_lineContainsMatchingDirective(line, directiveName){
		var fullName = directiveName.full;
		var commentedName = directiveName.commented;
		//if the line contains the full name or the commentedName
		if(line.includes(fullName) || line.includes(commentedName)){
			return true;
		}
		return false;
	}

	/**
	 * Whether the line is a SQL comment or another type of line
	 * @param {string} line
	 * @returns {boolean}
	 */
	_lineIsSqlComment(line){
		// If the line is a comment
		if(line.trim().startsWith('-- ')){
			return true;
		}
		return false;
	}

	/**
	 * Given the sql string, returns an array of matched at directive strings in the form of @directive:
	 * @return {Array<string>} Array of matched at directives
	 */
	_matchAtDirectives(){
		// Originally I had (@[a-z:]+) which was incorrect when there
		// were no spaces between the directive and the colon
		// Update the regex from:
		// 		(@[a-zA-z]+:)
		// To:
		// 		((\/{2})?@[a-zA-z]+:)
		// This will allow for comments to be added to the directive. I could not get
		// it to work all from the regex so we have to post process the matches
		// to remove the comments. It seems that Lucee doesn't support not matching groups (?>)
		var out = [];
		var matches = this.sql.match(this._directiveRegex);
		if (matches) {
			for (var i = 0; i < matches.length; i++) {
				out.push(matches[i])
			}
		}
		return out;
	}

	/**
	 * Parses the SQL script into lines and returns the lines as an array of strings
	 * @param {string} sql
	 * @returns {Array<string>}
	 */
	_splitLines(sql){
		return sql.split('\n');
	}

	/**
	 * Returns an object of the parsed directives
	 * @returns {ChartSQLjs.Directives}
	 */
	get directives(){

		/**
		 * @type {Record<string, any>}
		 */
		var directivesValues = {};

		var rawDirectives = this._extractAllRawDirectiveContents();

		for(var key in rawDirectives){

			var value = rawDirectives[key];
			var directiveName = new ChartSQLjs.DirectiveName(key);

			if(directiveName.isCommented){
				continue;
			}

			directivesValues[directiveName.stripped] = value;

		}

		var directives = new ChartSQLjs.Directives(directivesValues);
		return directives;
	}

}
