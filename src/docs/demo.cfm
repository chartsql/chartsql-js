<cfscript>
	var data = {}
	data.examples = [
		{
			target: "auto-column",
			title: "Auto Column",
			description: "An automatically generated column chart from one string field and one numeric field.",
			script: "auto_column.js"
		},
		{
			target: "auto-grouped-column",
			title: "Auto Grouped Column",
			description: "An automatically generated grouped column chart from one string field and two numeric fields.",
			script: "auto_grouped_column.js"
		},
		{
			target: "auto-dateline",
			title: "Auto Date Line",
			description: "An automatically generated line chart from a date field and a numeric field.",
			script: "auto_dateline.js"
		},
		{
			target: "basic-bar",
			title: "Basic Bar",
			description: "A basic bar chart with a few data points.",
			script: "basic_bar.js"
		},
		{
			target: "data-array-of-objects",
			title: "Data Array of Objects",
			description: "Chart data can come from an array of objects.",
			script: "data_array_of_objects.js"
		},
		{
			target: "data-array-of-arrays",
			title: "Data Array of Arrays",
			description: "Chart data can come from an array of arrays where the first array are the column names",
			script: "data_array_of_arrays.js"
		},
		{
			target: "data-table-object",
			title: "Data Table Object",
			description: "Chart data can come from an object with columns and rows keys.",
			script: "data_table_object.js"
		},
		{
			target: "data-data-class",
			title: "Data Class",
			description: "Chart data can come from instantiating a Data class.",
			script: "data_data_class.js"
		},
		{
			target: "basic-sql",
			title: "SQL Script Directives",
			description: "Chart data can come from a SQL script with directives.",
			script: "basic_sql.js"
		},
	]

	for(var example in data.examples){
		example.code = fileRead("../../docs/examples/#example.script#");
	}

</cfscript>
<cf_handlebars context="#data#">
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ChartSQL.js Examples</title>
	<script src="../dist/js/chartsql.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/dracula.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/javascript/javascript.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/edit/closebrackets.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/comment/comment.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/fold/foldcode.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/fold/foldgutter.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/fold/brace-fold.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/fold/comment-fold.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/addon/fold/foldgutter.min.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
	<style>
		.CodeMirror {
			height: 100%;
		}
	</style>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-2">
				<h1>Examples</h1>
				<ul>
					{{#each examples}}
					<li><a href="#{{target}}-heading">{{title}}</a></li>
					{{/each}}
				</ul>
			</div>
			<div class="col-10">
				<h1 id="top" class="mb-3">ChartSQL.js Examples</h1>

				{{#each examples}}
				<h2 id="{{target}}-heading">{{title}} <small><a href="#top">top</a></small></h2>
				<!--- <div class="row mb-3">
				</div> --->
				<div class="row mb-3 g-0" style="height:600px;">
					<div class="col position-relative">
						<textarea id="{{target}}-code" class="codeEditor" data-name="{{target}}"></textarea>
						<div style="position:absolute; top:0; right:0; z-index:1;">
							<button onclick="runScript('{{target}}-code')">Run</button>
							<button onclick="copyToClipboard('{{target}}-code')">copy</button>
						</div>
					</div>
					<div class="col" class="">
						<div id="{{target}}" class="chartRender" data-name="{{target}}" style="width:100%; height:100%; background-color:green;"></div>
					</div>
				</div>
				<script id="{{target}}-script" class="chartScript" data-name="{{target}}" type="module">{{{code}}}</script>
				{{/each}}
			</div>
		</div>
	</div>
	<!--- <div style="display: flex; flex-flow: row; width:100%; height:100%;">
		<div style="display:flex; width:15%; height:100%; flex-flow:column;">

			<div style="width:50%;">code</div>
			<div>chart</div>

		</div>
		<div style="display:flex; width:85%; height:100%; flex-flow:column; padding-bottom:50px;">
			{{#each examples}}
			<div style="width:100%;">
				<h2>{{title}}</h2>
			</div>
			<div style="display:flex; flex-flow:row; height:600px; width: 100%;">
				<div style="width:50%; height:100%; display:flex; flex-flow:column; background-color:blue;">
					<div style="flex-grow:1; position:relative; display:flex; flex-flow:column; height:100%;">
						<textarea id="{{target}}-code" class="codeEditor" data-name="{{target}}"></textarea>
						<div style="position:absolute; top:0; right:0; z-index:1;">
							<button onclick="runScript('{{target}}-code')">Run</button>
							<button onclick="copyToClipboard('{{target}}-code')">copy</button>
						</div>
					</div>
				</div>
				<div id="{{target}}" class="chartRender" data-name="{{target}}" style="width:50%; height:100%; background-color:green;"></div>
			</div>
			<script id="{{target}}-script" class="chartScript" data-name="{{target}}">{{{code}}}</script>
			{{/each}}
		</div>
	</div>--->
	<script>

		//Grabs the code from the target element and evals it
		var runScript = function(codeTarget){
			var code = document.getElementById(codeTarget).value;
			console.log(code);
			eval(code);
		}

		var copyToClipboard = function(codeTarget){
			var code = document.getElementById(codeTarget).value;
			navigator.clipboard.writeText(code);
		}

		//For each .codeEditor element, create a CodeMirror instance
		var codeEditors = document.getElementsByClassName('codeEditor');
		for(var i = 0; i < codeEditors.length; i++){

			//Get the data-name
			let dataName = codeEditors[i].getAttribute('data-name');

			//Get the code from .chartScript element associated with the same name
			let code = document.querySelector('.chartScript[data-name="' + dataName + '"]').innerHTML;

			codeEditors[i].value = code;

			let editor = CodeMirror.fromTextArea(codeEditors[i], {
				lineNumbers: true,
				mode: "javascript",
				theme: "dracula",
				autoCloseBrackets: true,
				matchBrackets: true,
				gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
				foldGutter: true,
				extraKeys: {
					"Ctrl-/": "toggleComment",
					"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
					"Ctrl-S": function(cm){
						runScript(cm.getTextArea().id);
					}
				}
			});

			editor.on("change", function() {
				editor.save(); // Updates the <textarea> content with the new code
			});
		}
	</script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
</cf_handlebars>