# Description

ChartSQL.js is a library to quickly chart SQL (or any table like data) within any web application.

Full documentation at [docs.chartsql.com](https://docs.chartsql.com)

See the ChartSQL.js <a href="https://chartsql.github.io/chartsql-js/docs/demo" target="_blank">live demos</a>

## Key Features

* Simple .js integration
* Supports any SQL table-like or NoSQL source of data
* Full rendering control with intuitive @directives
* What You Query is What You Chart (we call it Whikee-Whic) - Simple and declarative charting.

## Supported Charts

* Area
* Colum
* Bar
* Bubble
* Column
* Combo
* Gauge
* Heatmap
* Line
* Pie
* Radar
* Scatter

## Minimal Example

The following is all that is required to create a basic column chart

```javascript
// Sample data, typically retrieved from an executed SQL query or API call
var data = [
  {category: 'shoes', total_sales: 5000},
  {category: 'pants', total_sales: 10000},
  {category: 'shirts', total_sales: 8000},
  {category: 'socks', total_sales: 4000}
];

// Render the data into a chart
chartsql.createChart({
  // Existing target ID element or will be appended to the body
  target: 'auto-column',
  // Data for the chart
  data: data
});
```

# Getting Started Documenation

This readme covers the basics. See additional ChartSQL.js documenation at [docs.chartsql.com](https://docs.chartsql.com)

* [Quick Start](#quick-start)
* [Creating Charts](#creating-charts)
* [Auto Charts](#auto-charts)
* [Customizing Charts](#customizing-charts)
* [Working with Data](#working-with-data)

## Quick Start

1. Add `chartsql.js` to Your Project and setup a basic column chart

```html
<!DOCTYPE html>
<html lang="en">
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="https://chartsql.github.io/chartsql-js/dist/js/chartsql.js"></script>
	</head>
	<body>

	<!-- Container for Chart -->
	<div id="my-chart"></div>

	<script>
		// Sample data, typically retrieved from executing the SQL query,
		// but chart data can be from any source.
		var data = [
			{category: 'shoes', total_sales: 5000},
			{category: 'pants', total_sales: 10000},
			{category: 'shirts', total_sales: 8000},
			{category: 'socks', total_sales: 4000}
		]

		// Create and render the chart
		chartsql.createChart({
		target: 'my-chart',
		data: data
		});
	</script>
	</body>
</html>
```

## Global Config
The chartsql.js script already sets up a global `chartsql` variable with a basic configuration. If you want to customize your global settings, create a new `ChartSQL` instance

```javascript
var chartsql = new ChartSQLjs.ChartSQL({
	//... options
})
```

## Creating Charts&#x20;

`createChart()` allows you to render data into chart visuals at the target HTML element

### createChart options

<table><thead><tr><th>Parameter</th><th width="202">Required?</th><th>Description</th></tr></thead><tbody><tr><td>target</td><td>no</td><td>The DOM element ID where the chart will be rendered. If it doesn't exist it will be appended to the body</td></tr><tr><td>data</td><td>yes</td><td>An object containing the data to be used for rendering the chart. See <a href="overview.md#working-with-data">Working with Data</a></td></tr><tr><td>directives</td><td>yes</td><td>SQL string containing directives, or object of directives.</td></tr></tbody></table>

## Auto Charts

ChartSQL.js will try to automatically choose a basic chart type depending on the fields in your data.

The auto charts helps you quickly visualize and explore data and then you can [Customize Charts](#customizing-charts) for more control.

* [Auto Column](#auto-column-chart)
* [Auto Grouped Column](#auto-grouped-column-chart)
* [Auto Date Line](#auto-date-line-chart)

### Auto Column Chart <a href="https://chartsql.github.io/chartsql-js/docs/demo#auto-column-heading" target="_blank">(demo)</a>

When there is one string and one numeric field in the data

```javascript
{category: 'shoes', total_sales: 5000}
```

```javascript
// Sample data, typically retrieved from an executed SQL query or API call
var data = [
  {category: 'shoes', total_sales: 5000},
  {category: 'pants', total_sales: 10000},
  {category: 'shirts', total_sales: 8000},
  {category: 'socks', total_sales: 4000}
];

// Render the data into a chart
chartsql.createChart({
  // Target HTML element id to place the chart, or one
  // will be created and appended to the body
  target: 'auto-column',
  // The data for the chart
  data: data
});
```


### Auto Grouped Column Chart <a href="https://chartsql.github.io/chartsql-js/docs/demo#auto-grouped-column-heading" target="_blank">(demo)</a>

When there is one string and 2 or more numeric fields the numeric fields will be grouped

```javascript
{category: 'shoes', total_sales: 5000, total_profit: 2000}
```


<figure><img src="../../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>



```javascript
var data = {
	columns: ['category', 'total_sales', 'total_profit'],
	rows: [
		['shoes', 5000, 2000],
		['pants', 10000, 4000],
		['shirts', 8000, 3000],
		['socks', 4000, 1000]
	]
}

chartsql.createChart({
	target: 'auto-grouped-column',
	data: data,
	directives: {
	}
});
```


### Auto Date Line Chart <a href="https://chartsql.github.io/chartsql-js/docs/demo#auto-dateline-heading" target="_blank">(demo)</a>

When there is a date field and a numeric field

```javascript
{month: '2022-01-01', total_sales: 5000}
```


```javascript
// Sample data, typically retrieved from an executed SQL query
var data = [
	{month: '2022-01-01', total_sales: 5000},
	{month: '2022-02-01', total_sales: 7000},
	{month: '2022-03-01', total_sales: 4900},
	{month: '2022-04-01', total_sales: 7528},
	{month: '2022-05-01', total_sales: 7762},
	{month: '2022-06-01', total_sales: 8000},
	{month: '2022-07-01', total_sales: 9500},
	{month: '2022-08-01', total_sales: 8250},
	{month: '2022-09-01', total_sales: 9000},
	{month: '2022-10-01', total_sales: 8500},
	{month: '2022-11-01', total_sales: 9500},
	{month: '2022-12-01', total_sales: 10000}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'auto-dateline',
	data: data
});
```


## Customizing Charts

You can specify exactly how to render the chart with directives (aka @directives).&#x20;

Directives allow you to fully control the type of chart and the selection of the categories, series formats and other ChartSQL.js features.

### Basic Directives Example <a href="https://chartsql.github.io/chartsql-js/docs/demo#basic-bar-heading" target="_blank">(demo)</a>

`createChart()` takes a 'directives' object which contains the directives for controlling rendering of the chart.


```javascript
// Sample data, typically retrieved from an executed SQL query
var data = [
	{category: 'shoes', total_sales: 5000},
	{category: 'pants', total_sales: 10000},
	{category: 'shirts', total_sales: 8000},
	{category: 'socks', total_sales: 4000}
]

// Render a chart at the target element with the data provided
chartsql.createChart({
	target: 'basic-bar',
	data: data,
	directives: {
		chart: 'bar'
	}
});
```

### Common Directives

* `chart` - The type of chart: bar, column, line etc
* `category` - The column to use for the category (primary axis) of the chart
* `series` - The column/s to use for the data (secondary axis) of the chart
* `formats` - The data formats to render for the series

You can [See All Directives](https://docs.chartsql.com/reference/directives) at docs.chartsql.com for all the ways in which you can customize your charts.


## Working with Data

ChartSQL.js is designed to work with table like data of columns and rows. Typically this data will come from executing a SQL query, but data from any source can be charted.

ChartSQL.js liberally accepts table data in a few different formats that you pass to the `createChart()` method.

### Array of Objects <a href="https://chartsql.github.io/chartsql-js/docs/demo#data-array-of-objects-heading" target="_blank">(demo)</a>
```javascript
var data = [
	{ category: 'shoes', total_sales: 5000 },
	{ category: 'pants', total_sales: 10000 },
	{ category: 'shirts', total_sales: 8000 },
	{ category: 'socks', total_sales: 4000 }
];
```

### Array of Arrays <a href="https://chartsql.github.io/chartsql-js/docs/demo#data-array-of-arrays-heading" target="_blank">(demo)</a>

`The first row in the array should be the column names`


```javascript
var data = [
	['category', 'total_sales'],
	['shoes', 5000],
	['pants', 10000],
	['shirts', 8000],
	['socks', 4000]
];
```

### Table Object <a href="https://chartsql.github.io/chartsql-js/docs/demo#data-table-object-heading" target="_blank">(demo)</a>

```javascript
var data = {
	columns: ['category', 'total_sales'],
	rows: [
		['shoes', 5000],
		['pants', 10000],
		['shirts', 8000],
		['socks', 4000]
	]
};
```

### Data Class <a href="https://chartsql.github.io/chartsql-js/docs/demo#data-data-class-heading" target="_blank">(demo)</a>

If desired, you can instantiate your own instance of the Data.js class that ChartSQL creates internally.

```javascript
var data = new ChartSQLjs.Data({
	columns: ['category', 'total_sales'],
	rows: [
		['shoes', 5000],
		['pants', 10000],
		['shirts', 8000],
		['socks', 4000]
	]
});
```

# Further Documentation
See full documumentation at [docs.chartsql.com](https://docs.chartsql.com)

# ChartSQL Ecosystem

ChartSQL.js is the parsing and rendering layer of ChartSQL, a data analytics and visualization suite. See more at [docs.chartsql.com](https://docs.chartsql.com)

* `ChartSQL Studio` - Desktop SQL and Charting IDE
* `ChartSQL Cloud` - Online Dashboards
* `ChartSQL.js` - Embedded web application charts